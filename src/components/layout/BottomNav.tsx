'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Shirt, UtensilsCrossed, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Glow', href: '/', icon: Sparkles },
  { label: 'Closet', href: '/closet', icon: Shirt },
  { label: 'Bento', href: '/bento', icon: UtensilsCrossed },
  { label: 'Direito', href: '/legal', icon: BookOpen },
];

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-pink-200/70 px-4 py-2 safe-bottom shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-3 py-1 rounded-2xl transition-all',
                isActive
                  ? 'text-[#4A1525] bg-pink-100/70 font-semibold scale-105'
                  : 'text-stone-400 hover:text-stone-600'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-0.5', isActive && 'text-pink-600')} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
