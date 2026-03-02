import { visit, SKIP } from 'unist-util-visit';
import type { Root, Blockquote, Paragraph, Text } from 'mdast';

const CALLOUT_REGEX = /^\[!(RULE|TIP|INFO|SUCCESS|TLDR)\]\s*/i;

interface MdxJsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value: string;
}

interface MdxJsxFlowElement {
  type: 'mdxJsxFlowElement';
  name: string;
  attributes: MdxJsxAttribute[];
  children: Blockquote['children'];
  data: { _mdxExplicitJsx: boolean };
}

export function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      if (parent === undefined || index === undefined) return;

      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;

      const paragraph = firstChild as Paragraph;
      const firstText = paragraph.children[0];
      if (!firstText || firstText.type !== 'text') return;

      const textNode = firstText as Text;
      const match = textNode.value.match(CALLOUT_REGEX);
      if (!match) return;

      const calloutType = match[1].toLowerCase();
      const remainingText = textNode.value.slice(match[0].length);

      let children: Blockquote['children'];

      if (remainingText.trim()) {
        // Text continues after [!TYPE] on the same line
        textNode.value = remainingText;
        children = node.children;
      } else if (paragraph.children.length > 1) {
        // Other inline nodes exist after the [!TYPE] text
        paragraph.children.shift();
        children = node.children;
      } else {
        // [!TYPE] was the only content in the first paragraph
        children = node.children.slice(1);
      }

      const replacement: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'Callout',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'type',
            value: calloutType,
          },
        ],
        children,
        data: { _mdxExplicitJsx: true },
      };

      (parent.children as unknown[])[index] = replacement;
      return SKIP;
    });
  };
}
