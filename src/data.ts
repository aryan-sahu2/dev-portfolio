// Everything the page says about work lives here. Update this file, not the markup.
// Every number below traces to a repo, a doc or a live URL; keep it that way.

export type Metric = { value: string; label: string };
export type Link = { href: string; text: string };

export type Entry = {
  title: string;
  subtitle: string;
  badge?: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  outcome?: string;
  metrics?: Metric[];
  link?: Link;
};

export type Lore = {
  tag: string;
  title: string;
  story: string[];
  outcome: string;
  stack?: string[];
  link?: Link;
};

// Hero strip. Only numbers that hold up in an interview; the last cell is a word on purpose.
export const stats: Metric[] = [
  { value: '3+ yrs', label: 'Shipping to production' },
  { value: '26 days', label: 'SEVN: first commit to prod' },
  { value: '4', label: 'Systems taken live in 2026' }, // worldofsevn.com, pulse, iccspune.in, demo.iccspune.in
  { value: '10M+', label: 'Daily txns · Newgen' },
  { value: 'Building', label: 'SEVN, as engineer #1' },
];

export const lore: Lore[] = [
  {
    tag: 'SEVN · Aug 2026',
    title: 'WordPress to Workers in 26 days',
    story: [
      'When I joined SEVN, the site was a WordPress build. I rebuilt it as Next.js 16 on Cloudflare Workers through OpenNext, with Sanity as the CMS so the team edits pages without me.',
      'I wrote both big decisions down before making them. A custom CMS was 6–8 weeks of work; Sanity was about two, and its content exports as plain files, so leaving later is a choice rather than a rebuild. Workers won hosting because the integration was already proven against a real Worker and the DNS was already on Cloudflare.',
      'The cutover was a DNS change, with the old server kept running as the rollback. Undoing it meant moving one record, not redeploying anything.',
    ],
    outcome: 'First commit on 5 August. In production on 31 August.',
    stack: ['Next.js 16', 'OpenNext', 'Cloudflare Workers', 'Sanity'],
    link: { href: 'https://worldofsevn.com', text: 'worldofsevn.com' },
  },
  {
    tag: 'SEVN · Oct 2026',
    title: 'A working prototype in under two days',
    story: [
      'An idea for an AI assistant came up, and the quickest way to judge it was to use it. So I built it.',
      'Under two days later there was a working demo: Claude behind a chat interface, a D1 database seeded with the reference data, deployed on Cloudflare Workers, and a one-command verify that prints one line per step. The config is pinned to my own Cloudflare account, so a demo deploy can never reach production.',
    ],
    outcome: 'A demo people could actually try, then handed over for the full build.',
    stack: ['Claude API', 'Cloudflare Workers', 'D1', 'TypeScript'],
  },
  {
    tag: 'Family business · 2026',
    title: "My father's business, online",
    story: [
      'My father has run International Computer Care Systems in Pune since 1998: repairs, rentals, networking and maintenance contracts. It grew on reputation, and the old website showed none of that.',
      'I rebuilt iccspune.in in Astro as static pages on Cloudflare: a page for every service and for the Pune neighbourhoods it serves, so local search can find it, and a contact form running as a Cloudflare Pages Function.',
    ],
    outcome: "Live at iccspune.in. Built by the owner's son.",
    stack: ['Astro', 'Tailwind', 'GSAP', 'Cloudflare Pages'],
    link: { href: 'https://iccspune.in', text: 'iccspune.in' },
  },
  {
    tag: 'ICCS-OS · Oct 2026',
    title: 'A paper office, into a database',
    story: [
      'ICCS-OS replaces the phone calls, WhatsApp and memory that business runs on. Building the screens was the easy part. Getting 28 years of habits into a database was not.',
      'I imported years of bills from Tally, the rental challans from typed sheets and scanned paper, and the bank statements, matched against open invoices, including the TDS each customer usually holds back.',
      "Every import runs on a copy of the database first, writes through the same services the app uses, and writes nothing on a second run. Real books don't forgive a double import.",
    ],
    outcome: "The office's real books are already in the system it will run on.",
    stack: ['NestJS', 'Prisma', 'PostgreSQL'],
  },
  {
    tag: 'Production · 2026',
    title: 'The check every other check missed',
    story: [
      'A second edit to the same page, published from the CMS, was silently dropped for ten hours. Typecheck, tests and lint were all green. The site just kept serving the old words.',
      'Nothing in the pipeline tested the one thing editors care about: does publishing work? Now the deploy boots the built app locally, asks every page for its status, publishes to a real page several times, and refuses to upload unless each edit shows up. After the upload it runs the same checks against live, and prints the rollback command if one fails.',
    ],
    outcome: "A deploy that can't pass while publishing is broken.",
    stack: ['Next.js', 'Cloudflare Workers', 'Headless CMS'],
  },
  {
    tag: 'Infravue · 2025',
    title: 'A backend swap nobody noticed',
    story: [
      "Infravue's site was hand-written HTML, CSS and Three.js, and its forms ran on a legacy backend. Both needed replacing, and the site had to stay up the whole time.",
      'I moved form handling to a Cloudflare Worker and kept the old backend running in parallel until the new one had proven itself. The site itself moved to Next.js. Every deploy tars the current build before the new one goes over SCP, so a bad release can be rolled back.',
    ],
    outcome: 'New frontend, new backend, no downtime.',
    stack: ['Next.js', 'Cloudflare Workers', 'PM2', 'Nginx'],
  },
];

export const experience: Entry[] = [
  {
    title: 'SEVN',
    subtitle: 'Founding Engineer',
    badge: 'CURRENT',
    period: 'Aug 2026 – Present',
    current: true,
    summary:
      "SEVN is a bespoke luxury travel house. I'm its first engineer: the website, the internal tools, and the infrastructure under both are mine.",
    bullets: [
      'Rebuilt worldofsevn.com off WordPress onto Next.js 16 on Cloudflare Workers, with Sanity as the CMS: first commit 5 August, in production 31 August',
      'Built a deploy that gates itself: typecheck, tests, lint and a CMS-drift check before anything uploads, and checks against live after',
      'Built pulse.worldofsevn.com, the marketing dashboard: every channel with an API pulled twice a day into Cloudflare D1, behind Cloudflare Access',
      'Wired the contact and newsletter forms to Freshdesk and Mailchimp behind Turnstile, with an alert when a submission only partly delivers',
      'Set up a staging dataset and Studio in Sanity, and a guard that stops any deploy pointed at the wrong one',
      'Built a working AI assistant prototype in under two days (Claude, Workers, D1), then handed it over for the full build',
    ],
    outcome: 'The new site was in production 26 days after the first commit.',
    link: { href: 'https://worldofsevn.com', text: 'Visit worldofsevn.com' },
  },
  {
    title: 'Infravue Technologies',
    subtitle: 'Full Stack Developer',
    badge: 'DUBAI-BASED STARTUP',
    period: 'Jul 2025 – 2026',
    summary:
      'I built and deployed their Next.js, Node.js and Python applications, and ran the servers underneath them.',
    bullets: [
      'Deployed production apps with PM2 and Nginx across multiple subdomains, with zero-downtime releases',
      'Built a Cloudflare Workers backend for form processing while the legacy one kept running in parallel',
      'Migrated a hand-written HTML/CSS/Three.js site to Next.js, cutting maintenance overhead by 40% and speeding up the 3D scenes',
      'Set up PM2 health checks and automatic restarts so a crashed process recovers without anyone paging me',
      'Wired CI/CD to tar a backup of the live build before each SCP deploy, so every release can be rolled back',
    ],
    outcome: 'Moved the site to Next.js and a new form backend without taking anything offline.',
  },
  {
    title: 'Kangagigs',
    subtitle: 'Full Stack Developer (Co-founder)',
    badge: 'CO-FOUNDER',
    period: 'Mar 2025 – Jul 2025',
    summary:
      'A job discovery platform I co-founded. I owned all of it: the React frontend, the Node.js API, the PostgreSQL schema, AWS EC2 provisioning, the Nginx reverse proxy and PM2.',
    bullets: [
      'Shipped JWT-secured REST APIs on React, Node.js, PostgreSQL and Prisma, deployed on EC2 without outside engineering help',
      'Built employer and candidate flows end to end: job posting, search and filtering, resume uploads, auth',
      'Ran three UI/UX iterations off real user feedback, cutting page load time by 35%',
    ],
    outcome: '500+ people signed up for something I built, deployed and kept running on my own.',
    metrics: [
      { value: '500+', label: 'Registered Users' },
      { value: '35%', label: 'Load Time Reduction' },
      { value: '99.9%', label: 'Uptime' },
      { value: '3', label: 'UI/UX Iterations' },
    ],
  },
  {
    title: 'Newgen Software Technologies',
    subtitle: 'Application Engineer',
    badge: 'ENTERPRISE',
    period: 'Feb 2023 – Mar 2025',
    summary:
      'Production features for enterprise clients including Vodafone India and Bank of Maharashtra, in Java and JavaScript systems processing over 10 million banking transactions a day.',
    bullets: [
      'Engineered Oracle-to-SAP data integration pipelines with 99.9% data accuracy across critical financial processes',
      'Cut batch query time by 30% through query restructuring, indexing and execution plan analysis',
    ],
    outcome: 'Learned production the strict way: on banking data, where "mostly correct" doesn\'t count.',
    metrics: [
      { value: '10M+', label: 'Daily Transactions' },
      { value: '99.9%', label: 'Data Accuracy' },
      { value: '30%', label: 'Query Time Reduction' },
      { value: 'Oracle→SAP', label: 'Integration Pipeline' },
    ],
  },
];

export const projects: Entry[] = [
  {
    title: 'ICCS-OS',
    subtitle: 'NestJS · Prisma · PostgreSQL · Next.js 16 · Docker',
    period: '2025 – Present',
    summary:
      "The operations system for my family's 28-year-old computer business in Pune: service tickets, rentals, inventory, AMC contracts, quotations, GST invoices and payments in one shared record.",
    bullets: [
      "49 Prisma models and an OpenAPI spec of 185 operations; the frontend's API types are generated from the spec, so client and server can't drift",
      'Inventory as an append-only event history: stock moves once, at the point the goods actually leave',
      'Challan PDFs rendered server-side by headless Chrome from the same sheet the web app prints, so there is one layout, not two',
      '114 unit and end-to-end test files; bug fixes start with a failing test',
      'Every screen checked at 390px and 1280px with screenshots and axe accessibility audits',
      'Runs on a free-tier Oracle Cloud ARM machine behind a Cloudflare Tunnel, SSH closed to the internet, backups to R2',
    ],
    outcome: "Built so the shop's memory lives in a database, not in whoever is out on a job.",
    link: { href: 'https://demo.iccspune.in', text: 'Try the demo' },
  },
  {
    title: 'Agency Site Recreations',
    subtitle: 'React · GSAP · Framer Motion · ScrollTrigger',
    period: '2024',
    summary:
      'Rebuilt ExoApe, Refokus and Obys from scratch to learn how good scroll-driven animation is actually put together.',
    bullets: ['Matched layouts, page transitions and ScrollTrigger timelines against the originals'],
    link: { href: 'https://github.com/aryan-sahu2', text: 'View on GitHub' },
  },
];
