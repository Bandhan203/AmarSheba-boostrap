import { ProviderType } from '../../../data/mockData';

interface ProviderBadgeProps {
  type: ProviderType;
}

export const ProviderBadge = ({ type }: ProviderBadgeProps) => {
  const isExpert = type === 'expert';

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold text-white ${
        isExpert ? 'bg-purple-700' : 'bg-green-600'
      }`}
    >
      {isExpert ? 'Expert' : 'Local'}
    </span>
  );
};
