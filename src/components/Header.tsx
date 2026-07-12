"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

// Define the type based on our Payload schema
type NavType = {
  label: string;
  href: string;
  id?: string;
};

export default function Header({ data }: { data: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fallback data just in case it hasn't been saved in CMS yet
  const brandName = data?.brandName || 'StoryCreator';
  const navItems: NavType[] = data?.navItems || [];

  function NavList({ items }: { items: NavType[] }) {
    return (
      items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.id || item.href}
            href={item.href}
            className={`font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 cursor-pointer ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-px bg-primary animate-fade-in" />
            )}
          </Link>
        )
      })
    )
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-md backdrop-saturate-150 border-b border-outline-variant/10 transition-all duration-500">
      <div className="w-full px-6 md:px-16 py-5 max-w-360 md:flex justify-between">
        {/* Brand Logo */}
        <div className='w-full flex justify-between items-center'>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-2xl text-on-surface tracking-tighter hover:text-primary transition-colors cursor-pointer"
          >
            {brandName}
          </Link>

          {/* Action Items / Admin Inbox Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-10'>
            <NavList items={navItems} />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden ${mobileMenuOpen ? 'md:flex' : 'hidden'} gap-4`}>
          <div className='flex flex-col items-center gap-4 mt-3'>
            <NavList items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}