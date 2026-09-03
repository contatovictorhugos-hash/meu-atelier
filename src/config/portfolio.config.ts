export interface AtelierConfig {
  app: {
    name: string;
    tagline: string;
    concept: string;
    version: string;
  };
  theme: {
    primaryColor: string;
    accentBlush: string;
    creamBase: string;
    metallicSilver: string;
    bordeauxText: string;
  };
  defaultHabits: {
    morning: { id: string; label: string; icon: string }[];
    evening: { id: string; label: string; icon: string }[];
  };
  freeTierPolicy: {
    hosting: string;
    database: string;
    storage: string;
    cost: string;
  };
}

export const atelierConfig: AtelierConfig = {
  app: {
    name: 'Atelier',
    tagline: 'O seu dia planejado com a beleza de um moodboard e a praticidade de um clique.',
    concept: 'Digital Scrapbook / Y2K Coquette Clean',
    version: '1.0.0',
  },
  theme: {
    primaryColor: '#4A1525',
    accentBlush: '#FDF2F4',
    creamBase: '#FCFBF7',
    metallicSilver: '#E2E8F0',
    bordeauxText: '#4A1525',
  },
  defaultHabits: {
    morning: [
      { id: 'cleanser', label: 'Limpeza Facial', icon: '✨' },
      { id: 'vitc', label: 'Vitamina C', icon: '🍊' },
      { id: 'moisturizer', label: 'Hidratante', icon: '🌸' },
      { id: 'sunscreen', label: 'Protetor Solar', icon: '☀️' },
    ],
    evening: [
      { id: 'double_cleanse', label: 'Demaquilar', icon: '🫧' },
      { id: 'night_serum', label: 'Sérum Noturno', icon: '🌙' },
      { id: 'lip_balm', label: 'Lip Balm', icon: '💋' },
      { id: 'reading', label: 'Leitura Leve', icon: '📖' },
    ],
  },
  freeTierPolicy: {
    hosting: 'Vercel Hobby Tier (R$ 0,00)',
    database: 'Supabase PostgreSQL Free Tier (R$ 0,00)',
    storage: 'Cloudflare R2 10GB Free Tier (Zero Egress Fees)',
    cost: 'R$ 0,00 contínuo',
  },
};
