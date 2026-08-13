export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  timeline: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
  category: 'core' | 'additional';
}

export interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'archived' | 'rejected' | 'cancelled';
  createdAt: string;
}

