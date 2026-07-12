"use client";

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Clapperboard } from 'lucide-react';

export default function ShowreelSection({ data }: { data: any }) {
  // 1. Ref to directly control the HTML5 video element
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Video State Management
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- NEW DATA EXTRACTION LOGIC ---
  // Safely extract data from the related Archive item we setup in Payload
  const archive = data?.archiveItem;

  // Gets the video URL from your archive's text field
  const videoUrl = typeof archive === 'object' ? archive?.media.url : '';

  // Gets the thumbnail image from your archive's media relation
  // const posterUrl = typeof archive?.thumbnail === 'object' ? archive.thumbnail?.url : '';

  // Get the title to show in the player bar
  const videoTitle = typeof archive === 'object' && archive?.title ? archive.title : 'Showreel Portfolio Cut';
  // ---------------------------------

  // 3. Playback Controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // 4. Native Video Event Listeners
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickRatio = clickX / rect.width;

      const newTime = clickRatio * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickRatio * 100);
    }
  };

  // Formatting helper (e.g., 01:25)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If no video URL is provided by the CMS, hide the section entirely
  if (!videoUrl) return null;

  return (
    <section className="py-24 px-6 md:px-16 max-w-360 mx-auto overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary block">
          {data?.subtitle || 'Visual Showreel'}
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-on-surface">
          {data?.title || 'TIMELINESS IN EVERY FRAME'}
        </h2>
        <div className="w-16 h-px bg-outline-variant/60 mx-auto" />
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto relative group cinematic-glow border border-outline-variant/10 bg-black"
      >
        <div className="aspect-video w-full bg-surface-dim relative overflow-hidden">

          {/* Actual HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            // poster={posterUrl}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className={`object-cover object-center w-full h-full transition-all duration-1000 ${isPlaying ? 'brightness-100 scale-100' : 'brightness-75 scale-[1.02]'
              }`}
          />

          <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-black/40 pointer-events-none z-10" />

          {/* Audio Visualization bars when playing */}
          {isPlaying && !isMuted && (
            <div className="absolute top-6 right-6 flex items-end space-x-1 h-6 z-20 bg-background/30 backdrop-blur-md p-2 rounded border border-outline-variant/10">
              <div className="w-1 bg-primary animate-pulse h-4" />
              <div className="w-1 bg-primary animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 bg-primary animate-pulse h-5" style={{ animationDelay: '0.4s' }} />
              <div className="w-1 bg-primary animate-pulse h-3" style={{ animationDelay: '0.1s' }} />
            </div>
          )}

          {/* Big Center Play/Pause Trigger */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <button
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full border border-primary/50 flex items-center justify-center bg-background/40 backdrop-blur-md hover:bg-primary/20 hover:scale-110 hover:border-primary transition-all duration-500 cursor-pointer pointer-events-auto ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            >
              {isPlaying ? (
                <Pause className="text-primary w-8 h-8" />
              ) : (
                <Play className="text-primary w-8 h-8 translate-x-1" />
              )}
            </button>
          </div>

          {/* Bottom Control Bar Panel */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-linear-to-t from-background/95 to-transparent z-20 flex flex-col gap-3 transition-opacity duration-300">
            {/* Seeker Track */}
            <div
              onClick={handleSeek}
              className="w-full h-1 bg-outline-variant/40 hover:h-2 transition-all duration-300 rounded cursor-pointer relative group/track"
            >
              <div
                className="h-full bg-primary relative rounded transition-all duration-100"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-on-surface rounded-full scale-0 group-hover/track:scale-100 transition-transform duration-300" />
              </div>
            </div>

            {/* Media control row */}
            <div className="flex flex-wrap items-center justify-between text-on-surface font-sans text-xs mt-2">
              <div className="flex items-center space-x-4">
                <button onClick={togglePlay} className="p-1 hover:text-primary transition-colors cursor-pointer">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button onClick={handleRestart} className="p-1 hover:text-primary transition-colors cursor-pointer" title="Replay">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <span className="text-on-surface-variant text-[11px] font-mono tracking-wider">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em]">
                <Clapperboard className="w-3.5 h-3.5 text-primary/80" />
                {/* Dynamically displaying the archive title here */}
                <span>{videoTitle}</span>
              </div>

              <div className="flex items-center space-x-4">
                <button onClick={toggleMute} className="p-1 hover:text-primary transition-colors cursor-pointer">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button onClick={handleFullscreen} className="p-1 hover:text-primary transition-colors cursor-pointer" title="Fullscreen">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}