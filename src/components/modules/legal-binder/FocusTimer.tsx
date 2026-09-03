'use client';

import React, { useState, useEffect } from 'react';
import { DigicamLCD } from '@/components/layout/DigicamLCD';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export const FocusTimer: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [studySubject, setStudySubject] = useState('Leitura de Doutrina');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleReset = (mins = 25) => {
    setIsActive(false);
    setSecondsLeft(mins * 60);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#4A1525] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500" /> Focus Lounge (Pomodoro Retrô)
        </h3>
        <span className="text-[10px] font-mono text-stone-500">DIGICAM LCD</span>
      </div>

      <DigicamLCD mode="FOCUS-REC">
        <div className="text-center py-4 space-y-2">
          <div className="text-[11px] text-sky-300 font-mono tracking-wide">
            {studySubject}
          </div>
          <div className="text-4xl font-mono font-bold tracking-widest text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
            {formattedTime}
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Button
              onClick={() => setIsActive(!isActive)}
              size="sm"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-xs px-4"
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5 mr-1" /> PAUSE
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1" /> START
                </>
              )}
            </Button>
            <button
              onClick={() => handleReset(25)}
              className="p-2 text-sky-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Reiniciar timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </DigicamLCD>

      {/* Preset intervals */}
      <div className="flex gap-2 justify-center pt-1">
        <button
          onClick={() => {
            setStudySubject('Leitura Focada (25m)');
            handleReset(25);
          }}
          className="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-[11px] font-medium text-stone-700 min-h-[44px]"
        >
          25 min (Foco)
        </button>
        <button
          onClick={() => {
            setStudySubject('Pausa / Chá 🌸 (5m)');
            handleReset(5);
          }}
          className="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-[11px] font-medium text-stone-700 min-h-[44px]"
        >
          5 min (Pausa)
        </button>
        <button
          onClick={() => {
            setStudySubject('Simulado / Peça (50m)');
            handleReset(50);
          }}
          className="px-3 py-1.5 rounded-full bg-white border border-pink-200 text-[11px] font-medium text-stone-700 min-h-[44px]"
        >
          50 min (Intenso)
        </button>
      </div>
    </div>
  );
};
