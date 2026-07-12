import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RecentChapters({ data }: { data: any }) {
  // Extract the archives array from the new workList field
  const chapters = data?.workList;

  if (!chapters || chapters.length < 4) return null; // Ensure we have enough items

  return (
    <section className="py-24 px-6 md:px-16 max-w-360 mx-auto">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary block mb-2">
            {data?.subTitle || 'Selected Work'}
          </span>
          <h3 className="font-display text-3xl md:text-5xl text-on-surface">
            {data?.title || 'Recent Chapters'}
          </h3>
        </div>
        <Link
          // Accessing the hyphenated key using bracket notation
          href={data?.['cta-redirect'] || '/work'} 
          className="font-sans text-xs uppercase tracking-widest text-primary border-b border-primary/30 hover:border-primary pb-1 transition-all duration-300 cursor-pointer inline-block"
        >
          [ Explore All Work ]
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Large Vertical Column (Left) - chapters[0] */}
        <Link
          href={`/the-work/${chapters[0].slug}`}
          className="md:col-span-7 h-150 bg-surface-dim relative group overflow-hidden border border-outline-variant/15 cursor-pointer block"
        >
          <Image
            src={chapters[0].media?.url}
            alt={chapters[0].title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-2000 ease-out"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
          <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-1 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <h4 className="font-display text-2xl md:text-3xl text-on-surface">{chapters[0].title}</h4>
            <span className="font-sans text-[10px] uppercase tracking-widest text-primary">{chapters[0].subtitle}</span>
          </div>
        </Link>

        {/* Column of Stacked Horizontal items (Right) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* chapters[1] */}
          <Link
            href={`/the-work/${chapters[1].slug}`}
            className="h-72 bg-surface-dim relative group overflow-hidden border border-outline-variant/15 cursor-pointer block"
          >
            <Image
              src={chapters[1].media?.url}
              alt={chapters[1].title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-2000 ease-out"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 transition-all duration-500">
              <h4 className="font-display text-lg text-on-surface tracking-wider">{chapters[1].title}</h4>
              <span className="font-sans text-[9px] uppercase tracking-widest text-primary">{chapters[1].subtitle}</span>
            </div>
          </Link>

          {/* chapters[2] */}
          <Link
            href={`/the-work/${chapters[2].slug}`}
            className="h-72 bg-surface-dim relative group overflow-hidden border border-outline-variant/15 cursor-pointer block"
          >
            <Image
              src={chapters[2].media?.url}
              alt={chapters[2].title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-2000 ease-out"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 transition-all duration-500">
              <h4 className="font-display text-lg text-on-surface tracking-wider">{chapters[2].title}</h4>
              <span className="font-sans text-[9px] uppercase tracking-widest text-primary">{chapters[2].subtitle}</span>
            </div>
          </Link>
        </div>

        {/* Asymmetrical row 2 - chapters[3] */}
        <Link
          href={`/the-work/${chapters[3].slug}`}
          className="md:col-span-12 h-125 bg-surface-dim relative group overflow-hidden border border-outline-variant/15 cursor-pointer mt-2 block"
        >
          <Image
            src={chapters[3].media?.url}
            alt={chapters[3].title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-3000 ease-out"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
          <div className="absolute bottom-10 left-10 right-10">
            <h4 className="font-display text-2xl md:text-3xl text-on-surface">{chapters[3].title}</h4>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary block mt-1">
              {chapters[3].subtitle}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}