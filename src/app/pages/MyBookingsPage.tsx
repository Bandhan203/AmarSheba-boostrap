import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { BottomNav } from '../components/BottomNav';
import { MOCK_BOOKINGS, BookingStatus } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Star, RotateCcw, XCircle, Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

const STATUS_CONFIG: Record<BookingStatus, { label: string; labelBn: string; color: string; bg: string }> = {
  upcoming: { label: 'Upcoming', labelBn: 'আসন্ন', color: '#1E88E5', bg: '#E3F2FD' },
  ongoing: { label: 'Ongoing', labelBn: 'চলমান', color: '#4CAF50', bg: '#E8F5E9' },
  completed: { label: 'Completed', labelBn: 'সম্পন্ন', color: '#757575', bg: '#F3F4F6' },
  cancelled: { label: 'Cancelled', labelBn: 'বাতিল', color: '#F44336', bg: '#FFEBEE' },
};

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [ratingModal, setRatingModal] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const t = (en: string, bn: string) => language === 'bn' ? bn : en;

  const upcoming = MOCK_BOOKINGS.filter(b => b.status === 'upcoming');
  const past = MOCK_BOOKINGS.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const displayedBookings = activeTab === 'upcoming' ? upcoming : past;

  return (
    <MobileFrame>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto relative" style={{ scrollbarWidth: 'none', backgroundColor: '#F5F7FA' }}>
          {/* Header */}
          <div className="bg-white px-4 pt-12 pb-0 shadow-sm sticky top-0 z-30">
            <div className="flex items-center gap-3 pb-3">
              <button onClick={() => navigate('/home')} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <div>
                <h2 className="font-bold text-gray-900">{t('My Bookings', 'আমার বুকিং')}</h2>
                <p className="text-xs text-gray-400">{MOCK_BOOKINGS.length} {t('total bookings', 'মোট বুকিং')}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {[
                { id: 'upcoming', label: t('Upcoming', 'আসন্ন'), count: upcoming.length },
                { id: 'past', label: t('History', 'ইতিহাস'), count: past.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex-1 pb-3 flex items-center justify-center gap-1.5 text-sm font-semibold transition-all border-b-2"
                  style={{
                    color: activeTab === tab.id ? '#1E88E5' : '#9CA3AF',
                    borderColor: activeTab === tab.id ? '#1E88E5' : 'transparent',
                  }}
                >
                  {tab.label}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: activeTab === tab.id ? '#1E88E5' : '#F3F4F6',
                      color: activeTab === tab.id ? 'white' : '#9CA3AF',
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Booking list */}
          <div className="px-4 pt-4 space-y-3">
            {displayedBookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📋</div>
                <p className="text-gray-500 font-medium">{t('No bookings yet', 'কোনো বুকিং নেই')}</p>
                <button
                  onClick={() => navigate('/home')}
                  className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ backgroundColor: '#1E88E5' }}
                >
                  {t('Book a Service', 'সেবা বুক করুন')}
                </button>
              </div>
            ) : (
              displayedBookings.map(booking => {
                const status = STATUS_CONFIG[booking.status];
                const hasRating = booking.rating || ratings[booking.id];

                return (
                  <div key={booking.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    {/* Status bar */}
                    <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: status.bg }}>
                      <span className="text-xs font-bold" style={{ color: status.color }}>
                        {language === 'bn' ? status.labelBn : status.label}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">#{booking.id}</span>
                    </div>

                    <div className="p-4">
                      {/* Provider */}
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                        {booking.providerPhoto ? (
                          <img src={booking.providerPhoto} alt="" className="w-11 h-11 rounded-xl object-cover" />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-[#1E88E5] flex items-center justify-center text-white font-bold">
                            {booking.providerName.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">{booking.providerName}</p>
                          <p className="text-xs text-gray-400">{booking.category} • {booking.service}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm" style={{ color: '#1E88E5' }}>৳{booking.amount.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="text-gray-400" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          {booking.duration}hr
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <MapPin size={12} className="text-gray-400" />
                        {booking.address}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                        {booking.status === 'upcoming' && (
                          <>
                            <button className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 flex items-center justify-center gap-1">
                              <Calendar size={12} /> {t('Reschedule', 'পুনর্নির্ধারণ')}
                            </button>
                            <button className="flex-1 py-2 rounded-xl border border-red-200 text-xs font-semibold text-red-500 flex items-center justify-center gap-1">
                              <XCircle size={12} /> {t('Cancel', 'বাতিল')}
                            </button>
                          </>
                        )}
                        {booking.status === 'completed' && (
                          <>
                            <button
                              onClick={() => navigate('/providers')}
                              className="flex-1 py-2 rounded-xl border border-blue-200 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1"
                            >
                              <RotateCcw size={12} /> {t('Rebook', 'পুনর্বুক')}
                            </button>
                            {!hasRating ? (
                              <button
                                onClick={() => setRatingModal(booking.id)}
                                className="flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1"
                                style={{ backgroundColor: '#FF9800' }}
                              >
                                <Star size={12} /> {t('Rate', 'রেটিং দিন')}
                              </button>
                            ) : (
                              <div className="flex-1 py-2 rounded-xl bg-green-50 text-xs font-semibold text-green-600 flex items-center justify-center gap-1">
                                <Star size={12} fill="#4CAF50" stroke="none" />
                                {booking.rating || ratings[booking.id]} ★ {t('Rated', 'রেটিং দেওয়া হয়েছে')}
                              </div>
                            )}
                          </>
                        )}
                        {booking.status === 'cancelled' && (
                          <button
                            onClick={() => navigate('/providers')}
                            className="flex-1 py-2 rounded-xl border border-blue-200 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1"
                          >
                            <RotateCcw size={12} /> {t('Book Again', 'আবার বুক করুন')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Rating Modal */}
          {ratingModal && (
            <div className="absolute inset-0 z-50 flex items-end">
              <div className="absolute inset-0 bg-black/40" onClick={() => setRatingModal(null)} />
              <div className="relative w-full bg-white rounded-t-3xl p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{t('Rate Your Experience', 'আপনার অভিজ্ঞতা রেটিং দিন')}</h3>
                <p className="text-gray-500 text-sm mb-4">{t('How was the service?', 'সেবা কেমন ছিল?')}</p>
                <div className="flex justify-center gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      onClick={() => setRatings(r => ({ ...r, [ratingModal]: s }))}
                      className="text-4xl transition-transform active:scale-110"
                    >
                      <Star
                        size={40}
                        fill={s <= (ratings[ratingModal] || 0) ? '#F9A825' : 'none'}
                        stroke={s <= (ratings[ratingModal] || 0) ? '#F9A825' : '#D1D5DB'}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder={t('Write your review...', 'আপনার রিভিউ লিখুন...')}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none resize-none mb-4"
                />
                <button
                  onClick={() => setRatingModal(null)}
                  disabled={!ratings[ratingModal]}
                  className="w-full py-3.5 rounded-2xl text-white font-bold"
                  style={{ backgroundColor: '#FF9800', opacity: ratings[ratingModal] ? 1 : 0.5 }}
                >
                  {t('Submit Review', 'রিভিউ জমা দিন')}
                </button>
              </div>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </MobileFrame>
  );
};