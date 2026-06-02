import { type HTMLAttributes, type Ref } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
  ref?: Ref<HTMLDivElement>;
}

const Card = ({ className = '', variant = 'default', children, ref, ...props }: CardProps) => {
  const variants = {
    default: 'bg-[var(--color-card)]',
    bordered: 'bg-[var(--color-card)] border border-[var(--color-border)]',
  };

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
