'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, Heart, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          throw error;
        }

        // Check if email confirmation is required or already signed in
        if (data.session) {
          setSuccessMessage('Conta criada com sucesso! Entrando no santuário...');
          setTimeout(() => {
            router.push('/');
            router.refresh();
          }, 800);
        } else {
          setSuccessMessage(
            'Conta criada! Se o seu Supabase exigir confirmação, verifique sua caixa de entrada para ativar o acesso.'
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          if (error.message.toLowerCase().includes('invalid login credentials')) {
            throw new Error('E-mail ou senha incorretos. Verifique e tente novamente.');
          }
          throw error;
        }

        setSuccessMessage('Bem-vinda de volta ao Atelier! 🌸');
        setTimeout(() => {
          router.push('/');
          router.refresh();
        }, 500);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Ocorreu um erro ao autenticar. Tente novamente.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF2F4] flex flex-col justify-center items-center px-4 py-8 safe-top safe-bottom">
      <div className="w-full max-w-sm space-y-6">
        {/* Aesthetic Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-white border border-pink-200 shadow-sticker mb-1">
            <Sparkles className="w-7 h-7 text-pink-500 animate-pulse" />
          </div>
          <span className="block text-xs font-bold tracking-widest text-pink-600/80 uppercase">
            Santuário Pessoal &middot; Y2K
          </span>
          <h1 className="text-3xl font-extrabold text-[#4A1525] tracking-tight">
            Atelier
          </h1>
          <p className="text-xs text-stone-500 max-w-[260px] mx-auto">
            Seu dia planejado com a delicadeza de um moodboard e a segurança da nuvem.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-pink-200/80 shadow-card">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-pink-100/60 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition-all min-h-[44px] ${
                mode === 'signin'
                  ? 'bg-white text-[#4A1525] shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-semibold rounded-xl transition-all min-h-[44px] ${
                mode === 'signup'
                  ? 'bg-white text-[#4A1525] shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-pink-500" />
                E-mail
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-pink-500" />
                Senha
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pelo menos 6 caracteres"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                disabled={isLoading}
              />
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700">
                {errorMessage}
              </div>
            )}

            {/* Success Feedback */}
            {successMessage && (
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl text-xs text-pink-700 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#4A1525] hover:bg-[#38101C] text-white font-semibold shadow-md min-h-[44px] transition-all"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'signin' ? 'Acessando...' : 'Criando conta...'}
                </span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Entrar no Atelier' : 'Criar Meu Santuário'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Persistent session tip */}
          <div className="mt-5 pt-4 border-t border-pink-100 text-center">
            <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              Sessão persistente para acesso direto como PWA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
