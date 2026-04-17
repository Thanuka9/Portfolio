'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const langs = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'si', label: 'සිංහල', short: 'සිං' },
    { code: 'ta', label: 'தமிழ்', short: 'த' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group">
          <Globe size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-2xl border-primary/20 rounded-2xl shadow-2xl p-2 min-w-[140px]">
        {langs.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            className={cn(
              "flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all mb-1 last:mb-0",
              language === lang.code ? "bg-primary text-primary-foreground font-black" : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
            )}
          >
            <span>{lang.label}</span>
            <span className="text-[10px] opacity-60 ml-2 font-mono">{lang.short}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
