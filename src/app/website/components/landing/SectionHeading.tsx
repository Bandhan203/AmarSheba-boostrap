import { ReactNode } from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  actions?: ReactNode;
}

export const SectionHeading = ({
  badge,
  title,
  description,
  align = 'center',
  actions,
}: SectionHeadingProps) => {
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'text-center' : 'flex items-end justify-between gap-4'}>
      <div className={isCenter ? undefined : 'max-w-2xl'}>
        {badge && (
          <span className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
        {description && <p className="mt-3 text-sm text-gray-500">{description}</p>}
      </div>
      {actions}
    </div>
  );
};
