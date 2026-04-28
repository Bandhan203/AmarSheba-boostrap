import React from 'react';
import { Star, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import { Provider } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ProviderCardProps {
  provider: Provider;
  compact?: boolean;
}

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
const getAvatarColor = (id: string) => {
  const colors = ['#1E88E5', '#9C27B0', '#4CAF50', '#FF9800', '#E91E63', '#00BCD4'];
  return colors[parseInt(id.replace(/\D/g, '')) % colors.length];
};

export const RatingStars = ({ rating, size = 12 }: { rating: number; size?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.floor(rating) ? '#F9A825' : star - 0.5 <= rating ? '#F9A825' : 'none'}
          stroke={star <= rating ? '#F9A825' : '#D1D5DB'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export const TypeBadge = ({ type }: { type: 'local' | 'expert' }) => (
  <span
    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
    style={{
      backgroundColor: type === 'expert' ? '#F3E5F5' : '#E8F5E9',
      color: type === 'expert' ? '#9C27B0' : '#4CAF50',
    }}
  >
    {type === 'expert' ? '⭐ Expert' : '🟢 Local'}
  </span>
);

export const ProviderCard = ({ provider, compact = false }: ProviderCardProps) => {
  const { language, setSelectedProvider } = useApp();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedProvider(provider);
    navigate(`/provider/${provider.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {provider.photo ? (
            <img src={provider.photo} alt={provider.name} className="w-14 h-14 rounded-xl object-cover" />
          ) : (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-semibold text-base"
              style={{ backgroundColor: getAvatarColor(provider.id) }}
            >
              {getInitials(provider.name)}
            </div>
          )}
          {provider.verified && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
              <ShieldCheck size={13} style={{ color: '#9C27B0' }} fill="#F3E5F5" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div>
              <p className="font-semibold text-gray-900 text-sm truncate">
                {language === 'bn' ? provider.nameBn : provider.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <TypeBadge type={provider.type} />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{provider.price.toLocaleString()}</div>
              <div className="text-[10px] text-gray-400">{provider.priceUnit}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <RatingStars rating={provider.rating} size={11} />
              <span className="text-xs text-gray-700 font-medium">{provider.rating}</span>
              <span className="text-xs text-gray-400">({provider.reviewCount})</span>
            </div>
          </div>

          {!compact && (
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <MapPin size={11} className="text-gray-400" />
                <span className="text-xs text-gray-500">
                  {language === 'bn' ? provider.areaBn : provider.area}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={11} className="text-gray-400" />
                <span className="text-xs text-gray-500">{provider.jobsCompleted} jobs</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
