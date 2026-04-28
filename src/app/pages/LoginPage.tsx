import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileFrame } from '../components/MobileFrame';
import { ChevronLeft, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  const handleOtpChange = (val: string, i: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
    if (next.every(d => d) && i === 5) {
      // auto verify after a brief delay
      setTimeout(() => navigate('/home'), 500);
    }
  };

  return (
    <MobileFrame>
      <div className="min-h-full bg-white flex flex-col">
        {/* Header area */}
        <div className="relative">
          <div className="h-56 bg-gradient-to-br from-[#1E88E5] to-[#0d47a1] rounded-b-[40px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
              <span className="text-4xl">🏠</span>
            </div>
            <h1 className="text-white font-bold text-xl">AmarSheba</h1>
            <p className="text-blue-200 text-xs mt-1">আমার সেবা • Dhaka</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 left-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="absolute top-12 right-4 flex bg-white/20 rounded-full p-1">
            <button onClick={() => setLang('en')} className={`text-xs px-2.5 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white text-[#1E88E5] font-semibold' : 'text-white'}`}>EN</button>
            <button onClick={() => setLang('bn')} className={`text-xs px-2.5 py-1 rounded-full transition-all ${lang === 'bn' ? 'bg-white text-[#1E88E5] font-semibold' : 'text-white'}`}>বাং</button>
          </div>
        </div>

        <div className="flex-1 px-6 pt-6">
          {step === 'phone' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {lang === 'bn' ? 'আপনার নম্বর দিন' : 'Enter your number'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {lang === 'bn' ? 'আমরা একটি OTP পাঠাব' : "We'll send you a verification code"}
              </p>

              {/* Phone input */}
              <div className="flex gap-2 mb-4">
                <div className="flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-3 border border-gray-200">
                  <span className="text-base">🇧🇩</span>
                  <span className="text-gray-700 text-sm font-medium">+880</span>
                </div>
                <input
                  type="tel"
                  placeholder={lang === 'bn' ? 'আপনার নম্বর' : 'Your mobile number'}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none border border-gray-200 focus:border-[#1E88E5]"
                />
              </div>

              {/* Info */}
              <div className="bg-[#E3F2FD] rounded-xl p-3 mb-8">
                <div className="flex items-start gap-2">
                  <Phone size={14} className="text-[#1E88E5] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#1565C0] leading-relaxed">
                    {lang === 'bn'
                      ? 'আপনার নম্বরে ৬ সংখ্যার OTP পাঠানো হবে। স্ট্যান্ডার্ড SMS চার্জ প্রযোজ্য।'
                      : 'A 6-digit OTP will be sent to your number. Standard SMS charges apply.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { if (phone.length >= 10) setStep('otp'); }}
                disabled={phone.length < 10}
                className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 transition-opacity"
                style={{ backgroundColor: '#1E88E5', opacity: phone.length < 10 ? 0.5 : 1 }}
              >
                {lang === 'bn' ? 'OTP পাঠান' : 'Send OTP'} <ArrowRight size={18} />
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                {lang === 'bn' ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?"}{' '}
                <span className="text-[#1E88E5] font-semibold cursor-pointer">
                  {lang === 'bn' ? 'রেজিস্ট্রেশন করুন' : 'Register'}
                </span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {lang === 'bn' ? 'OTP যাচাই করুন' : 'Verify OTP'}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                {lang === 'bn' ? 'কোডটি পাঠানো হয়েছে' : 'Code sent to'}
              </p>
              <p className="font-semibold text-[#1E88E5] text-sm mb-6">+880 {phone}</p>

              {/* OTP inputs */}
              <div className="flex gap-2 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !digit && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="flex-1 h-12 rounded-xl text-center text-lg font-bold text-gray-900 outline-none border-2 transition-all"
                    style={{
                      borderColor: digit ? '#1E88E5' : '#E5E7EB',
                      backgroundColor: digit ? '#E3F2FD' : '#F9FAFB',
                    }}
                  />
                ))}
              </div>

              {/* Demo hint */}
              <div className="bg-yellow-50 rounded-xl p-3 mb-6 border border-yellow-200">
                <p className="text-xs text-yellow-700 font-medium">
                  💡 Demo: Enter any 6 digits to proceed (e.g. 1 2 3 4 5 6)
                </p>
              </div>

              <button
                onClick={() => navigate('/home')}
                className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1E88E5' }}
              >
                {lang === 'bn' ? 'যাচাই করুন' : 'Verify & Continue'} <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4">
                <p className="text-xs text-gray-400">
                  {lang === 'bn' ? 'OTP পাননি?' : "Didn't receive?"}
                </p>
                <button
                  onClick={() => setOtp(['', '', '', '', '', ''])}
                  className="text-xs font-semibold"
                  style={{ color: '#1E88E5' }}
                >
                  {lang === 'bn' ? 'পুনরায় পাঠান' : 'Resend OTP'}
                </button>
              </div>

              {/* Success check if all filled */}
              {otp.every(d => d) && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <span className="text-green-600 text-sm font-medium">Verified! Redirecting...</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 text-center">
          <p className="text-xs text-gray-300">By continuing, you agree to AmarSheba's</p>
          <p className="text-xs text-gray-400">
            <span className="text-[#1E88E5]">Terms of Service</span> &{' '}
            <span className="text-[#1E88E5]">Privacy Policy</span>
          </p>
        </div>
      </div>
    </MobileFrame>
  );
};