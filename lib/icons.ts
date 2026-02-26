import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  rocket: Icons.Rocket,
  code: Icons.Code,
  wrench: Icons.Wrench,
  shield: Icons.Shield,
  'file-text': Icons.FileText,
  book: Icons.Book,
  settings: Icons.Settings,
  users: Icons.Users,
  zap: Icons.Zap,
  globe: Icons.Globe,
  lock: Icons.Lock,
  terminal: Icons.Terminal,
  database: Icons.Database,
  layout: Icons.Layout,
  folder: Icons.Folder,
  star: Icons.Star,
  heart: Icons.Heart,
  alert: Icons.AlertCircle,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Icons.FileText;
}
