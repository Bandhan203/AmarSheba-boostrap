import { Banknote, Calendar, ChevronLeft, Clock, CreditCard, Info, MapPin, Shield, Smartphone, Tag } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { useApp } from '../context/AppContext';
import { PROVIDERS } from '../data/mockData';
import { ESCROW_MILESTONES } from '../data/platformContracts';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { language, selectedProvider, bookingData, setBookingData } = useApp();
  const provider = selectedProvider || PROVIDERS[0];
  const [bkashNumber, setBkashNumber] = useState('');
  const [pin, setPin] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [escrowEnabled, setEscrowEnabled] = useState(true);
  const [autoReleaseHours, setAutoReleaseHours] = useState(48);

  const t = (en: string, bn: string) => language === 'bn' ? bn : en;
  const method = bookingData.paymentMethod || 'bkash';
  const total = bookingData.amount || 0;
  const discount = promoApplied ? Math.round(total * 0.2) : 0;
  const finalAmount = total - discount;

  const handlePay = () => {
    setProcessing(true);
    const bookingId = `BK${Date.now().toString().slice(-6)}`;
    setTimeout(() => {
      setBookingData({ ...bookingData, bookingId, amount: finalAmount });
      navigate('/confirmation');
    }, 2000);
  };

  const methodConfig: Record<string, { name: string; color: string; bg: string; icon: React.ElementType; placeholder: string }> = {
    bkash: { name: 'bKash', color: '#E91E63', bg: '#FCE4EC', icon: CreditCard, placeholder: '01XXXXXXXXX' },
    nagad: { name: 'Nagad', color: '#FF6B00', bg: '#FFF3E0', icon: Smartphone, placeholder: '01XXXXXXXXX' },
    card: { name: 'Credit/Debit Card', color: '#1E88E5', bg: '#E3F2FD', icon: CreditCard, placeholder: '1234 5678 9012 3456' },
    cash: { name: 'Cash on Service', color: '#4CAF50', bg: '#E8F5E9', icon: Banknote, placeholder: '' },
  };

  const cfg = methodConfig[method];

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F5F7FA]">
        {/* Header */}
        <div className="bg-white px-4 pt-12 pb-4 flex items-center gap-3 shadow-sm">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <div>
            <h2 className="font-bold text-gray-900">{t('Payment', 'পেমেন্ট')}</h2>
            <p className="text-xs text-gray-400">{t('Secure encrypted payment', 'এনক্রিপ্টেড পেমেন্ট')}</p>
          </div>
          <div className="ml-auto">
            <Shield size={18} className="text-green-500" />
          </div>
        </div>

        {/* Order summary */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('Order Summary', 'অর্ডার সারসংক্ষেপ')}</h4>
          
          {/* Provider */}
          <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100">
            {provider.photo ? (
              <img src={provider.photo} alt="" className="w-10 h-10 rounded-xl object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-[#1E88E5] flex items-center justify-center text-white font-bold text-sm">
                {provider.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">{language === 'bn' ? provider.nameBn : provider.name}</p>
              <p className="text-xs text-gray-400">{bookingData.service}</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 inline-flex items-center gap-1"><Calendar size={12} /> {t('Date', 'তারিখ')}</span>
              <span className="font-medium text-gray-800">{bookingData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 inline-flex items-center gap-1"><Clock size={12} /> {t('Time', 'সময়')}</span>
              <span className="font-medium text-gray-800">{bookingData.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">⏱ {t('Duration', 'সময়কাল')}</span>
              <span className="font-medium text-gray-800">{bookingData.duration} {t('hours', 'ঘণ্টা')}</span>
            </div>
            {bookingData.address && (
              <div className="flex justify-between">
                <span className="text-gray-500 inline-flex items-center gap-1"><MapPin size={12} /> {t('Address', 'ঠিকানা')}</span>
                <span className="font-medium text-gray-800 text-right max-w-[160px] text-xs">{bookingData.address}</span>
              </div>
            )}
            <div className="border-t border-dashed border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-500">{t('Service cost', 'সেবার মূল্য')}</span>
                <span className="font-medium">৳{total.toLocaleString()}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>{t('Promo discount (20%)', 'প্রমো ছাড় (২০%)')}</span>
                  <span>−৳{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-base mt-1">
                <span className="text-gray-900">{t('Total', 'মোট')}</span>
                <span style={{ color: '#1E88E5' }}>৳{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo code */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={15} style={{ color: '#FF9800' }} />
            <label className="text-sm font-semibold text-gray-700">{t('Promo Code', 'প্রমো কোড')}</label>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="AMARSHEBA20"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2.5 text-sm font-mono outline-none"
              disabled={promoApplied}
            />
            <button
              onClick={() => {
                if (promoCode === 'AMARSHEBA20') setPromoApplied(true);
              }}
              disabled={promoApplied}
              className="px-4 py-2.5 rounded-xl text-white text-sm font-bold"
              style={{ backgroundColor: promoApplied ? '#4CAF50' : '#FF9800', opacity: promoApplied ? 0.8 : 1 }}
            >
              {promoApplied ? '✓ Applied' : t('Apply', 'প্রয়োগ')}
            </button>
          </div>
          {!promoApplied && (
            <p className="text-[10px] text-gray-400 mt-1.5">💡 Try code: AMARSHEBA20 for 20% off</p>
          )}
        </div>

        {/* Payment method form */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: cfg.bg }}>
              <cfg.icon size={16} style={{ color: cfg.color }} />
            </div>
            <h4 className="text-sm font-semibold text-gray-700">{cfg.name}</h4>
          </div>

          {method === 'cash' ? (
            <div className="bg-green-50 rounded-xl p-3 border border-green-200">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-700 leading-relaxed">
                  {t('You will pay ৳' + finalAmount.toLocaleString() + ' in cash directly to the provider after service completion.', '৳' + finalAmount.toLocaleString() + ' সেবা সম্পন্নের পরে সরাসরি প্রদানকারীকে দেবেন।')}
                </p>
              </div>
            </div>
          ) : method === 'card' ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none font-mono"
              />
              <div className="flex gap-3">
                <input type="text" placeholder="MM/YY" className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none" />
                <input type="text" placeholder="CVV" className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
              <input type="text" placeholder="Cardholder Name" className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">{cfg.name} {t('Number', 'নম্বর')}</label>
                <input
                  type="tel"
                  placeholder={cfg.placeholder}
                  value={bkashNumber}
                  onChange={e => setBkashNumber(e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">{t('PIN', 'পিন')}</label>
                <input
                  type="password"
                  placeholder="• • • • •"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none"
                  maxLength={5}
                />
              </div>
              <div className="bg-yellow-50 rounded-xl p-2.5 border border-yellow-200">
                <p className="text-[10px] text-yellow-700 leading-relaxed">
                  💡 Demo: Enter any number to proceed. No real payment will be made.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700">Escrow & Milestone Releases</h4>
            <button
              onClick={() => setEscrowEnabled(v => !v)}
              className={`text-[10px] px-2 py-1 rounded-full font-semibold ${escrowEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
            >
              {escrowEnabled ? 'Escrow On' : 'Escrow Off'}
            </button>
          </div>
          {escrowEnabled && (
            <div className="space-y-2">
              {ESCROW_MILESTONES.map(milestone => (
                <div key={milestone.id} className="rounded-xl border border-gray-100 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-800">{milestone.title}</p>
                    <span className="text-xs font-bold text-[#1E88E5]">৳{milestone.amount.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{milestone.releasePolicy}</p>
                  <p className={`text-[10px] mt-1 font-medium ${milestone.released ? 'text-green-600' : 'text-amber-600'}`}>
                    {milestone.released ? 'Released' : 'Pending release'}
                  </p>
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-500 block mb-1">Auto-release timeout (hours)</label>
                <input
                  type="number"
                  min={24}
                  value={autoReleaseHours}
                  onChange={e => setAutoReleaseHours(Number(e.target.value))}
                  className="w-full bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Security notice */}
        <div className="mx-4 mt-3 flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
          <Shield size={14} className="text-green-600 flex-shrink-0" />
          <p className="text-[10px] text-green-700">
            {t(`Your payment is 256-bit SSL encrypted and protected by AmarSheba Secure Pay. Escrow auto-release is set to ${autoReleaseHours}h.`, `আপনার পেমেন্ট ২৫৬-বিট SSL এনক্রিপ্টেড এবং ${autoReleaseHours} ঘণ্টা পরে অটো রিলিজ সেট করা আছে।`)}
          </p>
        </div>

        {/* Pay button */}
        <div className="mx-4 mt-4 mb-8">
          <button
            onClick={handlePay}
            disabled={processing}
            className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all"
            style={{ backgroundColor: processing ? '#90CAF9' : '#1E88E5' }}
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('Processing...', 'প্রসেস হচ্ছে...')}
              </>
            ) : (
              <>
                <Shield size={18} />
                {t(`Pay ৳${finalAmount.toLocaleString()}`, `৳${finalAmount.toLocaleString()} পেমেন্ট করুন`)}
              </>
            )}
          </button>
        </div>
      </div>
    </MobileFrame>
  );
};