interface BadgeProps {
  type: 'new' | 'deal' | 'low-stock' | 'sold-out';
  text?: string;
  className?: string;
}

export default function Badge({ type, text, className = '' }: BadgeProps) {
  const badgeStyles = {
    'new': 'bg-amber-500 text-white',
    'deal': 'bg-red-600 text-white',
    'low-stock': 'bg-amber-600 text-white',
    'sold-out': 'bg-gray-800 text-white',
  };

  const defaultText = {
    'new': 'NEW',
    'deal': 'DEAL',
    'low-stock': 'LOW STOCK',
    'sold-out': 'SOLD OUT',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${badgeStyles[type]} ${className}`}
    >
      {text || defaultText[type]}
    </span>
  );
}
