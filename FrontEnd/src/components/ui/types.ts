import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import type { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface BadgeProps {
  children: ReactNode;
  variant?: string;
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

export interface KPICardProps {
  title: ReactNode;
  value: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  trend?: ReactNode;
  trendUp?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  size?: ModalSize;
}

export interface TabItem {
  id: string;
  label: ReactNode;
  count?: number;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export interface TableProps {
  children: ReactNode;
  className?: string;
}

export interface TableSectionProps {
  children: ReactNode;
}

export interface TableRowProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  className?: string;
}

export interface TableCellProps {
  children?: ReactNode;
  className?: string;
  colSpan?: string;
}

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: () => void;
  actionLabel?: ReactNode;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
