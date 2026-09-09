export type ViewTab = 'home' | 'services' | 'portfolio' | 'wizard' | 'blog' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'marketing';
  shortDesc: string;
  description: string;
  icon: string;
  startingPrice: string;
  priceValue: number;
  badge?: string;
  features: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'mobile' | 'ecommerce' | 'wordpress' | 'service';
  tagline: string;
  description: string;
  platform: 'Android Mobile App' | 'WordPress / WooCommerce' | 'Shopify' | 'Custom Web & Mobile';
  year: string;
  accentColor: string;
  mockupTheme: 'dark' | 'light';
  stats: {
    label: string;
    value: string;
  }[];
  features: string[];
  mockupData: {
    appName: string;
    tagline: string;
    accentColor: string;
    screens: {
      title: string;
      subtitle?: string;
      items: {
        name: string;
        price?: string;
        rating?: string;
        desc?: string;
      }[];
    }[];
  };
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    growth: boolean;
  }[];
  testimonialQuote: string;
  representative: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  projectType: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'android' | 'web' | 'pricing' | 'process';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Mobile Apps' | 'WordPress & CMS' | 'eCommerce' | 'SEO & Growth' | 'Tech Guides';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  tags: string[];
  coverImage?: string;
}

export interface WizardFormState {
  projectType: 'new' | 'revamp';
  platform: 'mobile_app' | 'website' | 'combo' | 'custom';
  pageCount: '1_5' | '5_10' | 'more_10';
  features: string[];
  budgetTier: string;
  timeline: 'standard' | 'rush';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

export interface QuoteFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'core' | 'ecommerce' | 'mobile' | 'marketing' | 'support';
}

export interface QuoteState {
  projectType: 'new_site' | 'revamp_site' | 'ecommerce_store' | 'android_app' | 'combo_web_app';
  platform: 'wordpress' | 'shopify' | 'custom_react' | 'android_native';
  selectedFeatures: string[];
  estimatedPages: number;
  estimatedProducts: number;
  timeline: 'urgent' | 'standard' | 'flexible';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessName: string;
  notes: string;
}
