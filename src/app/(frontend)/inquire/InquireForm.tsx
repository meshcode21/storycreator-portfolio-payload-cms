"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { submitInquiry } from './actions';

export default function InquireForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !date || !location || !message) {
      setError('Please share all parameters. Every detail counts toward crafting a bespoke legacy.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitInquiry({ name, date, location, message });

        if (result.success) {
          setSuccess(true);
          setName('');
          setDate('');
          setLocation('');
          setMessage('');

          setTimeout(() => setSuccess(false), 6000);
        }
      } catch {
        setError('Something went wrong submitting your inquiry. Please try again.');
      }
    });
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-16 max-w-360 mx-auto min-h-screen">

      {/* Editorial Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start max-w-6xl mx-auto">

        {/* Left Column: Visual Media and contacts */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary block">
              Inquire
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-on-surface uppercase tracking-tight leading-tight">
              Let&rsquo;s Tell Your Story
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant leading-relaxed tracking-wider font-light">
              Every cinematic journey begins with a conversation. Share your vision below, and let&rsquo;s craft a visual legacy that transcends time.
            </p>
          </div>

          {/* Retro camera on tripod grayscale */}
          <div className="aspect-4/5 w-full overflow-hidden border border-outline-variant/15 rounded bg-surface-dim cinematic-glow relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXVoqQPh8Mo-GnHT8yTzq6PR3vKETwTrNfWiwzy6HwL86eb4UrKgyGbecK_ap9YxuPbhUMZPN_faqwbAOKttuJmZ8JXvmw4cvnEm0GSip3piCJMPerNStvOpf_8XHLj3aj0krTqc88_g9UXNeld_JSeBkQlpb7iNubJuHqIMbLG8rUvcITZ4djm6nwwplPjQC0J8j_zCK_4knfYiO1331IDtuO6XGGI3m-AjBCuyVsgInhe4ur3oAmqKDp1jchAf9OgZWKrh0T_lA5"
              alt="Retro cinema camera on tripod in dramatic grayscale studio environment"
              fill
              className="object-cover grayscale brightness-95 hover:grayscale-0 hover:scale-102 transition-all duration-2000"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Direct contacts info */}
          <div className="pt-4 border-t border-outline-variant/10 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-primary">Direct Studio Connections</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-on-surface-variant font-light">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@storycreator.film</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Paris — Florence — Amalfi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="lg:col-span-7 bg-surface-dim/30 p-8 md:p-12 border border-outline-variant/10 rounded cinematic-glow">

          {/* Form Header */}
          <div className="mb-10">
            <h3 className="font-display text-xl text-on-surface tracking-widest uppercase mb-2">Reserve Your Date</h3>
            <span className="font-sans text-[10px] uppercase tracking-widest text-outline">All fields are meticulously archived.</span>
          </div>

          {success && (
            <div className="mb-8 p-6 bg-primary/10 border border-primary text-primary rounded animate-fade-in text-center space-y-2">
              <span className="font-display text-lg tracking-wider block uppercase font-bold">Inquiry archived successfully!</span>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Thank you. Julian Vance has received your storytelling brief. We will reach out to you within 24 hours to schedule a private video consultation.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-950/20 border border-red-500/50 text-red-300 rounded text-xs leading-relaxed font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field: Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-widest text-primary">01 // Your Full Names</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Evelyn Adams & James Parker"
                className="w-full bg-background border border-outline-variant/30 px-4 py-3 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            {/* Field: Date */}
            <div className="space-y-2">
              <label htmlFor="date" className="block text-[11px] font-mono uppercase tracking-widest text-primary">02 // Projected Date of Event</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-background border border-outline-variant/30 px-4 py-3 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            {/* Field: Location */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-[11px] font-mono uppercase tracking-widest text-primary">03 // Ceremony & Celebration Venue</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Villa d&rsquo;Este, Lake Como, Italy"
                className="w-full bg-background border border-outline-variant/30 px-4 py-3 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary transition-colors duration-300"
              />
            </div>

            {/* Field: Tell us more */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-[11px] font-mono uppercase tracking-widest text-primary">04 // Tell Us More (Your Story Vision)</label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe the mood, color palette, and key emotional chapters you hope to archive in your film..."
                className="w-full bg-background border border-outline-variant/30 px-4 py-3 text-xs tracking-wider text-on-surface focus:outline-none focus:border-primary transition-colors duration-300 resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-background border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-500 font-sans text-xs uppercase tracking-[0.2em] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '[ Submitting... ]' : '[ Submit Inquiry Reservation ]'}
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}