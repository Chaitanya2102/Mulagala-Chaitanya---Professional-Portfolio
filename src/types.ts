export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'mainframe' | 'web' | 'ai-data';
  categoryLabel: string;
  image: string;
  featured: boolean;
  clientOrContext: string;
  duration?: string;
  summary: string;
  description: string[];
  keyHighlights: string[];
  techStack: string[];
  architecture?: {
    overview: string;
    flowSteps: string[];
  };
  metrics?: { label: string; value: string }[];
  demoType: 'mainframe-console' | 'dehaze-slider' | 'booking-simulator' | 'sales-calculator';
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLocation: string;
  client?: string;
  project?: string;
  period: string;
  environment: string[];
  achievements: string[];
  leadershipHighlights?: string[];
  badge?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
  category: 'enterprise' | 'cisco' | 'academic';
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100
    category: string;
    description?: string;
    yearsOrDepth?: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  inquiryType: string;
  message: string;
}
