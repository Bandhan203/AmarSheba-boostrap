import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type AuthTab = 'login' | 'register' | 'provider';

const ROLE_ACCESS = [
  {
    role: 'Customer',
    roleBn: 'গ্রাহক',
    path: '/dashboard',
    desc: 'Book services, track orders, manage wallet & profile.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    role: 'Provider',
    roleBn: 'সেবাদাতা',
    path: '/provider-app',
    desc: 'Manage requests, schedule, earnings, and verification.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    role: 'Resource',
    roleBn: 'রিসোর্স',
    path: '/resource-app',
    desc: 'Handle field assignments, proof uploads, issue reporting.',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    role: 'Admin',
    roleBn: 'অ্যাডমিন',
    path: '/admin',
    desc: 'Platform analytics, disputes, commissions, settlements.',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

export const WebAuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, setLanguage, signInAs } = useApp();
  const redirectPath = searchParams.get('redirect');

  const initialTab = (searchParams.get('tab') as AuthTab) || 'login';
  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    area: '',
  });
  const [providerData, setProviderData] = useState({
    name: '',
    category: '',
    area: '',
    nid: '',
    phone: '',
    type: 'local',
  });

  const AREAS = ['Gulshan', 'Banani', 'Uttara', 'Dhanmondi', 'Mirpur', 'Mohakhali', 'Bashundhara'];
  const CATEGORIES = ['Maid', 'Driver', 'Chef', 'Plumber', 'Electrician', 'Nursing', 'Physiotherapy', 'Ambulance'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signInAs('customer');
      setLoading(false);
      navigate(redirectPath || '/dashboard');
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signInAs('customer');
      setLoading(false);
      navigate(redirectPath || '/dashboard');
    }, 1000);
  };

  const handleProviderRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signInAs('provider');
      setLoading(false);
      navigate(redirectPath || '/provider-app');
    }, 1000);
  };

  return (
    <div className="panel-shell px-4 py-8 md:py-12">
      <div className="panel-container">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <button onClick={() => navigate('/')} className="text-left">
                <p className="text-[22px] font-extrabold tracking-tight text-[#2563EB]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
                  AmarSheba
                </p>
                <p className="text-xs text-slate-500">Secure sign in & account onboarding</p>
              </button>

              <div className="inline-flex rounded-full bg-slate-100 p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${language === 'bn' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5">
              {([
                { key: 'login', label: language === 'en' ? 'Log In' : 'লগইন' },
                { key: 'register', label: language === 'en' ? 'Sign Up' : 'রেজিস্টার' },
                { key: 'provider', label: language === 'en' ? 'Provider' : 'সেবাদাতা' },
              ] as { key: AuthTab; label: string }[]).map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setTab(item.key);
                    setStep(1);
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${tab === item.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Email or Phone</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com / 017XXXXXXXX"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none focus:border-blue-400"
                    />
                    <button type="button" onClick={() => setShowPass((prev) => !prev)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {showPass ? <EyeOff size={16} className="text-slate-400" /> : <Eye size={16} className="text-slate-400" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="panel-btn-primary w-full py-3">
                  {loading ? 'Logging in...' : 'Log In'}
                  <ArrowRight size={15} />
                </button>

                <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs text-blue-700">Demo: any email + password works.</p>
              </form>
            )}

            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="mb-2 flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-[#004AC6]' : 'bg-slate-200'}`} />
                  ))}
                </div>

                {step === 1 && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={registerData.name}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Email</label>
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="tel"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-600">Area</label>
                      <select
                        value={registerData.area}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, area: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                      >
                        <option value="">Select area</option>
                        {AREAS.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="panel-card-soft text-center">
                    <p className="text-sm font-semibold text-slate-900">OTP Verification</p>
                    <p className="mt-1 text-xs text-slate-600">Enter OTP sent to your phone (demo: click next).</p>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Create Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none focus:border-blue-400"
                      />
                      <button type="button" onClick={() => setShowPass((prev) => !prev)} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {showPass ? <EyeOff size={16} className="text-slate-400" /> : <Eye size={16} className="text-slate-400" />}
                      </button>
                    </div>
                  </div>
                )}

                <button type="submit" disabled={loading} className="panel-btn-primary w-full py-3">
                  {loading ? 'Processing...' : step === 3 ? 'Create Account' : 'Next Step'}
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            {tab === 'provider' && (
              <form onSubmit={handleProviderRegister} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    value={providerData.name}
                    onChange={(e) => setProviderData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Category</label>
                    <select
                      value={providerData.category}
                      onChange={(e) => setProviderData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option value="">Select</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Area</label>
                    <select
                      value={providerData.area}
                      onChange={(e) => setProviderData((prev) => ({ ...prev, area: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-400"
                    >
                      <option value="">Select</option>
                      {AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Provider Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'local', label: 'Local' },
                      { value: 'expert', label: 'Expert' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setProviderData((prev) => ({ ...prev, type: opt.value }))}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${providerData.type === opt.value ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Phone</label>
                  <input
                    type="tel"
                    value={providerData.phone}
                    onChange={(e) => setProviderData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">NID Number</label>
                  <input
                    type="text"
                    value={providerData.nid}
                    onChange={(e) => setProviderData((prev) => ({ ...prev, nid: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  />
                </div>

                <button type="submit" disabled={loading} className="panel-btn-primary w-full bg-emerald-600 py-3 hover:bg-emerald-700">
                  {loading ? 'Submitting...' : 'Submit Provider Application'}
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            <button onClick={() => navigate('/')} className="mt-6 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700">
              ← Back to Home
            </button>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#004AC6]">
              <ShieldCheck size={16} />
              Role-Based Access
            </div>
            <h2 className="mt-3 text-2xl font-bold text-[#0B1C30]" style={{ fontFamily: 'Manrope, Inter, sans-serif' }}>
              কে কোন প্যানেলে লগইন করবে
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              AmarSheba-তে প্রতিটি role এর আলাদা dashboard আছে। নিচের map অনুযায়ী user role নির্বাচন করে login করলে সঠিক panel-এ redirect হবে।
            </p>

            <div className="mt-6 space-y-3">
              {ROLE_ACCESS.map((item) => (
                <div key={item.role} className={`rounded-2xl border p-4 ${item.color}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold">{item.role}</p>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold">{item.roleBn}</span>
                  </div>
                  <p className="mt-1 text-xs opacity-90">{item.desc}</p>
                  <p className="mt-2 text-[11px] font-semibold">Panel Route: {item.path}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Users size={15} />
                Quick Notes
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 text-emerald-600" />Guest users can browse public pages without login.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 text-emerald-600" />Customer/Provider are fully supported in this auth form.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={13} className="mt-0.5 text-emerald-600" />Resource/Admin panels are role-protected via route rules.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
