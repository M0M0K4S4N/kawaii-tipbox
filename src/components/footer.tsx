"use client";

import React from 'react';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <a
            href="https://github.com/M0M0K4S4N/tipbox-styler"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5",
              "rounded-full text-sm font-medium",
              "bg-secondary text-secondary-foreground",
              "hover:bg-secondary/80 transition-colors",
              "border border-border/50 shadow-sm"
            )}
          >
            <Github className="w-4 h-4" />
            <span>Made with ❤️, Source opened on M0M0K4S4N/tipbox-styler</span>
          </a>
        </div>
      </div>
    </footer>
  );
};