import {
    Calendar,
    ChevronLeft,
    Clock,
    CreditCard,
    MapPin, MessageSquare,
    Smartphone, Wallet
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { useApp } from '../context/AppContext';
import { PROVIDERS } from '../data/mockData';
import { REQUIRED_SERVICE_CATEGORIES } from '../data/platformContracts';

const TIME_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

const DURATIONS = [1, 2, 3, 4, 5, 6, 8];

const DATES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(2026, 3, 19 + i);
  return {
    value: d.toISOString().split('T')[0],
    day: d.toLocaleDateString('en-US', { weekday: 'short' }),
    date: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
  };
});

const paymentMethods = [
  { id: 'bkash', label: 'bKash', icon: CreditCard, color: '#E91E63', desc: 'Pay with bKash mobile banking' },
  { id: 'nagad', label: 'Nagad', icon: Smartphone, color: '#4CAF50', desc: 'Pay with Nagad mobile banking' },
  { id: 'card', label: 'Card', icon: CreditCard, color: '#1E88E5', desc: 'Visa / Mastercard / Amex' },
  { id: 'cash', label: 'Cash', icon: Wallet, color: '#FF9800', desc: 'Pay cash after service' },
];

export const BookingFormPage = () => {
  const navigate = useNavigate();
  const { language, selectedProvider, bookingData, setBookingData } = useApp();
  const provider = selectedProvider || PROVIDERS[0];

  const [selectedDate, setSelectedDate] = useState(DATES[0].value);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [duration, setDuration] = useState(2);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card' | 'cash'>('bkash');
  const [selectedService, setSelectedService] = useState(provider.services[0]);
  const [jobCategory, setJobCategory] = useState(REQUIRED_SERVICE_CATEGORIES[0]);
  const [budget, setBudget] = useState('25000');
  const [timeline, setTimeline] = useState('7 days');

  const t = (en: string, bn: string) => language === 'bn' ? bn : en;
  const subtotal = selectedService.price * duration;
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F5F7FA]">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm sticky top-0 z-30">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900">{t('Book Service', 'সেবা বুক করুন')}</h2>
            <p className="text-xs text-gray-400">{language === 'bn' ? provider.nameBn : provider.name}</p>
          </div>
        </div>

        {/* Provider mini card */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-3.5 flex items-center gap-3 shadow-sm">
          {provider.photo ? (
            <img src={provider.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#1E88E5] flex items-center justify-center text-white font-bold">
              {provider.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{language === 'bn' ? provider.nameBn : provider.name}</p>
            <p className="text-xs text-gray-400">⭐ {provider.rating} • {provider.jobsCompleted} jobs</p>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{provider.price}/hr</p>
          </div>
        </div>

        {/* Select service */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-semibold text-gray-700 block mb-2">Job Category</label>
          <select
            value={jobCategory}
            onChange={e => setJobCategory(e.target.value as typeof REQUIRED_SERVICE_CATEGORIES[number])}
            className="w-full rounded-xl border border-gray-200 p-3 text-sm"
          >
            {REQUIRED_SERVICE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Budget</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} className="w-full rounded-xl border border-gray-200 p-2.5 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Timeline</label>
              <input value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full rounded-xl border border-gray-200 p-2.5 text-sm" />
            </div>
          </div>
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-semibold text-gray-700 block mb-2">
            {t('Select Service', 'সেবা নির্বাচন করুন')}
          </label>
          <div className="space-y-2">
            {provider.services.map(svc => (
              <button
                key={svc.name}
                onClick={() => setSelectedService(svc)}
                className="w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all"
                style={{
                  borderColor: selectedService.name === svc.name ? '#1E88E5' : '#E5E7EB',
                  backgroundColor: selectedService.name === svc.name ? '#E3F2FD' : '#F9FAFB',
                }}
              >
                <span className="text-sm font-medium text-gray-700">{language === 'bn' ? svc.nameBn : svc.name}</span>
                <span className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{svc.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date picker */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} style={{ color: '#1E88E5' }} />
            <label className="text-sm font-semibold text-gray-700">{t('Select Date', 'তারিখ নির্বাচন')}</label>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {DATES.map(d => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className="flex-shrink-0 flex flex-col items-center py-2.5 px-3 rounded-xl border-2 min-w-[52px] transition-all"
                style={{
                  borderColor: selectedDate === d.value ? '#1E88E5' : '#E5E7EB',
                  backgroundColor: selectedDate === d.value ? '#1E88E5' : 'white',
                }}
              >
                <span className="text-[10px] font-medium" style={{ color: selectedDate === d.value ? '#BBDEFB' : '#9CA3AF' }}>{d.day}</span>
                <span className="font-bold text-base" style={{ color: selectedDate === d.value ? 'white' : '#374151' }}>{d.date}</span>
                <span className="text-[10px]" style={{ color: selectedDate === d.value ? '#BBDEFB' : '#9CA3AF' }}>{d.month}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time & Duration */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} style={{ color: '#1E88E5' }} />
            <label className="text-sm font-semibold text-gray-700">{t('Time & Duration', 'সময় ও সময়কাল')}</label>
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">{t('Start Time', 'শুরুর সময়')}</p>
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className="flex-shrink-0 text-xs px-3 py-2 rounded-xl border-2 transition-all font-medium"
                  style={{
                    borderColor: selectedTime === slot ? '#1E88E5' : '#E5E7EB',
                    backgroundColor: selectedTime === slot ? '#1E88E5' : 'white',
                    color: selectedTime === slot ? 'white' : '#6B7280',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">{t('Duration', 'সময়কাল')}</p>
            <div className="flex gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className="flex-1 py-2 rounded-xl border-2 text-xs font-semibold transition-all"
                  style={{
                    borderColor: duration === d ? '#1E88E5' : '#E5E7EB',
                    backgroundColor: duration === d ? '#1E88E5' : 'white',
                    color: duration === d ? 'white' : '#6B7280',
                  }}
                >
                  {d}hr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} style={{ color: '#1E88E5' }} />
            <label className="text-sm font-semibold text-gray-700">{t('Service Address', 'সেবার ঠিকানা')}</label>
          </div>
          <input
            type="text"
            placeholder={t('House no, Road, Area, Dhaka', 'বাড়ি নং, রাস্তা, এলাকা, ঢাকা')}
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#1E88E5] mb-2"
          />
          {/* Map placeholder */}
          <div className="h-28 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 relative flex items-center justify-center border border-gray-200">
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E88E5' fill-opacity='0.2'%3E%3Crect x='0' y='0' width='1' height='60'/%3E%3Crect x='0' y='0' width='60' height='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <div className="text-center z-10">
              <MapPin size={28} style={{ color: '#E91E63' }} className="mx-auto mb-1" />
              <p className="text-xs text-gray-500 font-medium">Tap to pick location</p>
              <p className="text-[10px] text-gray-400">Google Maps</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={16} style={{ color: '#1E88E5' }} />
            <label className="text-sm font-semibold text-gray-700">{t('Special Instructions', 'বিশেষ নির্দেশনা')} <span className="text-gray-400 font-normal">({t('Optional', 'ঐচ্ছিক')})</span></label>
          </div>
          <textarea
            rows={2}
            placeholder={t('e.g. Please bring your own supplies, call before arriving...', 'যেমন: নিজের সরঞ্জাম নিয়ে আসুন, আসার আগে কল করুন...')}
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none resize-none"
          />
          <div className="mt-3 rounded-xl border border-dashed border-gray-300 p-3">
            <p className="text-xs text-gray-600 mb-2">Upload photos/measurements</p>
            <input type="file" multiple className="w-full text-xs" />
          </div>
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Quote Comparison (Verified Professionals)</h4>
          <div className="space-y-2 text-xs">
            {[
              { name: 'Ruksana Akter', quote: 21500, verified: 'Police + Insurance', response: '2h' },
              { name: 'Delwar Hossain', quote: 19800, verified: 'ID + Business', response: '4h' },
            ].map(item => (
              <div key={item.name} className="rounded-xl bg-gray-50 p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-500">{item.verified} • replied in {item.response}</p>
                </div>
                <p className="font-bold text-[#1E88E5]">৳{item.quote.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm font-semibold text-gray-700 block mb-3">{t('Payment Method', 'পেমেন্ট পদ্ধতি')}</label>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map(pm => (
              <button
                key={pm.id}
                onClick={() => setPaymentMethod(pm.id as any)}
                className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left"
                style={{
                  borderColor: paymentMethod === pm.id ? pm.color : '#E5E7EB',
                  backgroundColor: paymentMethod === pm.id ? `${pm.color}15` : 'white',
                }}
              >
                <pm.icon size={18} style={{ color: pm.color }} />
                <div>
                  <p className="text-xs font-bold text-gray-800">{pm.label}</p>
                  <p className="text-[9px] text-gray-400 leading-tight">{pm.desc.split(' ').slice(0, 3).join(' ')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('Price Summary', 'মূল্য সারসংক্ষেপ')}</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{selectedService.name} × {duration}hr</span>
              <span className="font-medium text-gray-800">৳{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{t('Platform fee (5%)', 'প্ল্যাটফর্ম ফি (৫%)')}</span>
              <span className="font-medium text-gray-800">৳{platformFee}</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between">
              <span className="font-bold text-gray-900">{t('Total', 'মোট')}</span>
              <span className="font-bold text-lg" style={{ color: '#1E88E5' }}>৳{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div className="mx-4 mt-4 mb-8">
          <button
            onClick={() => {
              setBookingData({
                providerId: provider.id,
                service: `${jobCategory} - ${selectedService.name}`,
                date: selectedDate,
                time: selectedTime,
                duration,
                address,
                instructions,
                paymentMethod,
                amount: total,
              });
              navigate('/payment');
            }}
            className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg"
            style={{ backgroundColor: '#1E88E5' }}
          >
            {t('Continue to Payment', 'পেমেন্টে যান')} →
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};
