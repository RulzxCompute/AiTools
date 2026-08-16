import { cn } from '../utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'default', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-elevated border border-border text-text-muted',
    accent: 'bg-accent-muted text-accent border-accent/30',
    success: 'bg-green-900/30 text-green-400 border-green-500/30',
    warning: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-900/30 text-red-400 border-red-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
