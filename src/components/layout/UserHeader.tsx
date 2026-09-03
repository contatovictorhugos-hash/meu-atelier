'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, User, Sparkles } from 'lucide-react';

export const UserHeader: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) {
        setEmail(data.user.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setEmail(null);
    setIsOpen(false);
    router.push('/login');
    router.refresh();
  };

  if (!email) {
    return null;
  }

  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative flex justify-end pb-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-pink-200 shadow-sm text-xs font-medium text-stone-700 transition-all min-h-[36px]"
        aria-label="Perfil do Usuário"
      >
        <span className="w-5 h-5 rounded-full bg-[#4A1525] text-white flex items-center justify-center text-[10px] font-bold">
          {initial}
        </span>
        <span className="max-w-[120px] truncate text-[11px]">{email}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-10 z-50 w-56 rounded-2xl bg-white border border-pink-200 shadow-xl p-3 space-y-2 animate-in fade-in zoom-in-95">
            <div className="px-2 py-1 border-b border-pink-100">
              <div className="text-[10px] uppercase font-bold text-pink-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Santuário Atelier
              </div>
              <div className="text-xs font-semibold text-stone-800 truncate">
                {email}
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
