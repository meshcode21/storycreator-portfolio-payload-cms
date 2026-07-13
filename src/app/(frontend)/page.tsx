import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroSection from "@/components/HeroSection";
import RecentChapters from "@/components/RecentChapters";
import ShowreelSection from "@/components/ShowreelSection";

export const revalidate = 0; // Ensures fresh data load during development

export default async function HomePage() {
  const payload = await getPayload({ config });

  // 1. Fetch the Home Page Data
  const homeData = await payload.findGlobal({ slug: 'home-page' });

  return (
    <>
      {/* Assuming HeroSection might also get data eventually! */}
      <HeroSection data={homeData.hero} />

      {/* Dynamic Legacy Introduction */}
      <div className="py-28 px-6 md:px-16 bg-surface-dim/30 border-y border-outline-variant/10 text-center max-w-360 mx-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
            {homeData.philosophy?.subheading}
          </span>
          <p className="font-display text-2xl sm:text-3xl text-on-surface leading-snug font-light">
            &quot;{homeData.philosophy?.quote}&quot;
          </p>
          <div className="w-12 h-px bg-outline-variant/55 mx-auto" />
          <p className="font-sans text-xs text-on-surface-variant max-w-lg mx-auto leading-relaxed tracking-wider font-light">
            {homeData.philosophy?.description}
          </p>
        </div>
      </div>

      <div id="showreel-anchor">
        <ShowreelSection data={homeData.showreel} />
      </div>

      {/* Pass the explicitly chosen 4 featured projects */}
      <RecentChapters data={homeData.featuredWord} />
    </>
  );
}