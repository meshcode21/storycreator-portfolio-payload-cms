"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MOTIONS, STILLS } from '@/data';
import { MotionItem } from '@/types';
import { Play, MapPin, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function ArchivesClient() {
  const [activeView, setActiveView] = useState<'motion' | 'stills'>('motion');

  // Lightbox States
  const [selectedStillIndex, setSelectedStillIndex] = useState<number | null>(null);
  const [activeFilm, setActiveFilm] = useState<MotionItem | null>(null);
  const [filmIsPlaying, setFilmIsPlaying] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (activeFilm && filmIsPlaying) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
      }, 500);
    } else {
      setSimulatedProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeFilm, filmIsPlaying]);

  const handleNextStill = () => {
    if (selectedStillIndex !== null) {
      setSelectedStillIndex((selectedStillIndex + 1) % STILLS.length);
    }
  };

  const handlePrevStill = () => {
    if (selectedStillIndex !== null) {
      setSelectedStillIndex((selectedStillIndex - 1 + STILLS.length) % STILLS.length);
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-360 mx-auto min-h-screen">

      {/* Editorial Title */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary block">
          The Vault
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-on-surface tracking-tight uppercase">
          The Archives
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed tracking-wider font-light">
          A curated collection of motion and still frames. Captured through the lens of atmospheric storytelling.
        </p>

        {/* Dynamic Category Toggles */}
        <div className="pt-10 flex justify-center items-center space-x-12">
          <button
            onClick={() => setActiveView('motion')}
            className={`font-sans text-xs uppercase tracking-[0.35em] transition-all pb-2 relative cursor-pointer ${activeView === 'motion' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
          >
            [ Motion ]
            {activeView === 'motion' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary animate-fade-in" />
            )}
          </button>

          <button
            onClick={() => setActiveView('stills')}
            className={`font-sans text-xs uppercase tracking-[0.35em] transition-all pb-2 relative cursor-pointer ${activeView === 'stills' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
          >
            [ Stills ]
            {activeView === 'stills' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* --- MOTION SECTION --- */}
      {activeView === 'motion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto animate-fade-in">
          {MOTIONS.map((motion) => (
            <div
              key={motion.id}
              onClick={() => {
                setActiveFilm(motion);
                setFilmIsPlaying(true);
              }}
              className="group cursor-pointer relative cinematic-glow border border-outline-variant/10 rounded overflow-hidden bg-surface-dim transition-all duration-500 hover:border-primary/40"
            >
              {/* Image Preview frame */}
              <div className="aspect-video w-full overflow-hidden relative">
                <Image
                  src={motion.imageUrl}
                  alt={motion.title}
                  fill
                  className="object-cover transition-transform duration-1500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/15 transition-all duration-500">
                    <Play className="w-5 h-5 text-primary translate-x-0.5" />
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-widest text-on-surface border border-outline-variant/20 z-10">
                  {motion.duration}
                </div>
              </div>

              {/* Info Frame */}
              <div className="p-6 flex justify-between items-center bg-surface-dim">
                <div>
                  <h4 className="font-display text-lg text-on-surface tracking-wider">{motion.title}</h4>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-primary">{motion.category}</span>
                </div>
                <span className="font-mono text-[11px] text-outline tracking-widest">{motion.year}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- STILLS MASONRY SECTION --- */}
      {activeView === 'stills' && (
        <div className="stills-masonry max-w-6xl mx-auto animate-fade-in">
          {STILLS.map((still, idx) => (
            <div
              key={still.id}
              onClick={() => setSelectedStillIndex(idx)}
              className="stills-masonry-item group cursor-pointer relative overflow-hidden border border-outline-variant/15 rounded bg-surface-dim cinematic-glow transition-all duration-500 hover:border-primary/30"
            >
              <div className={`${still.aspectRatio} w-full overflow-hidden relative`}>
                <Image
                  src={still.imageUrl}
                  alt={still.altText}
                  fill
                  className="object-cover transition-transform duration-2000 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Full Overlay on Hover */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-10">
                  <div className="flex items-center space-x-2 text-[10px] text-primary uppercase tracking-widest mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>{still.location}</span>
                  </div>
                  <h4 className="font-display text-base text-on-surface">{still.title}</h4>

                  <span className="absolute top-4 right-4 text-on-surface/60 bg-background/40 p-2 rounded-full backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- STILLS LIGHTBOX MODAL --- */}
      {selectedStillIndex !== null && (
        <div className="fixed inset-0 bg-background/95 frosted-nav z-50 flex flex-col justify-between items-center py-6 px-4 md:py-10">
          {/* Header row */}
          <div className="w-full max-w-6xl flex justify-between items-center text-on-surface-variant font-sans text-xs uppercase tracking-widest">
            <span>Stills Portfolio ({selectedStillIndex + 1} / {STILLS.length})</span>
            <button
              onClick={() => setSelectedStillIndex(null)}
              className="p-2 hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Stage Frame */}
          <div className="flex-1 w-full max-w-5xl flex items-center justify-between gap-4">
            <button
              onClick={handlePrevStill}
              className="p-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-surface-dim/20 hover:bg-surface-dim/60 rounded-full border border-outline-variant/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Target Still — plain img on purpose, see note below */}
            <div className="max-h-[70vh] max-w-[80vw] flex justify-center items-center overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={STILLS[selectedStillIndex].imageUrl}
                alt={STILLS[selectedStillIndex].altText}
                className="max-h-[70vh] object-contain transition-all duration-700 animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              onClick={handleNextStill}
              className="p-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-surface-dim/20 hover:bg-surface-dim/60 rounded-full border border-outline-variant/10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption row */}
          <div className="text-center space-y-2 max-w-xl">
            <h3 className="font-display text-xl text-on-surface tracking-wide">
              {STILLS[selectedStillIndex].title}
            </h3>
            <div className="flex items-center justify-center space-x-2 text-xs text-primary uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{STILLS[selectedStillIndex].location}</span>
            </div>
            <p className="text-xs text-on-surface-variant font-light italic mt-2 px-6">
              &ldquo;{STILLS[selectedStillIndex].altText}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* --- MOTION THEATER MODAL --- */}
      {activeFilm && (
        <div className="fixed inset-0 bg-background/95 frosted-nav z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl border border-outline-variant/20 rounded bg-surface-dim relative overflow-hidden flex flex-col">

            {/* Control Header */}
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/10 bg-background/80 text-on-surface">
              <span className="font-display text-sm tracking-widest text-primary uppercase">{activeFilm.title} ({activeFilm.category})</span>
              <button
                onClick={() => setActiveFilm(null)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Stage */}
            <div className="aspect-video w-full relative overflow-hidden">
              <Image
                src={activeFilm.imageUrl}
                alt={activeFilm.title}
                fill
                className="object-cover transition-all duration-1000"
                style={{ filter: filmIsPlaying ? 'brightness(0.9) contrast(1.05)' : 'brightness(0.4) blur(2px)' }}
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/35 z-10" />

              {filmIsPlaying ? (
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-on-surface z-20 pointer-events-none">
                  <div className="bg-background/80 px-4 py-2 border border-primary/20 backdrop-blur-md rounded">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary block mb-1">Interactive Screening Mode</span>
                    <span className="font-mono text-xs">{activeFilm.title} is playing...</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button
                    onClick={() => setFilmIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 translate-x-0.5" />
                  </button>
                </div>
              )}

              {/* Bottom Seeker line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-outline-variant/40 z-20">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${simulatedProgress}%` }}
                />
              </div>
            </div>

            {/* Cinema Action Panel */}
            <div className="p-4 bg-background/95 flex justify-between items-center text-xs text-on-surface-variant font-sans">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setFilmIsPlaying(!filmIsPlaying)}
                  className="text-primary hover:text-primary-container transition-colors cursor-pointer"
                >
                  {filmIsPlaying ? 'PAUSE FILM' : 'RESUME FILM'}
                </button>
                <span>|</span>
                <span className="font-mono text-[10px] tracking-wider">DURATION: {activeFilm.duration}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-outline">Julian Vance Productions ©</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}