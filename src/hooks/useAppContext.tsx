import { AppContext } from '@/AppContext';
import { useContext } from 'react';

export default function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
