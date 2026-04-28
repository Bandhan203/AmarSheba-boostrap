import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Star, MapPin, Shield, CheckCircle2, Clock, Phone, Calendar,
  ChevronLeft, ArrowRight, Award, ThumbsUp, Briefcase, User,
  IdCard, FileText, GraduationCap, Lock, BadgeDollarSign, PhoneCall, Gift
} from 'lucide-react';
import { CATEGORIES, PROVIDERS } from '../data/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WebProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');

  const provider = PROVIDERS.find(p => p.id === id);

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F7FA' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="font-bold text-gray-900 text-xl mb-2">Provider Not Found</h2>
          <button
            onClick={() => navigate('/find')}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white mt-3"
            style={{ background: '#1E88E5' }}
          >
            Browse All Providers
          </button>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES.find(c => c.id === provider.category);
  const relatedProviders = PROVIDERS
    .filter(p => p.category === provider.category && p.id !== provider.id)
    .slice(0, 3);

  const selectedServiceData = provider.services.find(s => s.name === selectedService);

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <ChevronLeft size={12} className="rotate-180" />
            <button onClick={() => navigate('/find')} className="hover:text-blue-600 transition-colors">Find Providers</button>
            <ChevronLeft size={12} className="rotate-180" />
            <button onClick={() => navigate(`/find?cat=${provider.category}`)} className="hover:text-blue-600 transition-colors">
              {cat?.name}
            </button>
            <ChevronLeft size={12} className="rotate-180" />
            <span className="text-gray-800 font-medium">{provider.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Provider header card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Cover image */}
              <div
                className="h-48 relative"
                style={provider.photo
                  ? { backgroundImage: `url(${provider.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: `linear-gradient(135deg, ${cat?.color || '#1E88E5'}30, ${cat?.bg || '#E3F2FD'})` }
                }
              >
                {!provider.photo && (
                  <div className="absolute inset-0 flex items-center justify-center text-7xl">
                    {cat?.emoji}
                  </div>
                )}
                {/* Type badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md"
                    style={{ background: provider.type === 'expert' ? '#7B1FA2' : '#4CAF50' }}
                  >
                    {provider.type === 'expert' ? '🟣 Expert Provider' : '🟢 Local Provider'}
                  </span>
                </div>
                {provider.verified && (
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md text-xs font-semibold" style={{ color: '#1E88E5' }}>
                    <Shield size={12} />
                    Verified
                  </div>
                )}
              </div>

              {/* Provider info */}
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <div
                    className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-lg shrink-0 flex items-center justify-center text-4xl"
                    style={{ background: cat?.bg || '#E3F2FD' }}
                  >
                    {provider.photo ? (
                      <img src={provider.photo} alt={provider.name} className="w-full h-full object-cover" />
                    ) : cat?.emoji}
                  </div>
                  <div className="pb-1">
                    <h1 className="font-bold text-gray-900 text-2xl">{provider.name}</h1>
                    <p className="text-sm text-gray-500" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{provider.nameBn}</p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  {[
                    { icon: Star, label: 'Rating', value: `${provider.rating} / 5.0`, color: '#F9A825', fill: true },
                    { icon: ThumbsUp, label: 'Reviews', value: `${provider.reviewCount} reviews`, color: '#1E88E5', fill: false },
                    { icon: Briefcase, label: 'Jobs Done', value: `${provider.jobsCompleted}+`, color: '#4CAF50', fill: false },
                    { icon: Award, label: 'Experience', value: `${provider.yearsExp} Years`, color: '#9C27B0', fill: false },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="text-center p-3 rounded-2xl" style={{ background: `${stat.color}10` }}>
                        <Icon size={20} style={{ color: stat.color }} className="mx-auto mb-1" fill={stat.fill ? stat.color : 'none'} />
                        <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                        <div className="text-[10px] text-gray-400">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} style={{ color: '#1E88E5' }} />
                    {provider.area}, Dhaka
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>{cat?.emoji}</span>
                    {cat?.name}
                  </span>
                  {provider.verified && (
                    <span className="flex items-center gap-1.5 text-green-600">
                      <CheckCircle2 size={15} />
                      NID Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="flex border-b border-gray-100">
                {(['about', 'services', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-semibold transition-all ${
                      activeTab === tab ? 'border-b-2 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    style={activeTab === tab ? { borderColor: '#1E88E5' } : {}}
                  >
                    {tab === 'about' ? 'About' : tab === 'services' ? `Services (${provider.services.length})` : `Reviews (${provider.reviews.length})`}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* About tab */}
                {activeTab === 'about' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About {provider.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{provider.description}</p>
                      <p className="text-gray-500 text-sm mt-2 leading-relaxed" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                        {provider.descriptionBn}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map(day => (
                          <span
                            key={day}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                              provider.availability.includes(day)
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                            style={provider.availability.includes(day) ? { background: '#1E88E5' } : {}}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Provider Credentials</h3>
                      <div className="space-y-2">
                        {[
                          { icon: IdCard, text: 'National ID Verified' },
                          { icon: FileText, text: `${provider.yearsExp} years of professional experience` },
                          ...(provider.verified ? [{ icon: GraduationCap, text: 'Certified & licensed professional' }] : []),
                          { icon: Star, text: `${provider.rating} star rating from ${provider.reviewCount} customers` },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                            <item.icon size={16} style={{ color: '#1E88E5' }} />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Services tab */}
                {activeTab === 'services' && (
                  <div className="space-y-3">
                    {provider.services.map(service => (
                      <button
                        key={service.name}
                        onClick={() => setSelectedService(selectedService === service.name ? null : service.name)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                          selectedService === service.name
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                            style={{ background: cat?.bg }}
                          >
                            {cat?.emoji}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{service.name}</div>
                            <div className="text-[10px] text-gray-400" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                              {service.nameBn}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-base" style={{ color: '#1E88E5' }}>৳{service.price}</div>
                          <div className="text-[10px] text-gray-400">per session</div>
                        </div>
                      </button>
                    ))}

                    {selectedService && (
                      <button
                        onClick={() => navigate(`/booking?provider=${provider.id}&service=${encodeURIComponent(selectedService)}`)}
                        className="w-full py-3 rounded-xl font-semibold text-sm text-white mt-3 transition-all hover:shadow-lg hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }}
                      >
                        Book "{selectedService}" — ৳{selectedServiceData?.price}
                        <ArrowRight size={15} className="inline ml-2" />
                      </button>
                    )}
                  </div>
                )}

                {/* Reviews tab */}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating summary */}
                    <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl" style={{ background: '#F5F7FA' }}>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">{provider.rating}</div>
                        <div className="flex gap-0.5 justify-center my-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={14} fill={s <= Math.round(provider.rating) ? '#F9A825' : '#e5e7eb'} color={s <= Math.round(provider.rating) ? '#F9A825' : '#e5e7eb'} />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{provider.reviewCount} reviews</div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map(r => {
                          const count = provider.reviews.filter(rev => rev.rating === r).length;
                          const pct = provider.reviews.length > 0 ? (count / provider.reviews.length) * 100 : 0;
                          return (
                            <div key={r} className="flex items-center gap-2 text-xs">
                              <span className="text-gray-500 w-3 text-right">{r}</span>
                              <Star size={10} fill="#F9A825" color="#F9A825" />
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#F9A825' }} />
                              </div>
                              <span className="text-gray-400 w-4">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Reviews list */}
                    <div className="space-y-4">
                      {provider.reviews.map(review => (
                        <div key={review.id} className="p-4 rounded-2xl border border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                                <User size={16} style={{ color: '#1E88E5' }} />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm">{review.customerName}</div>
                                <div className="text-[10px] text-gray-400">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(s => (
                                <Star key={s} size={12} fill={s <= review.rating ? '#F9A825' : '#e5e7eb'} color={s <= review.rating ? '#F9A825' : '#e5e7eb'} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related providers */}
            {relatedProviders.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Other {cat?.name} Providers</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {relatedProviders.map(p => (
                    <button
                      key={p.id}
                      onClick={() => navigate(`/find/${p.id}`)}
                      className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all p-4 text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {p.photo ? (
                          <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: cat?.bg }}>
                            {cat?.emoji}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{p.name}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star size={10} fill="#F9A825" color="#F9A825" />
                            {p.rating} • {p.area}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{p.price}{p.priceUnit}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">৳{provider.price}</div>
                  <div className="text-sm text-gray-400">{provider.priceUnit}</div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl">
                  <Star size={14} fill="#F9A825" color="#F9A825" />
                  <span className="font-semibold text-sm text-gray-800">{provider.rating}</span>
                </div>
              </div>

              {/* Service select */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Service</label>
                <select
                  value={selectedService || ''}
                  onChange={e => setSelectedService(e.target.value || null)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-white"
                >
                  <option value="">Choose a service...</option>
                  {provider.services.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} — ৳{s.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price summary */}
              {selectedService && selectedServiceData && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{selectedService}</span>
                    <span className="font-medium text-gray-900">৳{selectedServiceData.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Platform fee (5%)</span>
                    <span className="text-gray-500">৳{Math.round(selectedServiceData.price * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span style={{ color: '#1E88E5' }}>৳{Math.round(selectedServiceData.price * 1.05)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate(`/booking?provider=${provider.id}${selectedService ? `&service=${encodeURIComponent(selectedService)}` : ''}`)}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5 mb-3"
                style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }}
              >
                Book Now — Instant Confirmation
              </button>

              <button
                onClick={() => navigate(`/booking?provider=${provider.id}`)}
                className="w-full py-3 rounded-xl font-medium text-sm border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Schedule for Later
              </button>

              {/* Trust indicators */}
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: CheckCircle2, text: 'Free cancellation up to 2 hours before' },
                  { icon: Lock, text: 'Secure payment via bKash / Nagad / Card' },
                  { icon: BadgeDollarSign, text: 'Money-back guarantee if not satisfied' },
                  { icon: PhoneCall, text: '24/7 support for any issues' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <item.icon size={14} style={{ color: '#1E88E5' }} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Questions? Contact directly:</div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone size={14} style={{ color: '#1E88E5' }} />
                  {provider.phone}
                </div>
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={16} style={{ color: '#ea580c' }} />
                <span className="font-semibold text-orange-700 text-sm">First Booking? Save 20%</span>
              </div>
              <p className="text-orange-600 text-xs">
                Use promo code <strong>AMARSHEBA20</strong> at checkout for 20% off your first booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};