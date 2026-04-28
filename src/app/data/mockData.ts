export type ProviderType = 'local' | 'expert';
export type Category =
  | 'maid'
  | 'driver'
  | 'chef'
  | 'plumber'
  | 'electrician'
  | 'nursing'
  | 'physiotherapy'
  | 'ambulance'
  | 'carpenter'
  | 'plasterer'
  | 'tiler'
  | 'painter'
  | 'bricklayer'
  | 'flooring';
export type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type Language = 'en' | 'bn';

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  nameBn: string;
  category: Category;
  type: ProviderType;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  price: number;
  priceUnit: string;
  area: string;
  areaBn: string;
  photo: string;
  verified: boolean;
  yearsExp: number;
  description: string;
  descriptionBn: string;
  services: { name: string; nameBn: string; price: number }[];
  reviews: Review[];
  phone: string;
  availability: string[];
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerPhoto: string;
  category: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: BookingStatus;
  amount: number;
  address: string;
  rating?: number;
}

export const CATEGORIES = [
  { id: 'maid', name: 'Maid', nameBn: 'গৃহকর্মী', emoji: '🧹', bg: '#E3F2FD', color: '#1E88E5' },
  { id: 'driver', name: 'Driver', nameBn: 'চালক', emoji: '🚗', bg: '#FFF3E0', color: '#FF9800' },
  { id: 'chef', name: 'Chef', nameBn: 'রাঁধুনি', emoji: '👨‍🍳', bg: '#F3E5F5', color: '#9C27B0' },
  { id: 'plumber', name: 'Plumber', nameBn: 'প্লাম্বার', emoji: '🔧', bg: '#E8F5E9', color: '#4CAF50' },
  { id: 'electrician', name: 'Electrician', nameBn: 'ইলেকট্রিশিয়ান', emoji: '⚡', bg: '#FFFDE7', color: '#F9A825' },
  { id: 'nursing', name: 'Nursing', nameBn: 'নার্সিং', emoji: '🏥', bg: '#FCE4EC', color: '#E91E63' },
  { id: 'physiotherapy', name: 'Physio', nameBn: 'ফিজিওথেরাপি', emoji: '🤸', bg: '#E0F7FA', color: '#00BCD4' },
  { id: 'ambulance', name: 'Ambulance', nameBn: 'অ্যাম্বুলেন্স', emoji: '🚑', bg: '#FFEBEE', color: '#F44336' },
  { id: 'carpenter', name: 'Carpenters', nameBn: 'কার্পেন্টার', emoji: '🪵', bg: '#FFF8E1', color: '#8D6E63' },
  { id: 'plasterer', name: 'Plasterers', nameBn: 'প্লাস্টারার', emoji: '🧱', bg: '#F3E5F5', color: '#6A1B9A' },
  { id: 'tiler', name: 'Tilers', nameBn: 'টাইল বিশেষজ্ঞ', emoji: '🟦', bg: '#E1F5FE', color: '#0277BD' },
  { id: 'painter', name: 'Painters & Decorators', nameBn: 'পেইন্টার ও ডেকোরেটর', emoji: '🎨', bg: '#FCE4EC', color: '#AD1457' },
  { id: 'bricklayer', name: 'Brick Layers', nameBn: 'ইট মিস্ত্রি', emoji: '🏗️', bg: '#EFEBE9', color: '#795548' },
  { id: 'flooring', name: 'Flooring', nameBn: 'ফ্লোরিং', emoji: '🏠', bg: '#ECEFF1', color: '#546E7A' },
];

export const AREAS = ['Gulshan', 'Banani', 'Uttara', 'Dhanmondi', 'Mirpur', 'Mohakhali', 'Bashundhara'];

export const PROVIDERS: Provider[] = [
  // MAIDS
  {
    id: 'p1', name: 'Fatema Begum', nameBn: 'ফাতেমা বেগম', category: 'maid', type: 'local',
    rating: 4.7, reviewCount: 89, jobsCompleted: 238, price: 150, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1594751112816-54191319d44a?w=600&q=80',
    verified: false, yearsExp: 4,
    description: 'Experienced and trustworthy house maid with 4 years of service in Gulshan area. Expert in deep cleaning, cooking assistance, and childcare.',
    descriptionBn: 'গুলশান এলাকায় ৪ বছরের অভিজ্ঞতাসম্পন্ন বিশ্বস্ত গৃহকর্মী।',
    services: [
      { name: 'Regular Cleaning', nameBn: 'নিয়মিত পরিষ্কার', price: 150 },
      { name: 'Deep Cleaning', nameBn: 'গভীর পরিষ্কার', price: 250 },
      { name: 'Cooking Assistance', nameBn: 'রান্নায় সহায়তা', price: 200 },
      { name: 'Childcare', nameBn: 'শিশু যত্ন', price: 180 },
    ],
    reviews: [
      { id: 'r1', customerName: 'Anika Islam', rating: 5, comment: 'Very professional and thorough. My house was spotless!', date: '2025-12-10' },
      { id: 'r2', customerName: 'Raqib Hasan', rating: 4, comment: 'Good work, arrived on time.', date: '2025-11-28' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  {
    id: 'p2', name: 'Ruksana Akter', nameBn: 'রুকসানা আক্তার', category: 'maid', type: 'expert',
    rating: 4.9, reviewCount: 156, jobsCompleted: 512, price: 250, priceUnit: '/hr',
    area: 'Banani', areaBn: 'বনানী', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    verified: true, yearsExp: 8,
    description: 'Certified domestic expert with 8 years of premium household management experience. Trained in European cleaning techniques and professional hospitality standards.',
    descriptionBn: 'সার্টিফাইড গৃহস্থালি বিশেষজ্ঞ। ৮ বছরের প্রিমিয়াম অভিজ্ঞতা।',
    services: [
      { name: 'Premium Cleaning', nameBn: 'প্রিমিয়াম পরিষ্কার', price: 250 },
      { name: 'Full House Management', nameBn: 'পূর্ণ গৃহ ব্যবস্থাপনা', price: 400 },
      { name: 'Laundry & Ironing', nameBn: 'কাপড় ধোয়া ও ইস্ত্রি', price: 200 },
      { name: 'Elderly Care', nameBn: 'বৃদ্ধ যত্ন', price: 300 },
    ],
    reviews: [
      { id: 'r4', customerName: 'Tahmina Chowdhury', rating: 5, comment: 'Absolutely fantastic! Worth every taka.', date: '2025-12-15' },
    ],
    phone: '018XXXXXXXX', availability: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'p3', name: 'Hasina Khatun', nameBn: 'হাসিনা খাতুন', category: 'maid', type: 'local',
    rating: 4.5, reviewCount: 45, jobsCompleted: 89, price: 120, priceUnit: '/hr',
    area: 'Uttara', areaBn: 'উত্তরা', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    verified: false, yearsExp: 2,
    description: 'Reliable and hardworking house maid available in Uttara area. Specializes in regular cleaning and kitchen work.',
    descriptionBn: 'উত্তরা এলাকায় নির্ভরযোগ্য গৃহকর্মী।',
    services: [
      { name: 'Regular Cleaning', nameBn: 'নিয়মিত পরিষ্কার', price: 120 },
      { name: 'Kitchen Cleaning', nameBn: 'রান্নাঘর পরিষ্কার', price: 150 },
    ],
    reviews: [
      { id: 'r6', customerName: 'Nasir Ahmed', rating: 4, comment: 'Good service at a reasonable price.', date: '2025-11-20' },
    ],
    phone: '019XXXXXXXX', availability: ['Mon', 'Wed', 'Fri', 'Sat'],
  },

  // DRIVERS
  {
    id: 'p4', name: 'Mohammad Karim', nameBn: 'মোহাম্মদ করিম', category: 'driver', type: 'expert',
    rating: 4.9, reviewCount: 234, jobsCompleted: 892, price: 400, priceUnit: '/hr',
    area: 'Banani', areaBn: 'বনানী', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    verified: true, yearsExp: 12,
    description: 'Professional certified driver with 12 years of experience. Expert in city driving, airport transfers, and corporate commutes. Fluent in English.',
    descriptionBn: 'প্রফেশনাল সার্টিফাইড চালক। ১২ বছরের অভিজ্ঞতা।',
    services: [
      { name: 'Hourly Rental', nameBn: 'প্রতি ঘণ্টা ভাড়া', price: 400 },
      { name: 'Airport Transfer', nameBn: 'বিমানবন্দর ট্রান্সফার', price: 800 },
      { name: 'Monthly Contract', nameBn: 'মাসিক চুক্তি', price: 25000 },
    ],
    reviews: [
      { id: 'r7', customerName: 'Farhan Kabir', rating: 5, comment: 'Extremely professional and punctual.', date: '2025-12-18' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'p5', name: 'Abdul Mannan', nameBn: 'আব্দুল মান্নান', category: 'driver', type: 'local',
    rating: 4.7, reviewCount: 123, jobsCompleted: 345, price: 300, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    verified: false, yearsExp: 6,
    description: 'Experienced local driver covering Gulshan, Banani, and Baridhara areas.',
    descriptionBn: 'গুলশান, বনানী এলাকায় অভিজ্ঞ চালক।',
    services: [
      { name: 'Hourly Hire', nameBn: 'প্রতি ঘণ্টা ভাড়া', price: 300 },
      { name: 'Monthly', nameBn: 'মাসিক', price: 18000 },
    ],
    reviews: [
      { id: 'r9', customerName: 'Mamun Ahmed', rating: 5, comment: 'Reliable and knows Dhaka roads well.', date: '2025-11-30' },
    ],
    phone: '018XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'p6', name: 'Shafiqul Hasan', nameBn: 'শফিকুল হাসান', category: 'driver', type: 'expert',
    rating: 4.8, reviewCount: 189, jobsCompleted: 623, price: 450, priceUnit: '/hr',
    area: 'Dhanmondi', areaBn: 'ধামমন্ডি', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80',
    verified: true, yearsExp: 10,
    description: 'Licensed professional chauffeur with corporate driving experience.',
    descriptionBn: 'লাইসেন্সপ্রাপ্ত পেশাদার চালক। ভিআইপি পরিবহনে বিশেষজ্ঞ।',
    services: [
      { name: 'VIP Transfer', nameBn: 'ভিআইপি ট্রান্সফার', price: 600 },
      { name: 'Hourly', nameBn: 'প্রতি ঘণ্টা', price: 450 },
    ],
    reviews: [
      { id: 'r10', customerName: 'Sharif Uddin', rating: 5, comment: 'Professional service.', date: '2025-12-10' },
    ],
    phone: '019XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },

  // CHEFS
  {
    id: 'p7', name: 'Roksana Rahman', nameBn: 'রোকসানা রহমান', category: 'chef', type: 'expert',
    rating: 4.9, reviewCount: 98, jobsCompleted: 234, price: 800, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1580894732444-8f7279f323e0?w=600&q=80',
    verified: true, yearsExp: 15,
    description: 'Professional chef trained at BIAM Foundation.',
    descriptionBn: 'BIAM ফাউন্ডেশনে প্রশিক্ষিত পেশাদার শেফ।',
    services: [
      { name: 'Home Cooking', nameBn: 'দৈনিক রান্না', price: 800 },
    ],
    reviews: [
      { id: 'r11', customerName: 'Kamrul Hasan', rating: 5, comment: 'Exceptional food!', date: '2025-12-12' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'p8', name: 'Alam Hossain', nameBn: 'আলম হোসেন', category: 'chef', type: 'local',
    rating: 4.6, reviewCount: 67, jobsCompleted: 167, price: 500, priceUnit: '/hr',
    area: 'Banani', areaBn: 'বনানী', photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&q=80',
    verified: false, yearsExp: 7,
    description: 'Experienced home cook specializing in traditional Bangladeshi dishes.',
    descriptionBn: 'ঐতিহ্যবাহী বাংলাদেশি ও মুঘলাই রান্নায় দক্ষ।',
    services: [
      { name: 'Daily Cooking', nameBn: 'দৈনিক রান্না', price: 500 },
    ],
    reviews: [
      { id: 'r13', customerName: 'Asif Khan', rating: 5, comment: 'Great home-style cooking.', date: '2025-12-08' },
    ],
    phone: '018XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },

  // PLUMBERS
  {
    id: 'p9', name: 'Jahangir Alam', nameBn: 'জাহাঙ্গীর আলম', category: 'plumber', type: 'local',
    rating: 4.5, reviewCount: 112, jobsCompleted: 334, price: 200, priceUnit: '/hr',
    area: 'Mirpur', areaBn: 'মিরপুর', photo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    verified: false, yearsExp: 5,
    description: 'Skilled plumber with 5 years of experience in Dhaka.',
    descriptionBn: 'ঢাকায় ৫ বছরের অভিজ্ঞ প্লাম্বার।',
    services: [
      { name: 'Pipe Repair', nameBn: 'পাইপ মেরামত', price: 200 },
    ],
    reviews: [
      { id: 'r14', customerName: 'Mizanur Rahman', rating: 4, comment: 'Fixed leak quickly.', date: '2025-12-01' },
    ],
    phone: '019XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'p10', name: 'Delwar Hossain', nameBn: 'দেলোয়ার হোসেন', category: 'plumber', type: 'expert',
    rating: 4.8, reviewCount: 178, jobsCompleted: 567, price: 350, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1566937166907-da03d1967746?w=600&q=80',
    verified: true, yearsExp: 10,
    description: 'Licensed master plumber with 10 years of experience.',
    descriptionBn: 'লাইসেন্সপ্রাপ্ত মাস্টার প্লাম্বার।',
    services: [
      { name: 'Full Plumbing', nameBn: 'পূর্ণ প্লাম্বিং', price: 1500 },
    ],
    reviews: [
      { id: 'r15', customerName: 'Saleh Ahmed', rating: 5, comment: 'Professional work.', date: '2025-12-15' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },

  // ELECTRICIANS
  {
    id: 'p11', name: 'Rafiqul Islam', nameBn: 'রফিকুল ইসলাম', category: 'electrician', type: 'expert',
    rating: 4.8, reviewCount: 145, jobsCompleted: 445, price: 300, priceUnit: '/hr',
    area: 'Banani', areaBn: 'বনানী', photo: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&q=80',
    verified: true, yearsExp: 8,
    description: 'Certified electrician with government license.',
    descriptionBn: 'সরকারি লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান।',
    services: [
      { name: 'Wiring', nameBn: 'ওয়্যারিং', price: 300 },
    ],
    reviews: [
      { id: 'r16', customerName: 'Imran Hossain', rating: 5, comment: 'Knowledgeable and safe.', date: '2025-12-10' },
    ],
    phone: '018XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'p12', name: 'Aminul Haq', nameBn: 'আমিনুল হক', category: 'electrician', type: 'local',
    rating: 4.4, reviewCount: 87, jobsCompleted: 234, price: 200, priceUnit: '/hr',
    area: 'Mirpur', areaBn: 'মিরপুর', photo: 'https://images.unsplash.com/photo-1596496181813-176f254924c5?w=600&q=80',
    verified: false, yearsExp: 4,
    description: 'Reliable electrician for home repair.',
    descriptionBn: 'বাড়ি মেরামত ও ইনস্টলেশনে নির্ভরযোগ্য ইলেকট্রিশিয়ান।',
    services: [
      { name: 'Fan Install', nameBn: 'ফ্যান লাগানো', price: 150 },
    ],
    reviews: [
      { id: 'r17', customerName: 'Nazmul Islam', rating: 4, comment: 'Fast and affordable.', date: '2025-11-22' },
    ],
    phone: '019XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },

  // NURSING
  {
    id: 'p13', name: 'Nasrin Sultana', nameBn: 'নাসরিন সুলতানা', category: 'nursing', type: 'expert',
    rating: 4.9, reviewCount: 212, jobsCompleted: 678, price: 600, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    verified: true, yearsExp: 9,
    description: 'Registered Nurse (RN) from Dhaka Medical College.',
    descriptionBn: 'ঢাকা মেডিকেল কলেজের রেজিস্টার্ড নার্স।',
    services: [
      { name: 'Post-Surgery Care', nameBn: 'অপারেশন পরবর্তী সেবা', price: 700 },
    ],
    reviews: [
      { id: 'r18', customerName: 'Dr. Kamal Hossain', rating: 5, comment: 'Exceptional nurse.', date: '2025-12-14' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'p14', name: 'Parveen Akter', nameBn: 'পারভীন আক্তার', category: 'nursing', type: 'expert',
    rating: 4.8, reviewCount: 134, jobsCompleted: 412, price: 550, priceUnit: '/hr',
    area: 'Banani', areaBn: 'বনানী', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    verified: true, yearsExp: 7,
    description: 'Certified nurse specializing in pediatric care.',
    descriptionBn: 'সার্টিফাইড নার্স। শিশু ও মাতৃসেবায় বিশেষজ্ঞ।',
    services: [
      { name: 'Baby Care', nameBn: 'শিশু সেবা', price: 600 },
    ],
    reviews: [
      { id: 'r20', customerName: 'Shirin Akter', rating: 5, comment: 'Amazing with babies.', date: '2025-12-08' },
    ],
    phone: '018XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },

  // PHYSIOTHERAPY
  {
    id: 'p15', name: 'Dr. Mahbub Rahman', nameBn: 'ডা. মাহবুব রহমান', category: 'physiotherapy', type: 'expert',
    rating: 5.0, reviewCount: 89, jobsCompleted: 289, price: 1000, priceUnit: '/hr',
    area: 'Gulshan', areaBn: 'গুলশান', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    verified: true, yearsExp: 12,
    description: 'PhD in Physical Therapy from University of Dhaka.',
    descriptionBn: 'ঢাকা বিশ্ববিদ্যালয় থেকে ফিজিক্যাল থেরাপিতে পিএইচডি।',
    services: [
      { name: 'Sports Rehab', nameBn: 'স্পোর্টস রিহ্যাব', price: 1000 },
    ],
    reviews: [
      { id: 'r21', customerName: 'Fakhrul Alam', rating: 5, comment: 'Miracle worker!', date: '2025-12-16' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },

  // AMBULANCE
  {
    id: 'p17', name: 'City Medical Ambulance', nameBn: 'সিটি মেডিকেল অ্যাম্বুলেন্স', category: 'ambulance', type: 'expert',
    rating: 4.8, reviewCount: 345, jobsCompleted: 1234, price: 2000, priceUnit: '/call',
    area: 'Citywide', areaBn: 'সারা শহর', photo: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=600&q=80',
    verified: true, yearsExp: 10,
    description: 'Fully equipped ICU ambulance with paramedic team.',
    descriptionBn: 'প্যারামেডিক টিমসহ পূর্ণ সজ্জিত ICU অ্যাম্বুলেন্স।',
    services: [
      { name: 'ICU Ambulance', nameBn: 'আইসিইউ অ্যাম্বুলেন্স', price: 5000 },
    ],
    reviews: [
      { id: 'r24', customerName: 'Karim Uddin', rating: 5, comment: 'Saved my father\'s life.', date: '2025-12-10' },
    ],
    phone: '017XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  {
    id: 'p18', name: 'Dhaka Quick Ambulance', nameBn: 'ঢাকা কুইক অ্যাম্বুলেন্স', category: 'ambulance', type: 'local',
    rating: 4.5, reviewCount: 189, jobsCompleted: 456, price: 1500, priceUnit: '/call',
    area: 'Mirpur', areaBn: 'মিরপুর', photo: 'https://images.unsplash.com/photo-1516550135131-fe3dcb0bedc7?w=600&q=80',
    verified: false, yearsExp: 3,
    description: 'Basic ambulance service covering Mirpur.',
    descriptionBn: 'মিরপুর ও আশপাশে সাশ্রয়ী অ্যাম্বুলেন্স সেবা।',
    services: [
      { name: 'Basic Transfer', nameBn: 'মৌলিক ট্রান্সফার', price: 1500 },
    ],
    reviews: [
      { id: 'r26', customerName: 'Habib Khan', rating: 4, comment: 'Quick response.', date: '2025-12-02' },
    ],
    phone: '019XXXXXXXX', availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK001', providerId: 'p1', providerName: 'Fatema Begum',
    providerPhoto: 'https://images.unsplash.com/photo-1594751112816-54191319d44a?w=400&q=80',
    category: 'Maid', service: 'Regular Cleaning',
    date: '2026-04-22', time: '09:00 AM', duration: 3, status: 'upcoming', amount: 450, address: 'House 12, Road 4, Gulshan-1',
  },
  {
    id: 'BK002', providerId: 'p4', providerName: 'Mohammad Karim',
    providerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: 'Driver', service: 'Airport Transfer',
    date: '2026-04-25', time: '06:00 AM', duration: 2, status: 'upcoming', amount: 800, address: 'Hazrat Shahjalal International Airport',
  },
];

export const PROVIDER_STATS = {
  todayEarnings: 3200,
  todayJobs: 4,
  weeklyEarnings: 18400,
  weeklyJobs: 23,
  monthlyEarnings: 67500,
  totalRating: 4.8,
  totalJobs: 512,
  pendingRequests: 3,
};

export const PROVIDER_BOOKINGS = [
  { id: 'PB001', customerName: 'Karim Ahmed', service: 'Deep Cleaning', date: 'Today, 2:00 PM', duration: '3 hrs', amount: 750, status: 'upcoming', address: 'House 5, Gulshan-2' },
  { id: 'PB002', customerName: 'Sadia Islam', service: 'Regular Cleaning', date: 'Today, 4:00 PM', duration: '2 hrs', amount: 300, status: 'pending', address: 'Apt 3C, Banani' },
];

export const ADMIN_STATS = {
  totalUsers: 28450,
  totalProviders: 1234,
  totalBookings: 89231,
  monthlyRevenue: 4523000,
  activeBookings: 342,
  pendingVerifications: 28,
  disputes: 12,
  commissionEarned: 678450,
};

export const RECENT_USERS = [
  { id: 'U001', name: 'Ariful Islam', type: 'customer', joined: '2026-04-18', status: 'active', bookings: 12 },
  { id: 'U002', name: 'Delowara Begum', type: 'provider', joined: '2026-04-17', status: 'pending', bookings: 0 },
];

export const WEEKLY_CHART_DATA = [
  { day: 'Mon', bookings: 120, revenue: 48000 },
  { day: 'Tue', bookings: 145, revenue: 58000 },
  { day: 'Wed', bookings: 132, revenue: 52800 },
  { day: 'Thu', bookings: 178, revenue: 71200 },
  { day: 'Fri', bookings: 201, revenue: 80400 },
  { day: 'Sat', bookings: 243, revenue: 97200 },
  { day: 'Sun', bookings: 189, revenue: 75600 },
];

export const CATEGORY_CHART_DATA = [
  { name: 'Maid', value: 32, color: '#1E88E5' },
  { name: 'Driver', value: 24, color: '#FF9800' },
  { name: 'Chef', value: 12, color: '#9C27B0' },
  { name: 'Plumber', value: 10, color: '#4CAF50' },
  { name: 'Electrician', value: 9, color: '#F9A825' },
  { name: 'Nursing', value: 8, color: '#E91E63' },
  { name: 'Physio', value: 3, color: '#00BCD4' },
  { name: 'Ambulance', value: 2, color: '#F44336' },
];

export const STAR_DATA = [
  { name: '5 Star', value: 840, color: '#FF9800' },
  { name: '4 Star', value: 120, color: '#FB8C00' },
  { name: '3 Star', value: 45, color: '#F57C00' },
  { name: '2 Star', value: 12, color: '#EF6C00' },
  { name: '1 Star', value: 8, color: '#E65100' },
];

export const TECH_TASKS = [
  { id: 'T1', tech: 'Arif', task: 'AC Repair', status: 'In-Progress' },
  { id: 'T2', tech: 'Mina', task: 'Cleaning', status: 'Completed' },
  { id: 'T3', tech: 'Rakib', task: 'Plumbing', status: 'Offline' },
];

export const RECENT_PAYOUTS = [
  { id: 'PAY-001', date: '2026-04-20', amount: 14200, status: 'Completed' },
  { id: 'PAY-002', date: '2026-04-13', amount: 9800, status: 'Completed' },
  { id: 'PAY-003', date: '2026-04-06', amount: 11500, status: 'Completed' },
];
