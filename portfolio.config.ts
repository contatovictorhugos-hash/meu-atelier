/**
 * Modelo de Configuração do Portfólio Pessoal (Config-Driven Portfolio)
 * 
 * Utilize este arquivo para personalizar completamente o portfólio sem precisar
 * alterar os componentes de interface do aplicativo móvel ou web.
 */

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'whatsapp' | 'email' | 'website';
  url: string;
  label: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
  icon?: string;
}

export interface SkillCategory {
  category: 'Mobile' | 'Frontend' | 'Backend & Cloud' | 'UI/UX & Ferramentas' | 'Outros';
  items: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  fullDescription?: string;
  tags: string[];
  thumbnailUrl: string;
  screenshots?: string[];
  metrics?: string[];
  links: {
    github?: string;
    liveDemo?: string;
    appStore?: string;
    playStore?: string;
  };
  featured: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface PortfolioConfig {
  profile: {
    name: string;
    role: string;
    headline: string;
    bio: string;
    avatarUrl: string;
    location: string;
    status: {
      availableForHire: boolean;
      badgeText?: string;
    };
    resumeUrl?: string;
  };
  socialLinks: SocialLink[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  theme: {
    defaultMode: 'system' | 'dark' | 'light';
    accentColor: string;
    secondaryAccent?: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  profile: {
    name: 'Seu Nome',
    role: 'Engenheiro de Software Frontend & Mobile',
    headline: 'Criando experiências digitais fluidas para mobile e web com foco em performance e ergonomia.',
    bio: 'Desenvolvedor com experiência em criação de aplicativos móveis de alto desempenho com React Native/Expo e aplicações web modernas com Next.js. Apaixonado por micro-interações táteis, arquiteturas limpas e design systems escaláveis.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    location: 'São Paulo, Brasil (Remoto / Híbrido)',
    status: {
      availableForHire: true,
      badgeText: 'Disponível para novos projetos',
    },
    resumeUrl: 'https://seusite.com/cv.pdf',
  },
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/seu-usuario',
      label: 'GitHub',
      icon: 'github',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/seu-usuario',
      label: 'LinkedIn',
      icon: 'linkedin',
    },
    {
      platform: 'whatsapp',
      url: 'https://wa.me/5511999999999',
      label: 'WhatsApp',
      icon: 'message-circle',
    },
    {
      platform: 'email',
      url: 'mailto:contato@seusite.com',
      label: 'E-mail',
      icon: 'mail',
    },
  ],
  skills: [
    {
      category: 'Mobile',
      items: [
        { name: 'React Native', level: 'Especialista' },
        { name: 'Expo SDK', level: 'Especialista' },
        { name: 'Reanimated', level: 'Avançado' },
        { name: 'NativeWind / Tailwind', level: 'Avançado' },
        { name: 'Offline-first & SQLite', level: 'Intermediário' },
      ],
    },
    {
      category: 'Frontend',
      items: [
        { name: 'Next.js (App Router)', level: 'Especialista' },
        { name: 'TypeScript', level: 'Especialista' },
        { name: 'Tailwind CSS', level: 'Especialista' },
        { name: 'Framer Motion', level: 'Avançado' },
        { name: 'State Management (Zustand)', level: 'Avançado' },
      ],
    },
    {
      category: 'Backend & Cloud',
      items: [
        { name: 'Supabase (Auth, RLS, Storage)', level: 'Avançado' },
        { name: 'PostgreSQL', level: 'Intermediário' },
        { name: 'Vercel Deployment & Edge', level: 'Avançado' },
        { name: 'REST & GraphQL APIs', level: 'Avançado' },
      ],
    },
    {
      category: 'UI/UX & Ferramentas',
      items: [
        { name: 'Figma to Code', level: 'Avançado' },
        { name: 'Mobile Ergonomics & a11y', level: 'Avançado' },
        { name: 'Git & GitHub Actions CI/CD', level: 'Avançado' },
      ],
    },
  ],
  projects: [
    {
      id: 'fintech-mobile-app',
      title: 'Fintech Wallet Mobile',
      summary: 'Aplicativo de carteira digital e controle financeiro com autenticação biométrica e gráficos interativos.',
      fullDescription: 'Desenvolvido com Expo e Supabase, oferecendo modo offline instantâneo, sincronização em background e design system com suporte nativo a temas claro e escuro.',
      tags: ['React Native', 'Expo', 'Supabase', 'Reanimated', 'NativeWind'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
      metrics: ['+15k usuários ativos', '99.9% taxa de estabilidade (crash-free)'],
      links: {
        github: 'https://github.com/seu-usuario/fintech-wallet',
        liveDemo: 'https://fintech-wallet.demo.app',
      },
      featured: true,
    },
    {
      id: 'atelier-design-system',
      title: 'Atelier UI Kit',
      summary: 'Design System multiplataforma otimizado para pequenos aplicativos e protótipos de alta fidelidade.',
      fullDescription: 'Biblioteca de componentes e tokens de estilo compartilhados entre React Native e Next.js com suporte a temas dinâmicos e micro-interações hápticas.',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Storybook', 'Vercel'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
      metrics: ['Componentes 100% tipados', 'Suporte a Safe Area em iOS e Android'],
      links: {
        github: 'https://github.com/seu-usuario/atelier-ui',
        liveDemo: 'https://atelier-ui.vercel.app',
      },
      featured: true,
    },
  ],
  experience: [
    {
      role: 'Senior Mobile & Frontend Engineer',
      company: 'Tech Studio',
      period: '2023 - Presente',
      description: 'Liderança técnica no desenvolvimento de aplicações móveis com Expo e portfólios institucionais em Next.js com deploy contínuo na Vercel.',
      technologies: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Labs',
      period: '2021 - 2023',
      description: 'Construção de SPAs e PWAs responsivas, integração de APIs REST e modernização de design systems móveis.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    },
  ],
  theme: {
    defaultMode: 'system',
    accentColor: '#6366F1', // Indigo elegante
    secondaryAccent: '#EC4899', // Pink vibrante
  },
};
