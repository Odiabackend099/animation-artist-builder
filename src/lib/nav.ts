export const NAV = {
  home: '/',
  sections: {
    hero: '/#hero',
    howItWorks: '/#how-it-works',
    pricing: '/#pricing',
    testimonials: '/#testimonials',
  },
  routes: {
    auth: '/auth',
    signup: '/signup',
    dashboard: '/dashboard',
    terms: '/legal/terms',
    privacy: '/legal/privacy',
  },
  external: {
    contactSales: 'https://wa.me/2348105786326?text=Hello%20ODIA%20Sales%2C%20I%27d%20like%20to%20discuss%20the%20Enterprise%20plan.',
    github: 'https://github.com/odia-dev',
    twitter: 'https://twitter.com',
  },
} as const;

export type NavMap = typeof NAV;
