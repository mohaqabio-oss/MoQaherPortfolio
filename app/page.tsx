import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/navbar/navbar';
import { HeroSection } from '@/components/hero/hero-section';
import { SectionsView, SectionItem } from '@/components/sections/sections-view';
import { SocialMediaItem } from '@/components/hero/social-icons';

const FALLBACK_SOCIALS: SocialMediaItem[] = [
  { id: '1', platformName: 'GitHub', url: 'https://github.com', iconName: 'github', isVisible: true },
  { id: '2', platformName: 'LinkedIn', url: 'https://linkedin.com', iconName: 'linkedin', isVisible: true },
  { id: '3', platformName: 'X / Twitter', url: 'https://x.com', iconName: 'x', isVisible: true },
  { id: '4', platformName: 'Telegram', url: 'https://t.me', iconName: 'telegram', isVisible: true },
  { id: '5', platformName: 'Discord', url: 'https://discord.com', iconName: 'discord', isVisible: true },
];

const FALLBACK_SECTIONS: SectionItem[] = [
  {
    id: 'sec-1',
    name: 'Programming & Distributed Systems',
    slug: 'programming',
    order: 0,
    projects: [
      {
        id: 'p-1',
        title: 'Distributed Log Consensus Engine',
        slug: 'distributed-consensus-engine',
        type: 'ARTICLE_PROJECT',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-1',
      },
      {
        id: 'p-2',
        title: 'Zero-Copy Network Packet Multiplexer',
        slug: 'zero-copy-multiplexer',
        type: 'ARTICLE_PROJECT',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-1',
      },
    ],
  },
  {
    id: 'sec-2',
    name: 'Academic & Formal Accreditations',
    slug: 'academic',
    order: 1,
    projects: [
      {
        id: 'p-3',
        title: 'Certified Kubernetes Security Specialist (CKS)',
        slug: 'certified-k8s-security',
        type: 'CERTIFICATE',
        issuer: 'Cloud Native Computing Foundation (CNCF)',
        coverImage: null,
        screenshots: [],
        isDraft: false,
        categoryId: 'sec-2',
      },
    ],
  },
  {
    id: 'sec-3',
    name: 'Leadership & Architecture Advisory',
    slug: 'leadership',
    order: 2,
    projects: [],
  },
];

export const revalidate = 60;

export default async function HomePage() {
  let socials: SocialMediaItem[] = FALLBACK_SOCIALS;
  let sections: SectionItem[] = FALLBACK_SECTIONS;

  try {
    const [dbSocials, dbSections] = await Promise.all([
      prisma.socialMedia.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' },
      }),
      prisma.section.findMany({
        orderBy: { order: 'asc' },
        include: {
          projects: {
            where: { isDraft: false },
            orderBy: { order: 'asc' },
          },
        },
      }),
    ]);

    if (dbSocials.length > 0) socials = dbSocials;
    if (dbSections.length > 0) sections = dbSections as SectionItem[];
  } catch {
    // If DB is offline during build
  }

  return (
    <main className="relative min-h-screen bg-navy-950 text-slate-200">
      {/* Navbar in Public Mode */}
      <Navbar isAdmin={false} />

      {/* Hero Section in Public Mode */}
      <HeroSection
        name="ALEXANDER LEVI"
        role="Staff Systems Architect // Distributed Engines"
        bio="Architecting high-concurrency event streams and low-latency storage engines. Rigorous focus on algorithmic efficiency, memory layout, and raw typographic clarity."
        avatarUrl="/avatar-placeholder.png"
        socials={socials}
        isAdmin={false}
      />

      {/* Sections & Projects Gallery */}
      <SectionsView sections={sections} isAdmin={false} />
    </main>
  );
}
