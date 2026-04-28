import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    titleBn: 'ফোন / হোয়াটসঅ্যাপ',
    value: '+880 1700-000000',
    sub: 'Available 24/7 for emergencies',
    color: '#4CAF50',
    bg: '#E8F5E9',
  },
  {
    icon: Mail,
    title: 'Email Support',
    titleBn: 'ইমেইল সাপোর্ট',
    value: 'support@amarsheba.com.bd',
    sub: 'Response within 2 hours',
    color: '#1E88E5',
    bg: '#E3F2FD',
  },
  {
    icon: MapPin,
    title: 'Head Office',
    titleBn: 'প্রধান কার্যালয়',
    value: 'Gulshan-2, Dhaka 1212',
    sub: 'Sun–Thu: 9AM–6PM',
    color: '#9C27B0',
    bg: '#F3E5F5',
  },
  {
    icon: Clock,
    title: 'Emergency Line',
    titleBn: 'জরুরি লাইন',
    value: '+880 1700-999999',
    sub: 'Plumbing, electrical, medical 24/7',
    color: '#F44336',
    bg: '#FFEBEE',
  },
];

const FAQ_CONTACT = [
  { q: 'How long does it take to get a response?', a: 'For email, within 2 hours during business days. For WhatsApp/phone, immediate.' },
  { q: 'I have a complaint about a provider. What should I do?', a: 'Use the "Complaint" topic in the form below or call our hotline. We resolve all complaints within 24 hours.' },
  { q: 'How do I cancel a booking?', a: 'Cancel through your dashboard up to 2 hours before the service. Or call our support line.' },
  { q: 'I want to partner with AmarSheba as a business?', a: 'Great! Email us at partnerships@amarsheba.com.bd with your proposal.' },
];

export const WebContactPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1, #1E88E5)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white mb-3" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
            {language === 'en' ? 'Contact Us' : 'যোগাযোগ করুন'}
          </h1>
          <p className="text-blue-200 mb-2" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
            আমরা সাহায্য করতে সর্বদা প্রস্তুত
          </p>
          <p className="text-blue-300 text-sm max-w-xl mx-auto">
            Have a question, complaint, or partnership inquiry? We're here to help — 24/7 for emergencies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Contact methods */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CONTACT_METHODS.map(method => {
            const Icon = method.icon;
            return (
              <div
                key={method.title}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: method.bg }}
                >
                  <Icon size={26} style={{ color: method.color }} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{method.title}</h3>
                <p className="text-xs mb-2 text-gray-400" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{method.titleBn}</p>
                <p className="font-medium text-gray-800 text-sm mb-1">{method.value}</p>
                <p className="text-xs text-gray-400">{method.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E3F2FD' }}>
                <MessageCircle size={20} style={{ color: '#1E88E5' }} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Send Us a Message</h2>
                <p className="text-xs text-gray-400">We'll respond within 2 hours</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#E8F5E9' }}>
                  <CheckCircle2 size={32} style={{ color: '#4CAF50' }} />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Message Sent! ✓</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Thank you, {formData.name}! Our team will respond to {formData.email} within 2 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', topic: '', message: '' }); }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: '#1E88E5' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+880 1X00-000000"
                      value={formData.phone}
                      onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.topic}
                      onChange={e => setFormData(p => ({ ...p, topic: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50"
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="complaint">Provider Complaint</option>
                      <option value="payment">Payment Issue</option>
                      <option value="provider">Become a Provider</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="media">Media / Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry in detail. You can write in Bengali or English."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #1E88E5, #0d47a1)' }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + FAQ */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div
              className="rounded-3xl overflow-hidden h-56 flex items-center justify-center relative border border-gray-100"
              style={{ background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)' }}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <div className="font-semibold text-gray-700">AmarSheba Head Office</div>
                <div className="text-gray-500 text-sm">Gulshan-2, Dhaka 1212, Bangladesh</div>
                <div className="text-xs text-gray-400 mt-2">Open: Sun–Thu 9AM–6PM</div>
              </div>
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.google.com/?q=Gulshan+2+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                  style={{ background: '#1E88E5' }}
                >
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Operating hours */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={16} style={{ color: '#1E88E5' }} />
                Operating Hours
              </h3>
              <div className="space-y-2.5">
                {[
                  { day: 'Sunday – Thursday', hours: '9:00 AM – 6:00 PM' },
                  { day: 'Friday – Saturday', hours: '10:00 AM – 4:00 PM' },
                  { day: 'Emergency Hotline', hours: '24 hours / 7 days' },
                  { day: 'Email Response', hours: 'Within 2 hours (business days)' },
                ].map(item => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="font-medium text-gray-900">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Answers</h3>
              <div className="space-y-4">
                {FAQ_CONTACT.map((faq, i) => (
                  <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-800 text-sm mb-1">{faq.q}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
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