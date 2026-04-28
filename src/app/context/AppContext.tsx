import { createContext, ReactNode, useContext, useState } from 'react';
import { Language, Provider, PROVIDERS } from '../data/mockData';

export type AppRole = 'guest' | 'customer' | 'provider' | 'resource' | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  providerFilter: 'all' | 'local' | 'expert';
  setProviderFilter: (f: 'all' | 'local' | 'expert') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (p: Provider | null) => void;
  selectedArea: string;
  setSelectedArea: (a: string) => void;
  bookingData: BookingFormData;
  setBookingData: (d: BookingFormData) => void;
  role: AppRole;
  setRole: (role: AppRole) => void;
  signInAs: (role: Exclude<AppRole, 'guest'>) => void;
  signOut: () => void;
}

export interface BookingFormData {
  providerId?: string;
  service?: string;
  date?: string;
  time?: string;
  duration?: number;
  address?: string;
  instructions?: string;
  paymentMethod?: 'bkash' | 'nagad' | 'card' | 'cash';
  amount?: number;
  bookingId?: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [providerFilter, setProviderFilter] = useState<'all' | 'local' | 'expert'>('all');
  const [selectedCategory, setSelectedCategory] = useState('maid');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(PROVIDERS[0]);
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [bookingData, setBookingData] = useState<BookingFormData>({});
  const [role, setRole] = useState<AppRole>('guest');

  const signInAs = (nextRole: Exclude<AppRole, 'guest'>) => setRole(nextRole);
  const signOut = () => setRole('guest');

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      providerFilter, setProviderFilter,
      selectedCategory, setSelectedCategory,
      selectedProvider, setSelectedProvider,
      selectedArea, setSelectedArea,
      bookingData, setBookingData,
      role, setRole,
      signInAs,
      signOut,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
