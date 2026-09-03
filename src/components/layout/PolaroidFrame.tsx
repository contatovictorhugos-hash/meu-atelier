import React from 'react';
import { cn } from '@/lib/utils/utils';

interface PolaroidFrameProps {
  imageUrl?: string;
  caption?: string;
  date?: string;
  rotate?: string;
  className?: string;
  onClick?: () => void;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  imageUrl,
  caption,
  date,
  rotate = 'rotate-[-1.5deg]',
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'polaroid-card transition-transform duration-300 hover:scale-102 hover:rotate-0 cursor-pointer',
        rotate,
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-stone-100 border border-stone-200/60 shadow-inner">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={caption || 'Foto polaroid'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4">
            <span className="text-2xl mb-1">📷</span>
            <span className="text-xs">Sem foto hoje</span>
          </div>
        )}
      </div>
      {(caption || date) && (
        <div className="pt-3 px-1 flex items-baseline justify-between">
          {caption && (
            <p className="font-cursive text-sm text-[#4A1525] font-medium truncate max-w-[70%]">
              {caption}
            </p>
          )}
          {date && (
            <span className="text-[10px] font-mono text-stone-400 ml-auto">
              {date}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
