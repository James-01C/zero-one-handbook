import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function getIcon(iconName: string): LucideIcon {
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const icon = (Icons as unknown as Record<string, LucideIcon>)[pascalName];
  return icon || Icons.FileText;
}
