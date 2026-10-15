import {
  AlertTriangle,
  BarChart3,
  BriefcaseBusiness,
  Cloud,
  CloudCog,
  Lightbulb,
  Code2,
  Database,
  Network,
  RadioTower,
  Send,
  ShieldCheck,
  Snowflake,
} from 'lucide-react';

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Contact Us', href: '#contact' },
];

export const workflowSteps = [
  {
    title: 'Planning & Strategizing',
    description: 'Map goals, risks, and priorities before delivery begins.',
    icon: Lightbulb,
    image: '/assets/workflow-plan.jpg',
    imageWebp: '/assets/workflow-plan.webp',
    motion: 'pulse',
  },
  {
    title: 'Design & development',
    description: 'Build polished, secure systems around the agreed plan.',
    icon: Snowflake,
    image: '/assets/workflow-design.jpg',
    imageWebp: '/assets/workflow-design.webp',
    motion: 'spin',
  },
  {
    title: 'Test & deliver',
    description: 'Validate, refine, and hand over a launch-ready solution.',
    icon: Send,
    image: '/assets/workflow-deliver.jpg',
    imageWebp: '/assets/workflow-deliver.webp',
    motion: 'float',
  },
];

export const services = [
  {
    title: 'Managed Security Services',
    description:
      'Stay ahead of cyber threats with monitoring, incident response, and practical security operations support.',
    icon: ShieldCheck,
    tone: 'cyan',
    motion: 'pulse',
  },
  {
    title: 'Cloud Security',
    description:
      'Secure cloud infrastructure from initial setup to ongoing governance, posture reviews, and hardening.',
    icon: CloudCog,
    tone: 'blue',
    motion: 'spin',
  },
  {
    title: 'Cyber Threat Intelligence',
    description:
      'Track evolving risks and translate threat signals into timely, business-aware security decisions.',
    icon: RadioTower,
    tone: 'violet',
    motion: 'radar',
  },
  {
    title: 'Security Training & Awareness',
    description:
      'Equip teams to recognize suspicious activity, avoid common attack paths, and respond with confidence.',
    icon: AlertTriangle,
    tone: 'amber',
    motion: 'beacon',
  },
  {
    title: 'Cloud Computing',
    description:
      'Modernize data workflows with reliable cloud platforms, automation, and managed infrastructure.',
    icon: Cloud,
    tone: 'sky',
    motion: 'float',
  },
  {
    title: 'Business Intelligence & Data Visualization',
    description:
      'Turn operational data into readable dashboards, reports, and insights for faster decisions.',
    icon: BarChart3,
    tone: 'magenta',
    motion: 'wave',
  },
];

export const capabilities = [
  { label: 'Networking & Infrastructure', icon: Network },
  { label: 'Software Engineering', icon: Code2 },
  { label: 'Data Engineering & Governance', icon: Database },
  { label: 'DevOps & Cloud Solutions', icon: CloudCog },
];

export const products = [
  {
    id: 'nexaerp',
    name: 'NexaERP',
    tagline: 'Enterprise Resource Planning',
    image: '/img/erp.jpg',
    imageWebp: '/img/erp.webp',
    accent: 'violet',
    badge: 'Enterprise',
    description:
      'NexaERP is a comprehensive, modular ERP platform designed for growing businesses. It unifies Finance, HR, Inventory, Procurement, and Supply Chain into a single intelligent hub — giving leadership real-time visibility and control across every department.',
    tags: ['Finance & Accounting', 'HR & Payroll', 'Inventory Control', 'Supply Chain', 'Analytics Dashboard'],
  },
  {
    id: 'nexshield',
    name: 'NexShield AI',
    tagline: 'Smart Cybersecurity',
    image: '/img/img2.jpeg',
    imageWebp: '/img/img2.webp',
    accent: 'cyan',
    badge: 'Cybersecurity',
    description:
      'NexShield AI is an AI-powered cybersecurity application that provides real-time threat detection, behavioral analysis, and automated incident response. Built for enterprises and SMBs, it monitors your digital perimeter 24/7 to stop attacks before they cause damage.',
    tags: ['Threat Detection', 'AI Behavioral Analysis', 'Incident Response', 'Zero-Trust Security', 'Compliance Reporting'],
  },
  {
    id: 'nexacampus',
    name: 'NexaCampus AI',
    tagline: 'Smart Education Management',
    image: '/img/img3.jpeg',
    imageWebp: '/img/img3.webp',
    accent: 'blue',
    badge: 'EdTech',
    description:
      'NexaCampus AI is an intelligent campus management platform for schools, colleges, and universities. It streamlines admissions, attendance, examinations, fee management, and student analytics in one seamless system — empowering educators and administrators alike.',
    tags: ['Admissions & Enrollment', 'Attendance & LMS', 'Exam & Gradebook', 'Fee Management', 'Parent & Student Portal'],
  },
];

export const contactInfo = {
  email: 'info@solitaireinfotech.com',
  mobile: '+919817999458',
  mobileDisplay: '+91 98179 99458',
  address: 'R&R Tower, Plot no 298F, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 140307',
  mapUrl: 'https://www.google.com/maps/dir//Solitaire+InfoTech+LLC,+R%26R+Tower,+Plot+no+298F,+Phase+8B,+Industrial+Area,+Sector+74,+Sahibzada+Ajit+Singh+Nagar,+Punjab+140307/@29.8937851,77.9624429,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x390fef088fcc48b9:0xaeee8db9c57aaeb2!2m2!1d76.6899844!2d30.7113375?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D',
  embedMapUrl: 'https://maps.google.com/maps?q=30.7113375,76.6899844&hl=en&z=16&output=embed',
  coordinates: '30.7113° N, 76.6900° E',
};

export const officeLocations = [
  {
    id: 'india',
    country: 'INDIA',
    flag: '🇮🇳',
    role: 'Global Tech & Delivery HQ',
    address: 'R&R Tower, Plot no 298F, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 140307',
    street: 'R&R Tower, Plot no 298F, Phase 8B, Industrial Area, Sector 74',
    city: 'Sahibzada Ajit Singh Nagar, Punjab 140307',
    mapUrl: 'https://www.google.com/maps/dir//Solitaire+InfoTech+LLC,+R%26R+Tower,+Plot+no+298F,+Phase+8B,+Industrial+Area,+Sector+74,+Sahibzada+Ajit+Singh+Nagar,+Punjab+140307/@29.8937851,77.9624429,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x390fef088fcc48b9:0xaeee8db9c57aaeb2!2m2!1d76.6899844!2d30.7113375?entry=ttu&g_ep=EgoyMDI2MTAxMi4wIKXMDSoASAFQAw%3D%3D',
    tone: 'cyan',
    badge: 'HQ',
  },
  {
    id: 'usa',
    country: 'USA',
    flag: '🇺🇸',
    role: 'US Corporate Presence',
    address: '30 N Gould St, Unit R, Sheridan WY 82801, United States',
    street: '30 N Gould St, Unit R',
    city: 'Sheridan WY 82801, United States',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=30+N+Gould+St,+Unit+R,+Sheridan+WY+82801,+United+States',
    tone: 'blue',
    badge: 'Corporate',
  },
  {
    id: 'canada',
    country: 'CANADA',
    flag: '🇨🇦',
    role: 'Canadian Regional Office',
    address: '7145 West Credit Avenue Building 1, Suite 100, Mississauga ON, Canada L5N 6J7, CA',
    street: '7145 West Credit Avenue Building 1, Suite 100',
    city: 'Mississauga ON, Canada L5N 6J7, CA',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=7145+West+Credit+Avenue+Building+1,+Suite+100,+Mississauga+ON,+Canada+L5N+6J7',
    tone: 'violet',
    badge: 'Regional',
  },
];
