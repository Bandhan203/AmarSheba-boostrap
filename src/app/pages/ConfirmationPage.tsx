import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { useApp } from '../context/AppContext';
import { PROVIDERS } from '../data/mockData';
import { CheckCircle2, MapPin, Phone, MessageCircle, Car, Navigation } from 'lucide-react';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { language, selectedProvider, bookingData } = useApp();
  const provider = selectedProvider || PROVIDERS[0];
  const [carPos, setCarPos] = useState(10);
  const isDriver = provider.category === 'driver';
  const t = (en: string, bn: string) => language === 'bn' ? bn : en;

  // Animate car on driver booking
  useEffect(() => {
    if (!isDriver) return;
    const interval = setInterval(() => {
      setCarPos(p => p < 80 ? p + 0.5 : p);
    }, 100);
    return () => clearInterval(interval);
  }, [isDriver]);

  const bookingId = bookingData.bookingId || 'BK' + Math.floor(Math.random() * 999999).toString().padStart(6, '0');

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F5F7FA]">
        {/* Success header */}
        <div className="bg-gradient-to-b from-[#1B5E20] to-[#4CAF50] px-4 pt-14 pb-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl">
            <CheckCircle2 size={44} className="text-green-500" />
          </div>
          <h2 className="text-white font-bold text-xl mb-1">
            {t('Booking Confirmed!', 'বুকিং নিশ্চিত!')}
          </h2>
          <p className="text-green-100 text-sm text-center">
            {t('Your service has been successfully booked', 'আপনার সেবা সফলভাবে বুক হয়েছে')}
          </p>
          <div className="mt-3 bg-white/20 px-4 py-2 rounded-full">
            <p className="text-white font-mono font-bold text-sm tracking-widest">{bookingId}</p>
          </div>
        </div>

        {/* Booking card */}
        <div className="mx-4 -mt-4 bg-white rounded-2xl shadow-lg p-4 relative z-10">
          {/* Provider */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            {provider.photo ? (
              <img src={provider.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#1E88E5] flex items-center justify-center text-white font-bold">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{language === 'bn' ? provider.nameBn : provider.name}</p>
              <p className="text-xs text-gray-400">⭐ {provider.rating} • {provider.area}</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                <MessageCircle size={16} style={{ color: '#1E88E5' }} />
              </button>
              <button className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                <Phone size={16} style={{ color: '#4CAF50' }} />
              </button>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">{t('Service', 'সেবা')}</p>
              <p className="text-xs font-semibold text-gray-800">{bookingData.service}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">{t('Date', 'তারিখ')}</p>
              <p className="text-xs font-semibold text-gray-800">{bookingData.date}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">{t('Time', 'সময়')}</p>
              <p className="text-xs font-semibold text-gray-800">{bookingData.time}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">{t('Amount Paid', 'পরিশোধিত')}</p>
              <p className="text-xs font-bold" style={{ color: '#1E88E5' }}>৳{bookingData.amount?.toLocaleString()}</p>
            </div>
          </div>

          {bookingData.address && (
            <div className="mt-3 flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
              <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">{bookingData.address}</p>
            </div>
          )}
        </div>

        {/* Live tracking for driver */}
        {isDriver && (
          <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-gray-800">{t('Live Tracking', 'লাইভ ট্র্যাকিং')}</span>
              </div>
              <span className="text-xs text-green-600 font-medium">{t('Driver En Route', 'চালক আসছেন')}</span>
            </div>
            {/* Map simulation */}
            <div className="relative h-44" style={{
              background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 30%, #a5d6a7 60%, #81c784 100%)'
            }}>
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, #1E88E5 0, #1E88E5 1px, transparent 0, transparent 20px), repeating-linear-gradient(90deg, #1E88E5 0, #1E88E5 1px, transparent 0, transparent 20px)' }}
              />
              {/* Roads */}
              <div className="absolute left-0 right-0 top-1/2 h-3 bg-gray-300 opacity-60" style={{ transform: 'translateY(-50%)' }} />
              <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-gray-300 opacity-60" />
              {/* Car icon moving */}
              <div
                className="absolute transition-all duration-500"
                style={{ left: `${carPos}%`, top: '44%', transform: 'translateY(-50%)' }}
              >
                <div className="w-9 h-9 bg-[#1E88E5] rounded-full flex items-center justify-center shadow-lg">
                  <Car size={18} className="text-white" />
                </div>
              </div>
              {/* Destination pin */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-[#E91E63] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin size={16} className="text-white" />
                </div>
              </div>
              {/* ETA */}
              <div className="absolute top-3 left-3 bg-white/90 rounded-xl px-2.5 py-1.5 shadow">
                <p className="text-[10px] text-gray-500">{t('ETA', 'আসতে সময়')}</p>
                <p className="font-bold text-sm text-gray-900">~12 min</p>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 rounded-xl px-2.5 py-1.5 shadow">
                <p className="text-[10px] text-gray-500">{t('Distance', 'দূরত্ব')}</p>
                <p className="font-bold text-sm text-gray-900">3.2 km</p>
              </div>
            </div>
            <div className="px-4 py-3 bg-blue-50">
              <p className="text-xs text-[#1565C0]">
                📱 {t('Your driver will call you before arrival. Number is masked for privacy.', 'আপনার চালক আসার আগে কল করবেন। নম্বর গোপন রাখা হয়েছে।')}
              </p>
            </div>
          </div>
        )}

        {/* Status timeline */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('Booking Status', 'বুকিং স্ট্যাটাস')}</h4>
          <div className="space-y-3">
            {[
              { label: t('Booking confirmed', 'বুকিং নিশ্চিত'), done: true, time: 'Just now' },
              { label: t('Provider notified', 'প্রদানকারী অবহিত'), done: true, time: '1 min ago' },
              { label: t('Provider on the way', 'প্রদানকারী আসছেন'), done: isDriver, time: isDriver ? 'In progress' : 'Pending' },
              { label: t('Service in progress', 'সেবা চলছে'), done: false, time: `${bookingData.time}` },
              { label: t('Service completed', 'সেবা সম্পন্ন'), done: false, time: 'Upcoming' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: step.done ? '#4CAF50' : '#E5E7EB',
                    }}
                  >
                    {step.done && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  {i < 4 && <div className="w-0.5 h-4 mt-1" style={{ backgroundColor: step.done ? '#4CAF50' : '#E5E7EB' }} />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium" style={{ color: step.done ? '#1B5E20' : '#9CA3AF' }}>{step.label}</p>
                  <p className="text-[10px] text-gray-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mx-4 mt-4 space-y-3 mb-8">
          <button
            onClick={() => navigate('/bookings')}
            className="w-full py-3.5 rounded-2xl text-white font-bold"
            style={{ backgroundColor: '#1E88E5' }}
          >
            {t('View My Bookings', 'আমার বুকিং দেখুন')}
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-3.5 rounded-2xl text-gray-700 font-semibold bg-white border border-gray-200"
          >
            {t('Back to Home', 'হোমে ফিরুন')}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};
