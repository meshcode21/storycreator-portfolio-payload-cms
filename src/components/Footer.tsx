import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ data }: { data: any }) {
    if (!data) return null;

    return (
        <footer className="border-t border-outline-variant/10 bg-surface-dim pt-15 pb-10 px-6 md:px-16 overflow-hidden relative">
            <div className="absolute text-[8vw] font-display font-extrabold text-outline-variant/5 select-none tracking-[0.2em] whitespace-nowrap pointer-events-none uppercase">
                {data.watermarkText}
            </div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left space-y-2">
                    {/* <span className="font-display text-2xl text-on-surface tracking-tighter">{data.brandName}</span> */}
                    <Link
                        href={'/'}
                        className="h-28 relative block" // Added block layout and valid dimensions
                    >
                        <Image
                            src="/primaryLogo.png"
                            alt="stories creator logo"
                            fill
                            priority
                            className="object-contain " // Prevents stretching; aligns logo to the left
                        />
                    </Link>
                    <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest leading-relaxed">
                        {data.tagline}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 font-sans text-xs uppercase tracking-widest">
                    {data.links?.map((link: any, i: number) => (
                        <Link
                            key={i}
                            href={link.url}
                            target='_blank'
                            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="text-center md:text-right font-mono text-[9px] text-outline uppercase tracking-widest">
                    {data.brandName} © {new Date().getFullYear()} — All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}