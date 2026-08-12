import { Project, Service, Skill, WhyUsItem, ProcessStep } from './types';

import rohanAvatar from './assets/images/rohan_avatar_1786355889284.jpg';
import scrapImg from './assets/images/scrap_business_mockup_1786355815404.jpg';
import carRentalImg from './assets/images/car_rental_mockup_1786355833640.jpg';
import realEstateImg from './assets/images/real_estate_mockup_1786355851656.jpg';
import coachingImg from './assets/images/coaching_institute_mockup_1786355868741.jpg';

export const AVATAR_URL = rohanAvatar;

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Scrap Business Website',
    description: 'Professional scrap business website with modern design, responsive layout, real-time query forms, and service catalogs tailored for local and industrial scrap trading.',
    image: scrapImg,
    url: 'https://benkarrohan80-byte.github.io/rohan-traders5-website/',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Form Handling']
  },
  {
    id: 2,
    title: 'Car Rental Demo Website',
    description: 'Modern car rental website with elegant vehicle showcases, interactive search and booking filters, and a high-conversion responsive design for auto businesses.',
    image: carRentalImg,
    url: 'https://benkarrohan80-byte.github.io/carrental-demo-website/',
    tags: ['Modern UI', 'Responsive Web Design', 'Interactive Grid', 'Luxury Theme']
  },
  {
    id: 3,
    title: 'Real Estate Demo Website',
    description: 'Premium real estate platform featuring modern villa property listings, sleek layouts, interactive contact cards, and high-impact visual design to attract buyers.',
    image: realEstateImg,
    url: 'https://benkarrohan80-byte.github.io/realstate-demo-website/',
    tags: ['Tailwind CSS', 'Vanilla JavaScript', 'Dynamic Filters', 'Modern Architecture']
  },
  {
    id: 4,
    title: 'Coaching Institute Demo Website',
    description: 'Professional academic and coaching institute landing page focused on student admissions, interactive course visualizers, and responsive contact sections.',
    image: coachingImg,
    url: 'https://benkarrohan80-byte.github.io/apexacademy-demo/',
    tags: ['Responsive Web Design', 'Clean Layout', 'Admissions Form UI', 'Education']
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Business Websites',
    description: 'Full-featured corporate and SMB websites that look professional, build credibility, and convert visitors into clients.',
    icon: 'Briefcase',
    timeline: '1-2 Weeks'
  },
  {
    id: 2,
    title: 'Landing Pages',
    description: 'High-converting single page sites for product launches, ad campaigns, and targeted audience capture.',
    icon: 'Compass',
    timeline: '3-5 Days'
  },
  {
    id: 3,
    title: 'Portfolio Websites',
    description: 'Stunning custom digital resumes and portfolios for creatives, freelancers, agencies, and professionals.',
    icon: 'UserCheck',
    timeline: '4-7 Days'
  },
  {
    id: 4,
    title: 'Website Redesign',
    description: 'Give your slow, outdated website a modern look with modern speed optimization and responsive features.',
    icon: 'RefreshCw',
    timeline: '1 Week'
  },
  {
    id: 5,
    title: 'Website Customization',
    description: 'Add new custom contact forms, interactive maps, product displays, or custom features to your current site.',
    icon: 'Sliders',
    timeline: '2-4 Days'
  }
];

export const SKILLS: Skill[] = [
  { name: 'HTML5', level: 98, icon: 'FileCode', category: 'core' },
  { name: 'CSS3', level: 95, icon: 'Layout', category: 'core' },
  { name: 'JavaScript (ES6+)', level: 92, icon: 'Zap', category: 'core' },
  { name: 'Responsive Web Design', level: 99, icon: 'Smartphone', category: 'core' },
  { name: 'GitHub Pages', level: 90, icon: 'Github', category: 'core' },
  { name: 'AI Assisted Web Development', level: 95, icon: 'Cpu', category: 'core' }
];

export const WHY_WORK_WITH_ME: WhyUsItem[] = [
  {
    id: 1,
    title: 'Mobile Friendly Designs',
    description: 'Every website is meticulously coded to adjust flawlessly across mobile, tablet, and desktop screens.',
    icon: 'Smartphone'
  },
  {
    id: 2,
    title: 'Fast Loading Websites',
    description: 'Clean, optimized code and super-fast asset loading means your visitors don\'t wait or bounce.',
    icon: 'Gauge'
  },
  {
    id: 3,
    title: 'Modern UI/UX',
    description: 'Clean layouts, sleek gradients, balanced typography, and sophisticated glassmorphism elements.',
    icon: 'Sparkles'
  },
  {
    id: 4,
    title: 'Responsive Design',
    description: 'Perfect visual alignment and layout adjustments on screens of all sizes, from smartwatches to TVs.',
    icon: 'Monitor'
  },
  {
    id: 5,
    title: 'Affordable Pricing',
    description: 'Premium freelance results and absolute transparency, offering agency quality at a fraction of the price.',
    icon: 'DollarSign'
  },
  {
    id: 6,
    title: 'Fast Delivery',
    description: 'Clear milestone tracking and rapid Turnaround times to get your business website live on time.',
    icon: 'Clock'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: 'Discuss Requirements',
    description: 'We connect to dive deep into your project goals, target audience, business requirements, and site features.',
    duration: 'Day 1'
  },
  {
    step: 2,
    title: 'Design Website',
    description: 'I create modern responsive layouts and visual designs tailored specifically to match your brand identity.',
    duration: 'Days 2-4'
  },
  {
    step: 3,
    title: 'Client Review',
    description: 'You review the interactive demo site, provide detailed feedback, and we refine details to perfection.',
    duration: 'Days 5-6'
  },
  {
    step: 4,
    title: 'Final Delivery',
    description: 'We go live on GitHub Pages or your custom domain, optimize speed, perform SEO configuration, and handover.',
    duration: 'Day 7'
  }
];
