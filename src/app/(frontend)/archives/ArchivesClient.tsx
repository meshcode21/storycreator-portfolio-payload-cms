// ArchivesClient.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, MapPin, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Masonry from 'react-masonry-css';
import './Gallery.css'

export default function ArchivesClient({ pageData }: { pageData: any }) {
  const [activeView, setActiveView] = useState<'motion' | 'stills'>('motion');

  // --- Extract Curated Arrays & CMS Content ---
  const {
    subTitle = 'The Vault',
    heroTitle = 'The Archives',
    heroDescription = 'A curated collection of motion and still frames.',
    motion: rawMotion = [],
    stills: rawStills = []
  } = pageData || {};

  // Safeguard against unpopulated relationship arrays
  const motions = rawMotion.filter((item: any) => typeof item === 'object' && item !== null);
  const stills = rawStills.filter((item: any) => typeof item === 'object' && item !== null);

  // Lightbox States
  const [selectedStillIndex, setSelectedStillIndex] = useState<number | null>(null);

  // Motion Theater States
  const [activeFilm, setActiveFilm] = useState<any | null>(null);
  const [filmIsPlaying, setFilmIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video playback in the modal
  useEffect(() => {
    if (videoRef.current) {
      if (filmIsPlaying) {
        videoRef.current.play().catch(() => setFilmIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [filmIsPlaying, activeFilm]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setVideoProgress(total > 0 ? (current / total) * 100 : 0);
    }
  };

  const handleNextStill = () => {
    if (selectedStillIndex !== null && stills.length > 0) {
      setSelectedStillIndex((selectedStillIndex + 1) % stills.length);
    }
  };

  const handlePrevStill = () => {
    if (selectedStillIndex !== null && stills.length > 0) {
      setSelectedStillIndex((selectedStillIndex - 1 + stills.length) % stills.length);
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-7xl mx-auto min-h-screen">
      {/* Editorial Title - Loaded dynamically from CMS Global Config */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary block">
          {subTitle}
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-on-surface tracking-tight uppercase">
          {heroTitle}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed tracking-wider font-light">
          {heroDescription}
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
          {motions.map((motion: any) => (
            <div
              key={motion.id}
              onClick={() => {
                setActiveFilm(motion);
                setFilmIsPlaying(true);
              }}
              className="group cursor-pointer relative cinematic-glow border border-outline-variant/10 rounded overflow-hidden bg-surface-dim transition-all duration-500 hover:border-primary/40"
            >
              <div className="aspect-video w-full overflow-hidden relative bg-black">
                {motion.media?.url && (
                  <video
                    src={motion.media.url}
                    muted
                    playsInline
                    className="object-cover w-full h-full transition-transform duration-1500 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all flex items-center justify-center z-10">
                  <span className="w-14 h-14 rounded-full border border-primary/40 flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:scale-110 group-hover:border-primary group-hover:bg-primary/15 transition-all duration-500">
                    <Play className="w-5 h-5 text-primary translate-x-0.5" />
                  </span>
                </div>
              </div>

              {/* Info Frame */}
              <div className="p-6 flex justify-between items-center bg-surface-dim">
                <div>
                  <h4 className="font-display text-lg text-on-surface tracking-wider">{motion.title}</h4>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-primary">{motion.subtitle || 'Cinematic Film'}</span>
                </div>
                {motion.createdAt && (
                  <span className="font-mono text-[11px] text-outline tracking-widest">
                    {new Date(motion.createdAt).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          ))}
          {motions.length === 0 && <p className="text-center col-span-2 text-outline py-12">No curated motion clips chosen.</p>}
        </div>
      )}

      {/* --- STILLS MASONRY SECTION --- */}
      {activeView === 'stills' && (
        <div className="max-w-6xl mx-auto animate-fade-in px-4">
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {stills.map((still: any, idx: number) => {
              const imageAspectRatio = still.media?.width && still.media?.height
                ? `${still.media.width} / ${still.media.height}`
                : '3 / 2';

              return (
                <div
                  key={still.id}
                  onClick={() => setSelectedStillIndex(idx)}
                  className="gallery-item group cursor-pointer relative border border-outline-variant/15 rounded bg-surface-dim cinematic-glow transition-all duration-500 hover:border-primary/30 mb-4 break-inside-avoid"
                >
                  <div
                    className="w-full overflow-hidden relative rounded"
                    style={{ aspectRatio: imageAspectRatio }}
                  >
                    {still.media?.url && (
                      <Image
                        src={still.media.url}
                        alt={still.media?.alt || still.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={idx < 4}
                      />
                    )}

                    {/* Full Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 z-10">
                      <div className="flex items-center space-x-2 text-[10px] text-primary uppercase tracking-widest mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{still.subtitle || 'Location'}</span>
                      </div>
                      <h4 className="font-display text-base text-white">{still.title}</h4>

                      <span className="absolute top-4 right-4 text-white/80 bg-black/40 p-2 rounded-full backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Masonry>

          {stills.length === 0 && (
            <p className="text-center text-outline py-12">No curated still frames chosen.</p>
          )}
        </div>
      )}

      {/* --- STILLS LIGHTBOX MODAL --- */}
      {selectedStillIndex !== null && stills[selectedStillIndex] && (
        <div className="fixed inset-0 bg-background/95 frosted-nav z-50 flex flex-col justify-between items-center py-6 px-4 md:py-10">
          <div className="w-full max-w-6xl flex justify-between items-center text-on-surface-variant font-sans text-xs uppercase tracking-widest">
            <span>Stills Portfolio ({selectedStillIndex + 1} / {stills.length})</span>
            <button
              onClick={() => setSelectedStillIndex(null)}
              className="p-2 hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 w-full max-w-5xl flex items-center justify-between gap-4">
            <button
              onClick={handlePrevStill}
              className="p-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-surface-dim/20 hover:bg-surface-dim/60 rounded-full border border-outline-variant/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] max-w-[80vw] flex justify-center items-center overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stills[selectedStillIndex].media?.url}
                alt={stills[selectedStillIndex].media?.alt || stills[selectedStillIndex].title}
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

          <div className="text-center space-y-2 max-w-xl">
            <h3 className="font-display text-xl text-on-surface tracking-wide">
              {stills[selectedStillIndex].title}
            </h3>
            <div className="flex items-center justify-center space-x-2 text-xs text-primary uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5" />
              <span>{stills[selectedStillIndex].subtitle}</span>
            </div>
            {stills[selectedStillIndex].media?.alt && (
              <p className="text-xs text-on-surface-variant font-light italic mt-2 px-6">
                &ldquo;{stills[selectedStillIndex].media.alt}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      {/* --- MOTION THEATER MODAL --- */}
      {activeFilm && (
        <div className="fixed inset-0 bg-background/95 frosted-nav z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl border border-outline-variant/20 rounded bg-surface-dim relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-outline-variant/10 bg-background/80 text-on-surface">
              <span className="font-display text-sm tracking-widest text-primary uppercase">{activeFilm.title} ({activeFilm.subtitle})</span>
              <button
                onClick={() => {
                  setActiveFilm(null);
                  setFilmIsPlaying(false);
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full relative overflow-hidden bg-black">
              {activeFilm.media?.url && (
                <video
                  ref={videoRef}
                  src={activeFilm.media.url}
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setFilmIsPlaying(false)}
                  className={`object-cover w-full h-full transition-all duration-1000 ${filmIsPlaying ? 'brightness-100 blur-none' : 'brightness-50 blur-sm'
                    }`}
                />
              )}

              {!filmIsPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button
                    onClick={() => setFilmIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-6 h-6 translate-x-0.5" />
                  </button>
                </div>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-outline-variant/40 z-20">
                <div
                  className="h-full bg-primary transition-all duration-100"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-background/95 flex justify-between items-center text-xs text-on-surface-variant font-sans">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setFilmIsPlaying(!filmIsPlaying)}
                  className="text-primary hover:text-primary-container transition-colors cursor-pointer"
                >
                  {filmIsPlaying ? 'PAUSE FILM' : 'RESUME FILM'}
                </button>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-outline">StoryCreator Productions ©</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}