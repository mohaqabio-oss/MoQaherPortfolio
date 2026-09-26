import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/navbar/navbar';
import { HeroSection } from '@/components/hero/hero-section';
import { SocialMediaItem } from '@/components/hero/social-icons';

// Fallback socials if database has not been seeded yet
const FALLBACK_SOCIALS: SocialMediaItem[] = [
  { id: '1', platformName: 'GitHub', url: 'https://github.com', iconName: 'github', isVisible: true },
  { id: '2', platformName: 'LinkedIn', url: 'https://linkedin.com', iconName: 'linkedin', isVisible: true },
  { id: '3', platformName: 'X / Twitter', url: 'https://x.com', iconName: 'x', isVisible: true },
  { id: '4', platformName: 'Telegram', url: 'https://t.me', iconName: 'telegram', isVisible: true },
  { id: '5', platformName: 'Discord', url: 'https://discord.com', iconName: 'discord', isVisible: true },
];

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  let socials: SocialMediaItem[] = FALLBACK_SOCIALS;

  try {
    const dbSocials = await prisma.socialMedia.findMany({
      where: { isVisible: true },
      orderBy: { order: 'asc' },
    });

    if (dbSocials.length > 0) {
      socials = dbSocials;
    }
  } catch {
    // If DB is offline during initial build/preview, seamlessly fall back
    socials = FALLBACK_SOCIALS;
  }

  return (
    <main className="relative min-h-screen bg-[#080808]">
      {/* Front-End Navbar with Dynamic Client-Side Language Toggle */}
      <Navbar />

      {/* Hero Section with Neumorphic Profile Chamber, Advanced Typographic Effects, & Dynamic Socials */}
      <HeroSection
        name="ALEXANDER LEVI"
        role="Staff Systems Architect & Creative Technologist"
        bio="Designing high-concurrency distributed engines and bespoke web interfaces. Obsessed with micro-interactions, low-latency data streams, and raw typographic clarity."
        avatarUrl="/avatar-placeholder.png"
        socials={socials}
      />
    </main>
  );
}
