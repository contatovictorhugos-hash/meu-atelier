import React from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />,
}) => {
  return (
    <div className="p-8 text-center rounded-3xl bg-pink-50/50 border border-pink-100/80 my-4 flex flex-col items-center">
      <div className="p-3 bg-white rounded-full shadow-sticker mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-[#4A1525]">{title}</h3>
      <p className="text-xs text-stone-500 mt-1 max-w-xs">{description}</p>
    </div>
  );
};
