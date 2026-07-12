"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react'; // Helper to render Lexical rich text clean

export default function StoryClient({ data }: { data: any }) {
  const [hoverPortrait, setHoverPortrait] = useState(false);

  // Extract media URLs safely
  const defaultPortraitUrl = typeof data.defaultPortrait === 'object' ? data.defaultPortrait.url : '';
  const alternatePortraitUrl = typeof data.alternatePortrait === 'object' ? data.alternatePortrait.url : '';

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-360 mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Dynamic Interactive portrait */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onMouseEnter={() => setHoverPortrait(true)}
            onMouseLeave={() => setHoverPortrait(false)}
            className="w-full aspect-4/5 overflow-hidden relative border border-outline-variant/20 rounded bg-surface-dim cinematic-glow group cursor-pointer"
          >
            {defaultPortraitUrl && (
              <Image
                src={defaultPortraitUrl}
                alt={data.name}
                fill
                priority
                className={`object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 ${
                  hoverPortrait ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            )}

            {alternatePortraitUrl && (
              <Image
                src={alternatePortraitUrl}
                alt={`${data.name} alternate`}
                fill
                className={`object-cover transition-all duration-1000 ease-out grayscale group-hover:grayscale-0 ${
                  hoverPortrait ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-6 left-6 text-on-surface z-10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">{data.name}</span>
              <h4 className="font-display text-sm tracking-widest uppercase mt-0.5">{data.role}</h4>
            </div>
          </div>
          <p className="font-sans text-[10px] text-center text-outline uppercase tracking-widest">
            [ Hover or tap to capture alternate frame ]
          </p>
        </div>

        {/* Right Column: Dynamic Bio contents */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary block">
              The Face Behind the Lens
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-on-surface uppercase tracking-tight leading-tight">
              {data.tagline}
            </h2>
            <div className="w-20 h-[1.5px] bg-primary/40 mt-4" />
          </div>

          {/* Renders your paragraphs beautifully from Payload */}
          <div className="space-y-6 text-sm text-on-surface-variant font-light leading-relaxed tracking-wider prose prose-invert">
            <RichText data={data.biography} />
          </div>

          {/* Stats Indicators Grid */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-outline-variant/10">
            {data.stats?.map((stat: any, i: number) => (
              <div key={i} className="text-center md:text-left">
                <span className="font-display text-3xl md:text-4xl text-primary font-bold block mb-1">
                  {stat.value}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-wider text-outline block leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Philosophies Grid */}
          <div className="space-y-6">
            <h3 className="font-display text-lg text-on-surface tracking-widest uppercase">
              Our Creative Code
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.philosophies?.map((phil: any, idx: number) => (
                <div
                  key={idx}
                  className="p-5 border border-outline-variant/15 rounded bg-surface-dim hover:border-primary/20 transition-all duration-300"
                >
                  <span className="font-mono text-xs text-primary font-bold block mb-2">0{idx + 1}</span>
                  <h4 className="font-display text-sm text-on-surface tracking-wider mb-2 uppercase">{phil.title}</h4>
                  <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed font-light">
                    {phil.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-start">
            <Link
              href="/inquire"
              className="px-12 py-4 border border-primary text-background bg-primary hover:bg-background hover:text-primary transition-all duration-500 font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer inline-block"
            >
              Let’s Tell Yours
            </Link>
          </div>
        </div>

      </div>

      {/* Dynamic Famous Quote Footer */}
      <div className="mt-24 pt-12 border-t border-outline-variant/10 text-center max-w-3xl mx-auto">
        <p className="font-display text-lg sm:text-xl md:text-2xl text-secondary italic font-light leading-relaxed">
          “{data.footerQuote}”
        </p>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mt-4">
          — {data.name?.toUpperCase()}
        </span>
      </div>

    </div>
  );
}