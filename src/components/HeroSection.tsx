import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection({ data }: { data: any }) {
  if (!data) return null;

  // Extract the image URL safely
  const bgImageUrl = typeof data.backgroundImage === 'object' ? data.backgroundImage?.url : '';
  const bgImageAlt = typeof data.backgroundImage === 'object' ? data.backgroundImage?.alt : 'Hero background';

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Media */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 cinematic-overlay z-10" />
        <div className="w-full h-full opacity-65 scale-105 transition-all duration-3000 hover:scale-100 relative">
          {bgImageUrl && (
            <Image
              src={bgImageUrl}
              alt={bgImageAlt || "Moody atmospheric high-end wedding scene"}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
        </div>
      </div>

      {/* Floating typography contents */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto space-y-6">
        <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary block animate-fade-in opacity-80">
          {data.subtitle}
        </span>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-on-surface leading-tight tracking-tight select-none">
          {/* Splits the CMS textarea input by new lines to render actual <br /> tags */}
          {data.title?.split('\n').map((line: string, index: number) => (
            <React.Fragment key={index}>
              {line}
              {index !== data.title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        
        <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed tracking-wider">
          {data.description}
        </p>

        {/* Call to action wrappers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href={data.primaryButton?.url || '#'}
            className="w-full sm:w-auto px-10 py-4 border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-500 uppercase tracking-widest text-xs font-semibold cursor-pointer select-none inline-block"
          >
            {data.primaryButton?.label}
          </Link>

          <Link
            href={data.secondaryButton?.url || '#'}
            className="w-full sm:w-auto px-10 py-4 border border-outline-variant/40 hover:border-outline text-on-surface-variant hover:text-on-surface transition-all duration-500 uppercase tracking-widest text-xs font-semibold cursor-pointer select-none inline-block"
          >
            {data.secondaryButton?.label}
          </Link>
        </div>
      </div>

      {/* Anchor scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-outline">Scroll To Explore</span>
        <div className="w-px h-12 bg-linear-to-b from-primary to-transparent animate-pulse" />
      </div>
    </section>
  );
}