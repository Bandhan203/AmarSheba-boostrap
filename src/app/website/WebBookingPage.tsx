import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2, Calendar, MapPin, CreditCard, Clock, ArrowRight,
  ChevronLeft, Tag, User, Star, Shield, Phone, Zap,
  Smartphone, Banknote, Wrench, Lock
} from 'lucide-react';
import { PROVIDERS, CATEGORIES, AREAS } from '../data/mockData';

type Step = 1 | 2 | 3 | 4 | 5;

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM',
];

const PAYMENT_METHODS = [
  { id: 'bkash', label: 'bKash', icon: CreditCard, color: '#E2136E', sub: '01XXXXXXXXX' },
  { id: 'nagad', label: 'Nagad', icon: Smartphone, color: '#F26522', sub: '01XXXXXXXXX' },
  { id: 'card', label: 'Card', icon: CreditCard, color: '#1A1F71', sub: 'Visa / Mastercard' },
  { id: 'cash', label: 'Cash on Delivery', icon: Banknote, color: '#4CAF50', sub: 'Pay when done' },
];

export const WebBookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const providerId = searchParams.get('provider') || 'p1';
  const initialService = searchParams.get('service') || '';

  const provider = PROVIDERS.find(p => p.id === providerId) || PROVIDERS[0];
  const cat = CATEGORIES.find(c => c.id === provider.category);

  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState(initialService || provider.services[0]?.name || '');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [bookingId] = useState(`BK${Date.now().toString().slice(-6)}`);

  const serviceData = provider.services.find(s => s.name === selectedService);
  const baseAmount = (serviceData?.price || 0) * duration;
  const discount = promoApplied ? Math.round(baseAmount * 0.2) : 0;
  const platformFee = Math.round((baseAmount - discount) * 0.05);
  const total = baseAmount - discount + platformFee;

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return !!address && !!area;
    if (step === 4) return !!paymentMethod;
    return true;
  };

  const handleNext = () => {
    if (step < 5) setStep(s => (s + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep(s => (s - 1) as Step);
    else navigate(-1);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'AMARSHEBA20') {
      setPromoApplied(true);
    }
  };

  const STEPS_CONFIG = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Schedule' },
    { n: 3, label: 'Address' },
    { n: 4, label: 'Payment' },
    { n: 5, label: 'Confirm' },
  ];

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1, #1E88E5)' }} className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={handleBack} className="flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={16} /> {step > 1 ? 'Previous Step' : 'Back to Provider'}
          </button>
          <h1 className="text-white font-bold text-2xl mb-4">Book Service</h1>

          {/* Progress steps */}
          <div className="flex items-center gap-1">
            {STEPS_CONFIG.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.n ? 'bg-white text-blue-600' : 'bg-white/20 text-white/60'}`}
                  >
                    {step > s.n ? <CheckCircle2 size={14} /> : s.n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step >= s.n ? 'text-white' : 'text-white/50'}`}>{s.label}</span>
                </div>
                {i < STEPS_CONFIG.length - 1 && (
                  <div className="flex-1 h-0.5 rounded mx-1" style={{ background: step > s.n ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">

              {/* Step 1: Select Service */}
              {step === 1 && (
                <div>
                  <h2 className="font-bold text-gray-900 text-xl mb-1">Choose a Service</h2>
                  <p className="text-gray-500 text-sm mb-5">Select the service you need from {provider.name}</p>

                  {/* Provider mini card */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
                    {provider.photo ? (
                      <img src={provider.photo} alt={provider.name} className="w-12 h-12 rounded-xl object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: cat?.bg }}>
                        {cat?.emoji}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{provider.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Star size={11} fill="#F9A825" color="#F9A825" />
                        {provider.rating} • {cat?.name} • {provider.area}
                      </div>
                    </div>
                    <span
                      className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                      style={{ background: provider.type === 'expert' ? '#7B1FA2' : '#4CAF50' }}
                    >
                      {provider.type === 'expert' ? '🟣 Expert' : '🟢 Local'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {provider.services.map(service => (
                      <button
                        key={service.name}
                        onClick={() => setSelectedService(service.name)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${selectedService === service.name ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                            style={{ background: cat?.bg }}
                          >
                            {cat?.emoji}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{service.nameBn}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <div className="font-bold text-lg" style={{ color: '#1E88E5' }}>৳{service.price}</div>
                          <div className="text-[10px] text-gray-400">/session</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Duration (hours)</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 6, 8].map(h => (
                        <button
                          key={h}
                          onClick={() => setDuration(h)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${duration === h ? 'text-white' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                          style={duration === h ? { background: '#1E88E5' } : {}}
                        >
                          {h}hr
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {step === 2 && (
                <div>
                  <h2 className="font-bold text-gray-900 text-xl mb-1">Pick Date & Time</h2>
                  <p className="text-gray-500 text-sm mb-6">Choose when you need the service</p>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Available Time Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const dayName = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short' }) : null;
                        const isAvailable = !dayName || provider.availability.some(d => d === dayName.replace('.', ''));
                        return (
                          <button
                            key={slot}
                            onClick={() => isAvailable && setSelectedTime(slot)}
                            disabled={!isAvailable}
                            className={`py-2.5 rounded-xl text-sm font-medium transition-all ${selectedTime === slot ? 'text-white' : isAvailable ? 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                            style={selectedTime === slot ? { background: '#1E88E5' } : {}}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Availability info */}
                  <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700">
                    <strong>Provider availability:</strong> {provider.availability.join(', ')}
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <div>
                  <h2 className="font-bold text-gray-900 text-xl mb-1">Service Address</h2>
                  <p className="text-gray-500 text-sm mb-6">Where should the provider go?</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Area in Dhaka</label>
                      <select value={area} onChange={e => setArea(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50">
                        <option value="">Select area</option>
                        {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Address</label>
                      <textarea
                        rows={3}
                        placeholder="House/Flat No., Road No., Block, Area..."
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Special Instructions (optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Any special requirements, access codes, floor details, allergies to be aware of..."
                        value={instructions}
                        onChange={e => setInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
                      />
                    </div>

                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={14} style={{ color: '#FF9800' }} />
                        <span className="font-semibold text-orange-800 text-sm">Location Tip</span>
                      </div>
                      <p className="text-orange-700 text-xs">Provide detailed address including flat/house number, road number, and nearby landmark for fastest arrival.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div>
                  <h2 className="font-bold text-gray-900 text-xl mb-1">Payment Method</h2>
                  <p className="text-gray-500 text-sm mb-6">Choose your preferred payment</p>

                  <div className="space-y-3 mb-5">
                    {PAYMENT_METHODS.map(pm => (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === pm.id ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                          style={{ background: `${pm.color}15` }}
                        >
                          <pm.icon size={22} style={{ color: pm.color }} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{pm.label}</div>
                          <div className="text-xs text-gray-400">{pm.sub}</div>
                        </div>
                        {paymentMethod === pm.id && (
                          <CheckCircle2 size={20} className="ml-auto shrink-0" style={{ color: '#1E88E5' }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Promo code */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Promo Code</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Enter code (e.g. AMARSHEBA20)"
                          value={promoCode}
                          onChange={e => setPromoCode(e.target.value.toUpperCase())}
                          disabled={promoApplied}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 disabled:opacity-60"
                        />
                      </div>
                      <button
                        onClick={applyPromo}
                        disabled={promoApplied}
                        className="px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                        style={{ background: promoApplied ? '#4CAF50' : '#1E88E5' }}
                      >
                        {promoApplied ? '✓ Applied' : 'Apply'}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-green-600 text-xs mt-2">🎉 AMARSHEBA20 applied! You save ৳{discount}</p>
                    )}
                    {!promoApplied && (
                      <p className="text-gray-400 text-xs mt-2">Try <strong>AMARSHEBA20</strong> for 20% off your first booking!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <div className="text-center py-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #4CAF50, #388E3C)' }}
                  >
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h2 className="font-bold text-gray-900 text-2xl mb-2">Booking Confirmed! 🎉</h2>
                  <p className="text-gray-500 text-sm mb-5">
                    Your booking has been confirmed. {provider.name} will arrive at your location on time.
                  </p>

                  <div className="bg-gray-50 rounded-2xl p-5 mb-5 text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl">📋</div>
                      <div>
                        <div className="font-bold text-gray-900">Booking ID: #{bookingId}</div>
                        <div className="text-xs text-gray-400">Save this for your records</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        { icon: User, label: 'Provider', value: provider.name },
                        { icon: Wrench, label: 'Service', value: selectedService },
                        { icon: Calendar, label: 'Date', value: selectedDate },
                        { icon: Clock, label: 'Time', value: selectedTime },
                        { icon: MapPin, label: 'Address', value: `${address}, ${area}` },
                        { icon: CreditCard, label: 'Payment', value: PAYMENT_METHODS.find(p => p.id === paymentMethod)?.label },
                        { icon: Banknote, label: 'Total', value: `৳${total.toLocaleString()}` },
                      ].map(item => (
                        <div key={item.label} className="flex gap-3">
                          <item.icon size={14} style={{ color: '#1E88E5' }} />
                          <span className="text-gray-500 w-20 shrink-0">{item.label}:</span>
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="py-3 rounded-xl font-semibold text-sm text-white transition-all hover:shadow-md"
                      style={{ background: '#1E88E5' }}
                    >
                      View My Bookings
                    </button>
                    <button
                      onClick={() => navigate('/find')}
                      className="py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Book Another
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                    <Phone size={12} />
                    Provider contact: {provider.phone}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              {step < 5 && (
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={handleBack}
                    className="px-5 py-3 rounded-xl font-semibold text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft size={15} className="inline mr-1" />
                    Back
                  </button>
                  <button
                    onClick={step === 4 ? handleNext : handleNext}
                    disabled={!canProceed()}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #1E88E5, #0d47a1)' }}
                  >
                    {step === 4 ? 'Confirm & Pay' : 'Continue'}
                    <ArrowRight size={15} className="inline ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Order Summary</h3>

              {/* Provider */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                {provider.photo ? (
                  <img src={provider.photo} alt={provider.name} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: cat?.bg }}>
                    {cat?.emoji}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{provider.name}</div>
                  <div className="text-xs text-gray-400">{cat?.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={10} fill="#F9A825" color="#F9A825" />
                    <span>{provider.rating}</span>
                  </div>
                </div>
              </div>

              {/* Summary items */}
              <div className="space-y-3 text-sm mb-4">
                {[
                  { label: 'Service', value: selectedService || '—' },
                  { label: 'Duration', value: selectedService ? `${duration} hour${duration > 1 ? 's' : ''}` : '—' },
                  { label: 'Date', value: selectedDate || '—' },
                  { label: 'Time', value: selectedTime || '—' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              {selectedService && (
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({duration}hr × ৳{serviceData?.price})</span>
                    <span className="font-medium text-gray-900">৳{baseAmount}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo (AMARSHEBA20)</span>
                      <span>-৳{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform fee (5%)</span>
                    <span className="text-gray-500">৳{platformFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2">
                    <span className="text-gray-900">Total</span>
                    <span style={{ color: '#1E88E5' }}>৳{total}</span>
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-5 space-y-2">
                {[
                  { icon: Lock, text: 'Secure payment' },
                  { icon: CheckCircle2, text: 'Free cancellation' },
                  { icon: Star, text: 'Quality guaranteed' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-400">
                    <item.icon size={12} style={{ color: '#1E88E5' }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};