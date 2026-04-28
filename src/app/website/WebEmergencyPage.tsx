import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Zap, Clock, Shield, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, BadgeDollarSign, Siren } from 'lucide-react';
import { AREAS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const EMERGENCY_SERVICES = [
  {
    id: 'plumber',
    title: 'Emergency Plumber',
    titleBn: 'জরুরি প্লাম্বার',
    emoji: '🔧',
    color: '#1E88E5',
    bg: '#E3F2FD',
    avgResponse: '20–35 min',
    price: '৳500+',
    desc: 'Burst pipes, severe leaks, drain blockage, water tank overflow — 24/7 emergency response across Dhaka.',
    cases: ['Burst pipe flooding', 'Severe drain blockage', 'Gas line issues', 'Water heater failure'],
    available: true,
  },
  {
    id: 'electrician',
    title: 'Emergency Electrician',
    titleBn: 'জরুরি ইলেকট্রিশিয়ান',
    emoji: '⚡',
    color: '#F9A825',
    bg: '#FFFDE7',
    avgResponse: '25–40 min',
    price: '৳600+',
    desc: 'Power outage, sparking wires, circuit breaker trips, electrical fire hazards — safety first, response always.',
    cases: ['Total power outage', 'Sparking outlets', 'AC/appliance failure', 'Circuit breaker issues'],
    available: true,
  },
  {
    id: 'ambulance',
    title: 'Ambulance Service',
    titleBn: 'অ্যাম্বুলেন্স সেবা',
    emoji: '🚑',
    color: '#F44336',
    bg: '#FFEBEE',
    avgResponse: '10–20 min',
    price: '৳1,500+',
    desc: 'Fully equipped ambulances with trained paramedics. Basic and ICU-level support available round the clock.',
    cases: ['Heart attack / stroke', 'Accident emergency', 'Hospital transfer', 'Delivery emergency'],
    available: true,
  },
  {
    id: 'nursing',
    title: 'Urgent Nursing',
    titleBn: 'জরুরি নার্সিং',
    emoji: '🏥',
    color: '#E91E63',
    bg: '#FCE4EC',
    avgResponse: '45–90 min',
    price: '৳800+',
    desc: 'Urgent nursing care for post-surgery patients, elderly with sudden complications, and pediatric emergencies.',
    cases: ['Post-surgery complications', 'Sudden patient deterioration', 'Medication emergency', 'Wound care'],
    available: true,
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Select Emergency',
    desc: 'Choose your emergency type from the options below.',
    icon: AlertTriangle,
    color: '#F44336',
  },
  {
    num: '02',
    title: 'Confirm Location',
    desc: 'Share your exact address or use GPS. We\'ll dispatch the nearest available provider.',
    icon: MapPin,
    color: '#FF9800',
  },
  {
    num: '03',
    title: 'Provider Dispatched',
    desc: 'You\'ll get an instant confirmation with provider name, photo, and ETA.',
    icon: Zap,
    color: '#1E88E5',
  },
  {
    num: '04',
    title: 'Help Arrives',
    desc: 'Provider arrives and resolves your emergency. Pay after service is complete.',
    icon: CheckCircle2,
    color: '#4CAF50',
  },
];

export const WebEmergencyPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const selected = EMERGENCY_SERVICES.find(s => s.id === selectedService);

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Hero — Red/Alert styled */}
      <div
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #b71c1c 0%, #D32F2F 50%, #E53935 100%)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '30px 30px',
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Available 24/7 • Average Response Under 30 Minutes
          </div>
          <h1 className="text-white mb-3" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1 }}>
            {language === 'en' ? 'Emergency Services' : 'জরুরি সেবা'}
          </h1>
          <p className="text-red-100 text-xl mb-2" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
            জরুরি মুহূর্তে আমরা আপনার পাশে আছি
          </p>
          <p className="text-red-200 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
            Plumbing emergencies, electrical faults, ambulance needs, urgent nursing — AmarSheba dispatches the nearest verified provider to you within minutes.
          </p>

          {/* Emergency hotline */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-5 shadow-2xl">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: '#FFEBEE' }}>
              <Phone size={28} style={{ color: '#F44336' }} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Emergency Hotline</div>
              <div className="font-black text-2xl text-gray-900">+880 1700-999999</div>
              <div className="text-xs text-gray-400">Call anytime — immediate dispatch</div>
            </div>
          </div>
        </div>
      </div>

      {/* How Emergency Booking Works */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '2rem' }}>
              How Emergency Booking Works
            </h2>
            <p className="text-gray-500 text-sm">From tap to doorstep in under 30 minutes.</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-6 relative">
            <div className="hidden sm:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-200 via-orange-200 to-green-200" />
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="text-center relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative shadow-lg"
                    style={{ background: `${step.color}15` }}
                  >
                    <Icon size={28} style={{ color: step.color }} />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: step.color }}
                    >
                      {step.num.slice(-1)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Services Cards + Booking Form */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left: Service selection */}
            <div className="lg:col-span-2">
              <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: '1.8rem' }}>
                Select Emergency Type
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {EMERGENCY_SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    className={`text-left rounded-3xl p-6 border-2 transition-all ${
                      selectedService === service.id
                        ? 'shadow-xl scale-[1.02]'
                        : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
                    }`}
                    style={selectedService === service.id ? { borderColor: service.color, background: `${service.bg}` } : {}}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm"
                        style={{ background: service.bg }}
                      >
                        {service.emoji}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#4CAF50' }}>
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          Available
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{service.avgResponse}</div>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-1">{service.title}</h3>
                    <p className="text-xs mb-3" style={{ color: service.color, fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                      {service.titleBn}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.cases.map(c => (
                        <span key={c} className="px-2 py-1 rounded-lg text-[10px] font-medium" style={{ background: service.bg, color: service.color }}>
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg" style={{ color: service.color }}>
                        Starting {service.price}
                      </span>
                      {selectedService === service.id && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-white px-3 py-1.5 rounded-full" style={{ background: service.color }}>
                          <CheckCircle2 size={12} /> Selected
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Booking form */}
            <div>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sticky top-24">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce" style={{ background: '#E8F5E9' }}>
                      <CheckCircle2 size={32} style={{ color: '#4CAF50' }} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">Provider Dispatched! 🚀</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      We've dispatched the nearest available {selected?.title} to your location. Estimated arrival: <strong>{selected?.avgResponse}</strong>.
                    </p>
                    <div className="bg-green-50 rounded-2xl p-4 mb-5 text-left">
                      <div className="text-xs font-semibold text-green-700 mb-2">📱 What to expect next:</div>
                      <div className="space-y-1.5 text-xs text-green-600">
                        <div>✓ You'll receive an SMS with provider details</div>
                        <div>✓ Provider will call you to confirm address</div>
                        <div>✓ Track arrival in real-time via SMS</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 mb-4">Emergency ID: <strong>EM{Date.now().toString().slice(-6)}</strong></div>
                    <button
                      onClick={() => { setSubmitted(false); setSelectedService(null); setAddress(''); setPhone(''); }}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                      style={{ background: '#1E88E5' }}
                    >
                      Book Another Service
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FFEBEE' }}>
                        <AlertTriangle size={20} style={{ color: '#F44336' }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Emergency Dispatch</h3>
                        <p className="text-xs text-gray-400">Priority response — under 30 min</p>
                      </div>
                    </div>

                    {!selectedService && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-5">
                        <p className="text-yellow-700 text-xs font-medium">← Select an emergency type on the left to proceed.</p>
                      </div>
                    )}

                    {selectedService && selected && (
                      <div className="p-3 rounded-xl mb-5" style={{ background: selected.bg }}>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{selected.emoji}</span>
                          <div>
                            <div className="font-semibold text-sm" style={{ color: selected.color }}>{selected.title}</div>
                            <div className="text-xs text-gray-500">Avg. {selected.avgResponse} response</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Your Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+880 17XX-XXXXXX"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-red-400 bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Area <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={selectedArea}
                          onChange={e => setSelectedArea(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-red-400 bg-gray-50"
                        >
                          <option value="">Select your area</option>
                          {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Full Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="House/flat number, road, building name..."
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-red-400 bg-gray-50 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!selectedService || loading}
                        className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:shadow-xl disabled:opacity-50"
                        style={{ background: loading ? '#ef9a9a' : 'linear-gradient(135deg, #D32F2F, #b71c1c)' }}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Dispatching Provider...
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            Dispatch Emergency Provider
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Phone size={12} />
                      Or call directly: +880 1700-999999
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Guarantees */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-bold text-gray-900 mb-3" style={{ fontSize: '2rem' }}>
              Emergency Service Guarantees
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Sub-30 Min Response',
                desc: 'We guarantee provider dispatch within 5 minutes of booking confirmation. Average arrival time is under 30 minutes across Dhaka.',
                color: '#FF9800',
              },
              {
                icon: ShieldCheck,
                title: 'Verified Emergency Providers',
                desc: 'All emergency providers carry extra verification — police clearance, emergency response certification, and first-aid training.',
                color: '#1E88E5',
              },
              {
                icon: BadgeDollarSign,
                title: 'No Fix, No Fee',
                desc: 'If our emergency provider cannot solve your issue on the first visit, you pay nothing. We\'ll send a second provider at no extra cost.',
                color: '#4CAF50',
              },
            ].map(item => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <item.icon size={32} className="mx-auto mb-4" style={{ color: item.color }} />
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #b71c1c, #D32F2F)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Siren size={42} className="mx-auto mb-4 text-white" />
          <h2 className="text-white font-bold mb-3" style={{ fontSize: '2rem' }}>
            In An Emergency Right Now?
          </h2>
          <p className="text-red-200 text-sm mb-8">
            Don't wait. Call our emergency hotline for immediate dispatch — available 24/7.
          </p>
          <a
            href="tel:+8801700999999"
            className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#FFEBEE' }}>
              <Phone size={24} style={{ color: '#F44336' }} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-gray-500">Emergency Hotline</div>
              <div className="font-black text-2xl text-gray-900">+880 1700-999999</div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
