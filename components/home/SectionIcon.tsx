import { createElement } from 'react';
import { getIcon } from '@/lib/icons';

interface SectionIconProps {
  icon: string;
  className?: string;
}

export function SectionIcon({ icon, className = 'size-5' }: SectionIconProps) {
  return createElement(getIcon(icon), { className });
}
