import {
  ServiceItem,
  PortfolioItem,
  CaseStudy,
  Testimonial,
  FAQItem,
  BlogPost,
  QuoteFeature
} from '../types';

export const GEEKFORGE_CONTACT = {
  phone: '+27 50 058 6175',
  phoneDisplay: '+27 50 058 6175',
  whatsappUrl: 'https://wa.me/27500586175',
  email: 'admin@geekforge.co.za',
  website: 'www.geekforge.co.za',
  websiteDisplay: 'geekforge.co.za',
  location: 'Johannesburg & Remote Across South Africa',
  hours: 'Mon - Fri: 08:30 - 18:00 (SAST) • Sat: 09:00 - 14:00',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'android-special',
    title: 'Android Mobile App Special',
    category: 'mobile',
    shortDesc: 'Turn your business into a 24/7 online store with your own branded Android app published on Google Play.',
    description: 'Transform your retail store, boutique, restaurant, or service business into an automated sales machine. Ready for customers to download from the Google Play Store.',
    icon: 'Smartphone',
    startingPrice: 'R4,500',
    priceValue: 4500,
    badge: '🔥 Flagship Offer',
    popular: true,
    features: [
      'Full eCommerce Store Functionality & Fast Checkout',
      'Secure SA Payments (PayFast, Ozow, Payflex, Cards)',
      'Push Notifications for Flash Sales & Order Updates',
      'Google Play Store Publishing & Setup Included',
      'Product, Category & Stock Management Admin Panel',
      'WhatsApp, Social Media & Google Maps Integration',
      '100% Full Source Code & App Ownership',
    ],
  },
  {
    id: 'wordpress-custom',
    title: 'Custom WordPress & CMS Websites',
    category: 'web',
    shortDesc: 'Bespoke corporate, service, and content-managed websites built for fast loading and easy updating.',
    description: 'We design and build clean, scalable WordPress websites tailored to CMS and corporate SaaS businesses. Fully responsive, clean code, and zero bloated page builders.',
    icon: 'Layout',
    startingPrice: 'R3,800',
    priceValue: 3800,
    features: [
      'Custom Gutenberg / Elementor Pro Theme Architecture',
      'Blazing Fast Load Times (<1.2s GTmetrix Grade A)',
      'Intuitive Admin Dashboard to Edit Text, Images & Staff',
      'Service Bookings, Lead Capture Forms & WhatsApp Chat',
      'Mobile-First Responsive Layout for Phones & Tablets',
      'Google Search Console & Analytics Integration',
    ],
  },
  {
    id: 'ecommerce-stores',
    title: 'eCommerce Store Development',
    category: 'ecommerce',
    shortDesc: 'High-converting online shops built on WooCommerce, Shopify, or Custom React.',
    description: 'Sell physical or digital goods seamlessly. We integrate South African payment gateways, automated courier delivery rates (The Courier Guy, Fastway), and abandoned cart recovery.',
    icon: 'ShoppingBag',
    startingPrice: 'R5,500',
    priceValue: 5500,
    popular: true,
    features: [
      'PayFast, Ozow, Payflex, Yoco & Peach Payments Integration',
      'Live Courier Shipping Rate Calculation & Tracking',
      'Automated Invoicing & Email Notifications',
      'Inventory Sync & Bulk Product Import/Export',
      'Coupon Codes, Tiered Discounts & Gift Vouchers',
      'Optimized 1-Page Checkout Flow for Maximum Sales',
    ],
  },
  {
    id: 'dropshipping',
    title: 'Dropshipping Website Development',
    category: 'ecommerce',
    shortDesc: 'Automated dropshipping stores connected to global & local suppliers with zero inventory risk.',
    description: 'Launch a hands-off eCommerce empire. We configure automated product syncing with AliExpress, CJ Dropshipping, or local SA suppliers with automated margin calculation.',
    icon: 'Truck',
    startingPrice: 'R4,800',
    priceValue: 4800,
    features: [
      'Automated 1-Click Product Importer & Syncing',
      'Auto Currency Conversion (USD to ZAR Pricing)',
      'Automated Order Routing to Suppliers',
      'Niche Selection & Trending Product Setup',
      'Branded Packaging & Delivery Time Notices',
      'Multi-Vendor Marketplace Capabilities Available',
    ],
  },
  {
    id: 'website-design-setup',
    title: 'Website Design & Setup',
    category: 'web',
    shortDesc: 'From domain registration to DNS setup, SSL certificates, and official launch.',
    description: 'We handle the technical heavy lifting: domain purchasing, high-speed cloud hosting, business emails (info@yourcompany.co.za), security firewalls, and SSL.',
    icon: 'Globe',
    startingPrice: 'R2,900',
    priceValue: 2900,
    features: [
      'Free .co.za Domain Registration (1st Year)',
      'High-Speed SSD Hosting & Business Email Accounts',
      'SSL Security Certificate & Daily Automated Backups',
      'Professional Company Profile & Brochure Layouts',
      'Spam-Protected Contact Forms & Lead Notifications',
      'Social Media Linking & Live WhatsApp Widget',
    ],
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization & Growth',
    category: 'marketing',
    shortDesc: 'Dominate Google search results in your city and attract high-intent local customers.',
    description: 'Data-driven search engine optimization tailored for South African businesses. We optimize your page speed, keywords, Google Business Profile, and local citations.',
    icon: 'TrendingUp',
    startingPrice: 'R2,500',
    priceValue: 2500,
    features: [
      'Google Business Profile Optimization & Verification',
      'High-Intent Keyword Research (City & Suburb Specific)',
      'On-Page Schema Markup, Meta Titles & Descriptions',
      'Core Web Vitals & Speed Optimization',
      'Local Citations & Directory Submissions across SA',
      'Monthly Ranking & Organic Traffic Performance Report',
    ],
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'dropshop',
    title: 'DropShop App',
    client: 'DropShop South Africa',
    category: 'mobile',
    tagline: 'Smart products. Shipped directly to customers nationwide.',
    description: 'A crisp, modern Android eCommerce app designed for a high-volume consumer electronics dropshipping store. Features real-time trending deals, currency-accurate catalog, and instant one-tap checkout.',
    platform: 'Android Mobile App',
    year: '2025',
    accentColor: '#16a34a',
    mockupTheme: 'light',
    stats: [
      { label: 'Active App Users', value: '18.4K+' },
      { label: 'Checkout Conversion', value: '4.8%' },
      { label: 'Google Play Rating', value: '4.9 ★' },
    ],
    features: ['Instant Checkout', 'Push Notifications', 'Live Courier Tracking', 'PayFast & Ozow'],
    mockupData: {
      appName: 'DropShop',
      tagline: 'Smart products. Shipped to you.',
      accentColor: '#16a34a',
      screens: [
        {
          title: 'Discover Trending Products',
          subtitle: 'High quality. Best prices. Shipped to your door.',
          items: [
            { name: 'Wireless Noise Cancelling Headphones', price: '$49.99', rating: '4.7 (256)', desc: '40H Battery Life, Bluetooth 5.3' },
            { name: 'Portable Bluetooth Speaker', price: '$24.99', rating: '4.6 (128)', desc: 'Water Resistant, 360° Sound' },
            { name: 'Smart Watch Series 9', price: '$34.99', rating: '4.7 (96)' },
            { name: 'USB Air Humidifier', price: '$19.99', rating: '4.5 (74)' },
          ],
        },
      ],
    },
  },
  {
    id: 'fashion-express',
    title: 'Fashion Express (FE)',
    client: 'Fashion Express Sneaker Hub',
    category: 'mobile',
    tagline: 'Sneakers. Style. Delivered. Next-gen streetwear mobile store.',
    description: 'High-energy dark cyberpunk mobile shopping experience for top sneaker enthusiasts in Johannesburg & Cape Town. Integrated with PayFast, Ozow instant EFT, and WhatsApp customer support.',
    platform: 'Android Mobile App',
    year: '2025',
    accentColor: '#ec4899',
    mockupTheme: 'dark',
    stats: [
      { label: 'Monthly GMV', value: 'R820K+' },
      { label: 'Repeat Orders', value: '38%' },
      { label: 'Push Open Rate', value: '29.4%' },
    ],
    features: ['Dark Neon UI', 'Ozow & PayFast', 'Shoe Size Matrix', 'Limited Drop Alerts'],
    mockupData: {
      appName: 'Fashion Express',
      tagline: 'Fresh Kicks. No Limits.',
      accentColor: '#ec4899',
      screens: [
        {
          title: 'Trending Sneakers • Express Delivery',
          subtitle: 'Get the latest kicks from top brands delivered fast.',
          items: [
            { name: 'Nike Air Max 270 (Hyper Violet)', price: 'R 2,499', rating: '4.8 (124)', desc: 'Max Air Unit, Breathable Mesh' },
            { name: 'Adidas Ultraboost 1.0', price: 'R 2,799', rating: '4.9 (88)' },
            { name: 'Puma RS-X³ Radiant', price: 'R 1,899', rating: '4.7 (62)' },
          ],
        },
      ],
    },
  },
  {
    id: 'mobiledirect',
    title: 'MobileDirect',
    client: 'MobileDirect Tech & Repairs',
    category: 'mobile',
    tagline: 'Everything Mobile. Delivered Direct. Repairs & Accessories.',
    description: 'Dual-purpose mobile app combining an on-demand device repair booking engine (screen, battery, water damage) with an expansive mobile accessories store.',
    platform: 'Android Mobile App',
    year: '2025',
    accentColor: '#22c55e',
    mockupTheme: 'dark',
    stats: [
      { label: 'Repair Bookings', value: '1,450+' },
      { label: 'Average Repair TAT', value: '3.5 hrs' },
      { label: 'Customer Retention', value: '92%' },
    ],
    features: ['Repair Booking Engine', 'Device Selector', 'MagSafe Catalog', '6-Month Warranty Badge'],
    mockupData: {
      appName: 'MobileDirect',
      tagline: 'Upgrade. Protect. Connect.',
      accentColor: '#22c55e',
      screens: [
        {
          title: 'Mobile Repair Services & Top Accessories',
          subtitle: 'Professional Repairs. Fast Turnaround. Trusted by Thousands.',
          items: [
            { name: 'iPhone 15 Pro Max Rugged Case', price: 'R 249.00', rating: '4.8 (256)', desc: 'Military Grade, MagSafe Compatible' },
            { name: 'Screen Replacement (S23 Ultra / iPhone)', price: 'From R 899.00', rating: '4.8 (96)', desc: '6 Months Warranty, OLED / LCD' },
            { name: 'Fast Charge 20W Adapter', price: 'R 149.00', rating: '4.9 (310)' },
          ],
        },
      ],
    },
  },
  {
    id: 'butcherboys',
    title: 'ButcherBoys Premium Meat',
    client: 'ButcherBoys Butchery Group',
    category: 'ecommerce',
    tagline: 'Premium Quality Meat Delivered Fresh. Temperature-controlled delivery.',
    description: 'Specialized fresh food eCommerce app for a heritage South African butchery. Handles cold-chain delivery scheduling, variable weight cut pricing, and bulk braai pack orders.',
    platform: 'Android Mobile App',
    year: '2024',
    accentColor: '#ef4444',
    mockupTheme: 'dark',
    stats: [
      { label: 'Braai Orders Delivered', value: '9,200+' },
      { label: 'AOV (Avg Order)', value: 'R740' },
      { label: 'Cold Chain SLA', value: '100%' },
    ],
    features: ['Cold Chain Logistics', 'Weight Calculations', 'Full Lamb Carcass Deals', 'Payflex Installments'],
    mockupData: {
      appName: 'ButcherBoys',
      tagline: 'Premium Meat. Great Prices.',
      accentColor: '#ef4444',
      screens: [
        {
          title: 'Full Lamb Carcass & Aged Cuts',
          subtitle: 'A-Grade Quality, Vacuum Sealed & Delivered Cold.',
          items: [
            { name: 'Full Lamb Carcass (A-Grade)', price: 'R 1,799.00', rating: '4.9 (412)', desc: 'Includes Chops, Ribs & Roasts' },
            { name: 'Ribeye Steak 500g (Grain Fed)', price: 'R 129.99', rating: '4.8 (236)', desc: 'Aged to Perfection' },
            { name: 'Traditional Boerewors 1kg', price: 'R 109.99', rating: '5.0 (520)' },
            { name: 'T-Bone Steak 500g', price: 'R 134.99', rating: '4.7 (189)' },
          ],
        },
      ],
    },
  },
  {
    id: 'saexpress',
    title: 'SAexpress AI Commerce',
    client: 'SAexpress Marketplace',
    category: 'ecommerce',
    tagline: 'All-in-One Commerce. Build. Sell. Grow. Dropshipping & Takealot sync.',
    description: 'Flagship multi-channel commerce application featuring Takealot API integration, AliExpress product import hub, AI SEO optimizer, and live merchant financial dashboards.',
    platform: 'Custom Web & Mobile',
    year: '2025',
    accentColor: '#3b82f6',
    mockupTheme: 'light',
    stats: [
      { label: 'Merchant Revenue', value: 'R4.2M+' },
      { label: 'Integrated Stores', value: '340+' },
      { label: 'AI SEO Score Avg', value: '87/100' },
    ],
    features: ['Takealot Integration', 'AliExpress Sync', 'Live Merchant Dashboard', 'AI SEO Optimizer'],
    mockupData: {
      appName: 'SAexpress',
      tagline: 'AI Intelligent Commerce',
      accentColor: '#3b82f6',
      screens: [
        {
          title: 'Merchant Dashboard & Dropshipping Hub',
          subtitle: 'Total Revenue: R45,680.00 (+18.6% this week)',
          items: [
            { name: 'Wireless Headphones Over-Ear', price: 'R 899.00', desc: 'Profit: R263.30 (+50%)' },
            { name: 'Smart Watch Series 9 Importer', price: '$18.50', desc: 'Takealot Auto-Sync Active' },
            { name: 'AI SEO Optimizer & Meta Fixer', desc: '87/100 Health Score' },
          ],
        },
      ],
    },
  },
  {
    id: 'cake-and-treats',
    title: 'Cake & Treats Bakery',
    client: 'Cake & Treats Confectionery',
    category: 'mobile',
    tagline: 'Sweet moments made better. Custom cakes delivered fresh.',
    description: 'Custom cake design selector with personalized messages, flavor customization, delivery time slots, and birthday party bulk ordering.',
    platform: 'Android Mobile App',
    year: '2025',
    accentColor: '#f43f5e',
    mockupTheme: 'dark',
    stats: [
      { label: 'Custom Cakes Baked', value: '4,800+' },
      { label: 'Satisfaction Rate', value: '99.4%' },
      { label: 'Peak Weekend Orders', value: '180/day' },
    ],
    features: ['Cake Customizer', 'Flavour & Size Selectors', 'Same Day Delivery', 'Secure Checkout'],
    mockupData: {
      appName: 'Cake & Treats',
      tagline: 'Made with love, just for you.',
      accentColor: '#f43f5e',
      screens: [
        {
          title: 'Custom Birthday & Wedding Cakes',
          subtitle: 'Moist, fluffy and delicious. Pick flavour, size and colors.',
          items: [
            { name: 'Custom Birthday Floral Cake', price: 'R 499.00', rating: '4.9 (128)', desc: '1kg Serves 8, Chocolate/Vanilla' },
            { name: 'Chocolate Drip Cake Slice', price: 'R 349.00', rating: '4.8 (96)' },
            { name: 'Red Velvet Classic', price: 'R 299.00', rating: '4.9 (88)' },
            { name: 'Traditional Milk Tart', price: 'R 159.00', rating: '5.0 (210)' },
          ],
        },
      ],
    },
  },
  {
    id: 'bellas-boutique',
    title: "Bella's Fashion Boutique",
    client: "Bella's Women's Apparel",
    category: 'mobile',
    tagline: 'Latest Trends. Unbeatable Style. Everyday fashion in South Africa.',
    description: 'Ultra-stylish women’s apparel mobile application with seasonal lookbooks, size guide filters, automated stock alerts, and PayJustNow installment payments.',
    platform: 'Android Mobile App',
    year: '2024',
    accentColor: '#10b981',
    mockupTheme: 'dark',
    stats: [
      { label: 'App Installs', value: '24,000+' },
      { label: 'Cart Abandonment', value: '-42%' },
      { label: 'Average Review', value: '4.9 ★' },
    ],
    features: ['Seasonal Lookbooks', 'Size & Fit Filter', 'PayJustNow 3-Pay', 'Fast SA Courier'],
    mockupData: {
      appName: "Bella's",
      tagline: 'Find your style, own your moment.',
      accentColor: '#10b981',
      screens: [
        {
          title: 'New Arrivals • Dresses & Tops',
          subtitle: 'Fresh styles just landed across South Africa.',
          items: [
            { name: 'Ruched Short Dress (Mint Green)', price: 'R 399.99', rating: '4.8 (128)', desc: 'XS to XL, Satin stretch' },
            { name: 'Satin Slip Evening Dress', price: 'R 349.99', rating: '4.7 (76)' },
            { name: 'Pleated Midi Dress', price: 'R 379.99', rating: '4.9 (94)' },
          ],
        },
      ],
    },
  },
  {
    id: 'solardirect',
    title: 'SolarDirect Load Shedding Solutions',
    client: 'SolarDirect Clean Energy',
    category: 'service',
    tagline: 'Smart solar solutions for a brighter tomorrow. Inverters & battery systems.',
    description: 'E-Commerce and technician booking portal for residential solar systems, lithium batteries, and load shedding backup power across Gauteng and Western Cape.',
    platform: 'Android Mobile App',
    year: '2025',
    accentColor: '#eab308',
    mockupTheme: 'dark',
    stats: [
      { label: 'Homes Powered', value: '620+' },
      { label: 'Free Site Audits', value: '1,200+' },
      { label: 'Zero Grid Downtime', value: '100%' },
    ],
    features: ['5kW Hybrid Bundles', 'Certified Technician Booking', 'Financing Options', 'Live Solar ROI Calculator'],
    mockupData: {
      appName: 'SolarDirect',
      tagline: 'Power your future. Naturally.',
      accentColor: '#eab308',
      screens: [
        {
          title: '5kW Hybrid Solar Power System & Installation',
          subtitle: 'Complete solar installation service with certified installers.',
          items: [
            { name: '5kW Hybrid Solar Power System (Complete)', price: 'R 12,999.00', rating: '4.8 (142)', desc: 'High efficiency, load shedding ready' },
            { name: 'Complete Solar Installation Service', price: 'R 3,999.00', desc: 'Free site assessment, certified technicians' },
            { name: '550W Mono Solar Panel', price: 'R 2,999.00', rating: '4.9 (84)' },
            { name: '200L Solar Geyser System', price: 'R 4,499.00', rating: '4.7 (63)' },
          ],
        },
      ],
    },
  },
  {
    id: 'securitydirect',
    title: 'SecurityDirect CCTV & Alarms',
    client: 'SecurityDirect SA',
    category: 'service',
    tagline: 'Smart Security. Total Peace of Mind. Cameras, alarms & installation.',
    description: 'Hardware store and technician dispatch system allowing home and business owners to purchase security systems and book certified installers in one click.',
    platform: 'Android Mobile App',
    year: '2024',
    accentColor: '#ef4444',
    mockupTheme: 'dark',
    stats: [
      { label: 'Installations Completed', value: '2,100+' },
      { label: 'Warranty Claims', value: '<0.5%' },
      { label: 'Customer Rating', value: '4.9 ★' },
    ],
    features: ['Hikvision 4MP PTZ', 'CCTV 4-Cam Booking', 'IDS Wireless Alarms', '24/7 Remote Monitoring Support'],
    mockupData: {
      appName: 'SecurityDirect',
      tagline: 'Secure what matters most.',
      accentColor: '#ef4444',
      screens: [
        {
          title: 'Hikvision 4MP PTZ IP Security Camera',
          subtitle: 'CCTV Installation Service by Certified Technicians.',
          items: [
            { name: 'Hikvision 4MP PTZ IP Camera', price: 'R 2,399.00', rating: '4.8 (156)', desc: '360° PTZ, Night Vision, IP66' },
            { name: 'CCTV Installation - 4 Cameras', price: 'R 2,499.00', desc: 'Neat & professional wiring, 24/7 support' },
            { name: 'IDS X64 Wireless Alarm Kit', price: 'R 1,499.00' },
          ],
        },
      ],
    },
  },
  {
    id: 'beautydot',
    title: 'BeautyDot Cosmetics',
    client: 'BeautyDot Hair & Glamour',
    category: 'mobile',
    tagline: 'Beauty, your way. Delivered to you. Hair extensions & luxury cosmetics.',
    description: 'ECommerce app with high visual polish, color swatch selector, shade finder, and interest-free installment options via Payflex and PayJustNow.',
    platform: 'Android Mobile App',
    year: '2024',
    accentColor: '#f43f5e',
    mockupTheme: 'dark',
    stats: [
      { label: 'Bundles Sold', value: '8,900+' },
      { label: 'Installment Share', value: '54%' },
      { label: 'Return Customer Rate', value: '41%' },
    ],
    features: ['Hair Texture & Length Matrix', 'Payflex 3-Pay', 'Shade Matcher', 'VIP Loyalty Discounts'],
    mockupData: {
      appName: 'BeautyDot',
      tagline: 'Glow starts with you.',
      accentColor: '#f43f5e',
      screens: [
        {
          title: 'Brazilian Hair Extensions & Eyeshadow Palettes',
          subtitle: 'Explore the latest beauty must-haves.',
          items: [
            { name: 'Brazilian Body Wave (3 Bundle)', price: 'R 1,399.00', rating: '4.8 (256)', desc: '100% Virgin Hair, 12" to 20"' },
            { name: 'Huda Beauty The New Nude Palette', price: 'R 849.00', rating: '4.9 (189)' },
            { name: 'L.A. Girl Pro Conceal HD', price: 'R 129.99' },
          ],
        },
      ],
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-fashion-express',
    clientName: 'Fashion Express (FE)',
    industry: 'Footwear & Streetwear Retail',
    challenge: 'High cart abandonment (72%) on their older website due to sluggish mobile load times and clunky EFT checkout during high-heat sneaker drops.',
    solution: 'GeekForge deployed a lightning-fast Android Mobile App with push notifications for instant drop announcements and 1-tap Ozow/PayFast checkout.',
    metrics: [
      { label: 'Mobile Conversion', value: '+310%', growth: true },
      { label: 'Average Checkout Time', value: '28 secs', growth: true },
      { label: 'Monthly GMV', value: 'R820K+', growth: true },
    ],
    testimonialQuote: 'Moving our store to our own Android App with GeekForge was the best R4,500 we ever spent. Our first weekend drop sold out in 14 minutes.',
    representative: 'Thabo M., Co-Founder',
  },
  {
    id: 'cs-butcherboys',
    clientName: 'ButcherBoys Butchery',
    industry: 'Food & Fresh Meat Logistics',
    challenge: 'Clients hesitated to buy meat online due to unpredictable delivery times and inability to request specific butchery cuts.',
    solution: 'GeekForge crafted a tailored ordering app with variable cut selectors, braai bundle configurators, and live WhatsApp dispatch notifications.',
    metrics: [
      { label: 'Weekly Orders', value: '+245%', growth: true },
      { label: 'Average Order Value', value: 'R740', growth: true },
      { label: 'Repeat Customer Rate', value: '68%', growth: true },
    ],
    testimonialQuote: 'The app completely transformed our retail model. Families order their weekly meat packs directly while sitting on their couches.',
    representative: 'Johan van der Merwe, Owner',
  },
  {
    id: 'cs-saexpress',
    clientName: 'SAexpress Marketplace',
    industry: 'eCommerce & Dropshipping Hub',
    challenge: 'Manual order routing between suppliers in China, Takealot seller accounts, and South African couriers was costing 25+ hours per week.',
    solution: 'Engineered a custom automated sync hub linking product catalogs, inventory levels, and live Takealot order status into a unified dashboard.',
    metrics: [
      { label: 'Admin Hours Saved', value: '22 hrs/wk', growth: true },
      { label: 'Catalog Size', value: '15,000+ items', growth: true },
      { label: 'Fulfillment Error Rate', value: '<0.2%', growth: true },
    ],
    testimonialQuote: 'GeekForge understands both the technical code and the commercial realities of doing eCommerce in South Africa.',
    representative: 'Mark S., Managing Director',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Kagiso Molefe',
    role: 'Managing Director',
    company: 'Urban Threads SA',
    location: 'Sandton, Johannesburg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'GeekForge built our custom WordPress store and then published our Android app on the Google Play Store for R4,500. Our mobile sales jumped by 40% in month one. Transparent pricing, no hidden agency fees.',
    projectType: 'WordPress & Android eCommerce App',
    verified: true,
  },
  {
    id: 't2',
    name: 'Pieter Du Plessis',
    role: 'Operations Head',
    company: 'SolarEdge Solutions SA',
    location: 'Durbanville, Cape Town',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Our solar quote requests tripled after GeekForge revamped our site and optimized our Google local search. They understand South African payment gateways like PayFast and Ozow like the back of their hand.',
    projectType: 'Website Revamp & SEO Optimization',
    verified: true,
  },
  {
    id: 't3',
    name: 'Zanele Ndlovu',
    role: 'Founder & CEO',
    company: 'Zuri Glow Cosmetics',
    location: 'Morningside, Durban',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'The automated quote generator was so accurate and easy to use. Within 7 days our Android eCommerce app was live on Google Play! My customers love the push notifications for our weekend deals.',
    projectType: 'Android App Special & Shopify Setup',
    verified: true,
  },
  {
    id: 't4',
    name: 'Craig Naidoo',
    role: 'Managing Partner',
    company: 'Apex Logistics & Courier',
    location: 'Centurion, Pretoria',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'Fast, professional, and reliable. They delivered our corporate site on time, set up our custom business emails, and integrated live WhatsApp chat for our dispatch team. Highly recommended.',
    projectType: 'Corporate Website & System Integration',
    verified: true,
  },
  {
    id: 't5',
    name: 'Nandi Khumalo',
    role: 'Head Baker & Owner',
    company: 'Sugar & Spice Confections',
    location: 'Rosebank, Johannesburg',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'We used to manage cake orders on sticky notes and messy WhatsApp chats. GeekForge built an ordering app where clients pick their flavor, sponge size, and delivery date. It saved our business.',
    projectType: 'Custom Cake Ordering Android App',
    verified: true,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-android-price',
    question: 'Is the Android Mobile App really only R4,500? Are there any hidden fees?',
    category: 'android',
    answer: 'Yes! Our R4,500 special is an all-inclusive setup package. It includes full eCommerce store functionality, product catalog setup, secure payment gateway integration (PayFast, Ozow, Payflex), push notifications, admin panel, and publishing your app directly to the Google Play Store. The only external cost is Google\'s one-time developer registration fee ($25 USD, approx R460 paid once directly to Google).',
  },
  {
    id: 'faq-source-code',
    question: 'Do I own the source code and the app once it is built?',
    category: 'android',
    answer: '100% yes! Unlike restrictive subscription platforms that hold your business hostage, with GeekForge you own the full source code, customer database, and app assets outright. You are never locked in.',
  },
  {
    id: 'faq-existing-store',
    question: 'Can I connect the Android App to my existing WordPress or Shopify store?',
    category: 'android',
    answer: 'Absolutely. We specialize in synchronizing existing WooCommerce, Shopify, or custom inventory databases with the Android app. Any product you add to your website will automatically appear in your mobile app in real-time, with synced stock quantities.',
  },
  {
    id: 'faq-sa-payments',
    question: 'What payment gateways do you support for South African stores?',
    category: 'pricing',
    answer: 'We integrate all leading South African payment providers, including PayFast, Ozow Instant EFT, Payflex (buy now, pay later), Yoco, Peach Payments, SnapScan, Zapper, and direct bank EFT with automated proof of payment verification.',
  },
  {
    id: 'faq-turnaround',
    question: 'What is the turnaround time for a website or mobile app?',
    category: 'process',
    answer: 'Standard professional websites take between 5 to 7 business days from content submission. Our R4,500 Android eCommerce App takes 7 to 10 business days, including Google Play Store review and publishing. Custom SaaS or complex portals take 2 to 3 weeks.',
  },
  {
    id: 'faq-hosting-domain',
    question: 'Do you handle domain registration, hosting, and business emails?',
    category: 'web',
    answer: 'Yes, we take care of the entire pipeline. We register your .co.za domain, set up high-speed SSD cloud hosting with SSL security certificates, and configure professional business emails (e.g. info@yourdomain.co.za) for you and your staff.',
  },
  {
    id: 'faq-maintenance',
    question: 'What happens after launch? Do you offer ongoing support?',
    category: 'process',
    answer: 'Every project includes 30 days of complimentary post-launch support and training on how to use your admin panel. We also offer affordable monthly care plans starting from R450/month for automated backups, security patching, and content updates.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Why South African Stores Need an Android App in 2025 (Google Play Advantage)',
    slug: 'why-south-african-stores-need-android-app-2025',
    excerpt: 'Over 84% of South African smartphone users run Android. Discover why having an app icon on your customer’s home screen yields 3x higher retention.',
    category: 'Mobile Apps',
    content: `In South Africa, mobile commerce isn't just growing—it has completely eclipsed desktop shopping. Over 84% of smartphone users in SA are on Android devices. While having a mobile-responsive website is essential, an Android app offers distinct competitive advantages that a browser tab cannot match:

1. **Instant Push Notifications (Free Marketing)**: Unlike emails that land in spam or SMS messages that cost 30c each, push notifications are 100% free and have open rates exceeding 28%. When you run a Friday flash sale, your customers are notified immediately on their lock screens.
2. **One-Tap Reordering**: An app keeps users logged in securely with biometrics (fingerprint/face recognition). Customers can buy their favorite items in less than 30 seconds.
3. **Data-Light Browsing**: We optimize GeekForge Android apps to consume minimal mobile data, making them fast and affordable for South Africans browsing on mobile networks.
4. **Google Play Store Credibility**: Being on the official Play Store instills immense trust. Customers know your business is legitimate and verified.

At our special price of R4,500, an Android eCommerce app delivers immediate ROI for retail stores, boutiques, and bakeries.`,
    author: {
      name: 'GeekForge Engineering',
      role: 'Mobile Architecture Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    readTime: '4 min read',
    date: 'February 2025',
    tags: ['Android Apps', 'eCommerce', 'South Africa', 'Google Play'],
  },
  {
    id: 'post-2',
    title: 'WordPress vs Shopify in South Africa: Which eCommerce Platform Wins?',
    slug: 'wordpress-vs-shopify-south-africa',
    excerpt: 'An honest breakdown of fees, PayFast/Ozow compatibility, monthly running costs, and scalability for South African entrepreneurs.',
    category: 'WordPress & CMS',
    content: `Choosing between WordPress (WooCommerce) and Shopify is one of the most critical decisions for a South African business. Here is how they stack up in our local market:

### 1. Monthly Currency & Cost Structure
- **Shopify**: Billed in US Dollars ($39/mo for Basic). When the Rand fluctuates, your monthly overhead changes. Shopify also charges a transaction fee unless you use their gateway.
- **WordPress/WooCommerce**: 100% open-source software with zero monthly platform fee. You only pay for local high-speed hosting (typically R150 - R350 per month in ZAR).

### 2. South African Payment Gateways
Both platforms support PayFast, Ozow, and Payflex. However, WooCommerce offers significantly more flexibility with zero vendor lock-in.

### 3. Customizability & Feature Freedom
WordPress allows infinite customization—booking calendars, custom wholesale pricing tiers, multi-vendor marketplaces, and variable product matrices without monthly app subscription bloat.

**Our Recommendation**: If you want complete ownership, lower monthly operational costs in ZAR, and maximum customization, **WordPress + WooCommerce** is the clear winner for SA businesses.`,
    author: {
      name: 'Devin K.',
      role: 'Senior Web Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    readTime: '5 min read',
    date: 'January 2025',
    tags: ['WordPress', 'Shopify', 'WooCommerce', 'Cost Comparison'],
  },
  {
    id: 'post-3',
    title: 'Setting Up PayFast, Ozow & Payflex for South African Online Stores',
    slug: 'payfast-ozow-payflex-checkout-guide',
    excerpt: 'A step-by-step guide to accepting Instant EFT, card payments, and Buy-Now-Pay-Later installments to maximize your checkout conversion.',
    category: 'eCommerce',
    content: `Checkout abandonment in South Africa often happens because customers don't find their preferred payment method. Offering the right blend of payment gateways is critical:

### The Ideal SA Payment Stack:
1. **PayFast**: The gold standard for credit/debit cards, Masterpass, and QR payments. Fast verification and trusted by millions of South Africans.
2. **Ozow Instant EFT**: Essential for customers who do not have credit cards or prefer paying straight from their Capitec, FNB, Standard Bank, Nedbank, or TymeBank accounts. Funds clear instantly with zero chargeback risk.
3. **Payflex / PayJustNow (BNPL)**: Allows customers to split purchases into 3 or 4 interest-free installments over 6 weeks, while you as the merchant get paid upfront. Stores offering Payflex consistently see a 20-30% increase in Average Order Value (AOV).

At GeekForge, we configure all three payment gateways directly into your website and Android mobile app, ensuring frictionless checkout.`,
    author: {
      name: 'GeekForge FinTech Team',
      role: 'Payments Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    readTime: '6 min read',
    date: 'February 2025',
    tags: ['PayFast', 'Ozow', 'Payflex', 'Payment Gateways'],
  },
  {
    id: 'post-4',
    title: 'Local SEO Strategies: How to Rank #1 on Google in South Africa',
    slug: 'local-seo-ranking-south-africa',
    excerpt: 'How to optimize your website and Google Business Profile to capture high-intent customers in your specific city or suburb.',
    category: 'SEO & Growth',
    content: `When someone searches for "plumber in Centurion", "custom cakes in Sandton", or "sneakers online Durban", Google prioritizes local relevance. Here are four proven tactics GeekForge uses to rank our clients:

1. **Hyper-Local Keywords in Headers**: Don't just say "We build websites"; optimize for "Custom WordPress Website Development in Johannesburg".
2. **Google Business Profile (GBP) Synergy**: Ensure your business name, address, and phone number (NAP) exactly match between your website footer and Google Maps pin.
3. **Structured Schema Markup**: Embed LocalBusiness and Product JSON-LD schema so Google can show your star ratings, pricing, and opening hours right in search snippets.
4. **Mobile Page Speed**: South African mobile users often browse on LTE or 3G. Websites that load under 1.5 seconds receive an organic ranking boost from Google’s mobile-first indexing.`,
    author: {
      name: 'Sipho N.',
      role: 'SEO & Growth Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    readTime: '4 min read',
    date: 'December 2024',
    tags: ['SEO', 'Google Maps', 'Local Business', 'Traffic'],
  },
  {
    id: 'post-5',
    title: 'The Rise of Dropshipping in SA: Overcoming Shipping & Logistics',
    slug: 'dropshipping-south-africa-shipping-guide',
    excerpt: 'Real strategies for dropshipping in South Africa using CJ Dropshipping, local suppliers, and clear customer expectations.',
    category: 'eCommerce',
    content: `Dropshipping remains one of the most accessible business models in South Africa, but shipping delays can ruin a store's reputation if handled incorrectly.

### Key Strategies for SA Dropshipping Success:
- **Use Dedicated SA Suppliers or CJ Fast Line**: Choose suppliers offering 7-10 business day tracked shipping to South Africa.
- **Transparent Delivery Timelines**: Clearly state delivery estimates (e.g. "Delivered in 5-9 business days via door-to-door courier"). South Africans are happy to wait if they are kept informed.
- **Automated WhatsApp Tracking**: Integrate automated tracking updates sent directly to your customer's WhatsApp when their package clears customs.
- **Professional App Store Presence**: A branded Android mobile app sets you apart from generic dropshippers and builds immense repeat customer loyalty.`,
    author: {
      name: 'Devin K.',
      role: 'eCommerce Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    readTime: '5 min read',
    date: 'January 2025',
    tags: ['Dropshipping', 'Logistics', 'Suppliers', 'eCommerce'],
  },
];

export const QUOTE_FEATURES: QuoteFeature[] = [
  { id: 'feat-responsive', name: 'Mobile-Responsive Modern Design', description: 'Fluid layout optimized for phones, tablets & desktops', price: 1200, category: 'core' },
  { id: 'feat-cms', name: 'WordPress CMS / Admin Panel', description: 'Easy editing of text, images, blog posts & products', price: 1400, category: 'core' },
  { id: 'feat-domain-hosting', name: '1-Year .co.za Domain & SSD Hosting', description: 'Free domain registration + business emails setup', price: 950, category: 'core' },
  { id: 'feat-seo', name: 'Complete Local SEO Optimization', description: 'Google search console, meta tags & local schema', price: 1500, category: 'marketing' },
  { id: 'feat-whatsapp', name: 'Live WhatsApp Chat & Click-to-Call', description: 'Direct contact buttons and floating customer inquiry widget', price: 450, category: 'core' },
  { id: 'feat-ecommerce', name: 'Full eCommerce Store (Cart & Checkout)', description: 'Product catalog, stock management & orders system', price: 2800, category: 'ecommerce' },
  { id: 'feat-payments', name: 'PayFast / Ozow / Payflex Gateways', description: 'Card, Instant EFT, and 3-part installment checkout', price: 1200, category: 'ecommerce' },
  { id: 'feat-courier', name: 'Courier Guy / Live Shipping Integration', description: 'Automated delivery rates by postal code and tracking', price: 1400, category: 'ecommerce' },
  { id: 'feat-android-app', name: 'Android Mobile App Special (R4,500)', description: 'Branded Google Play Store App with push notifications', price: 4500, category: 'mobile' },
  { id: 'feat-push', name: 'Push Notification Engine', description: 'Send instant promotional alerts to mobile users', price: 900, category: 'mobile' },
  { id: 'feat-social-feed', name: 'Social Media Feeds & Auto-Posting', description: 'Instagram live grid and Facebook product catalog sync', price: 650, category: 'marketing' },
  { id: 'feat-revamp', name: 'Content & Database Migration from Old Site', description: 'Transfer existing posts, products, and customer records', price: 1200, category: 'support' },
];

export const BUDGET_TIERS = [
  {
    range: 'Under R4,000',
    min: 0,
    max: 3999,
    title: 'Starter Brochure & Profile Site',
    price: 'From R2,900',
    description: 'Perfect for local service providers, consultants, and new businesses needing a clean digital presence.',
    included: [
      '3 - 5 Page Custom WordPress / Responsive Site',
      'Free .co.za Domain & 1 Year High-Speed Hosting',
      'Contact Forms & Direct WhatsApp Chat Integration',
      'Mobile-Friendly & Basic Google Search Indexing',
    ],
    recommendedAction: 'Choose Starter Site',
  },
  {
    range: 'R4,000 - R6,000',
    min: 4000,
    max: 6000,
    title: 'Android Mobile App Special (R4,500)',
    price: 'R4,500 Once-off',
    badge: '🔥 Best Value in South Africa',
    description: 'Turn your retail shop or boutique into an automated 24/7 mobile sales engine on Google Play Store.',
    included: [
      'Full eCommerce Android App on Google Play Store',
      'Secure SA Payments (PayFast, Ozow, Payflex, Card)',
      'Push Notifications for Flash Sales & Promotions',
      'Admin Panel for Products, Orders & Stock Management',
      'You Own Full Source Code & Database Outright',
    ],
    recommendedAction: 'Claim R4,500 Android Special',
  },
  {
    range: 'R6,000 - R12,000',
    min: 6001,
    max: 12000,
    title: 'Full Web + Android Mobile Combo',
    price: 'From R7,900',
    badge: '★ Most Popular for Retailers',
    description: 'A complete omnichannel powerhouse: responsive WordPress/Shopify online store synchronized with an Android Mobile App.',
    included: [
      'Comprehensive eCommerce Website + Android App',
      'Live Shared Inventory & Centralized Order Management',
      'Courier Guy Live Shipping Calculation',
      'Advanced Local SEO Optimization Package',
      '30 Days Dedicated Technical Support & Training',
    ],
    recommendedAction: 'Build Web + Mobile Combo',
  },
  {
    range: 'R12,000+',
    min: 12001,
    max: 100000,
    title: 'Custom SaaS, Multi-Vendor & Enterprise Portal',
    price: 'From R14,500',
    description: 'For growing businesses requiring custom web apps, multi-vendor marketplaces, API integrations, and automated logistics.',
    included: [
      'Bespoke React / Node / Next.js or Enterprise WordPress',
      'Multi-Vendor Marketplace with Vendor Dashboards',
      'Custom ERP, CRM, or Takealot API Automation',
      'High-Concurrency Cloud Architecture & CDN',
      'Priority 24/7 SLA & Maintenance Support',
    ],
    recommendedAction: 'Consult Custom Solution',
  },
];
