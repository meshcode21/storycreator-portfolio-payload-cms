"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavType = {
  label: string;
  href: string;
  id?: string;
};

export default function Header({ data }: { data: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // FIX: Automatically close the mobile menu whenever the page path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const brandName = data?.brandName || 'StoryCreator';
  const navItems: NavType[] = data?.navItems || [];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-md backdrop-saturate-150 border-b border-outline-variant/10 transition-all duration-500">
      <div className="w-full px-6 md:px-16 py-5 max-w-7xl mx-auto">

        {/* Main Bar Content */}
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-display text-2xl text-on-surface tracking-tighter hover:text-primary transition-colors cursor-pointer"
          >
            {brandName}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id || item.href}
                  href={item.href}
                  className={`font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 cursor-pointer ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-px bg-primary animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-on-surface hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Container */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-outline-variant/10 animate-fade-in">
            <div className="flex flex-col items-center gap-5 py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id || item.href}
                    href={item.href}
                    className={`font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-1 cursor-pointer ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}