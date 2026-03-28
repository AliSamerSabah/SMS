import type { ReactNode } from 'react';
import {  Toaster } from 'sonner';
import Header from '@/components/layout/header.tsx';
import Footer from './components/layout/footer';
import Setup from '@/pages/Setup';
import useAppContext from './hooks/useAppContext';

export default function App({ children }: { children: ReactNode }) {
  const { users, user } = useAppContext();
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Toaster position="bottom-right" className="bg-emerald-500" theme={user.theme === 'dark' ? 'light' : 'dark'} />
      <main className="py-15">
        {(user.madeUsers === true && users) ? children : <Setup />}
      </main>
      <Footer />
    </div>
  );
}