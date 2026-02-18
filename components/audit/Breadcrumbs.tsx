"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-8 px-4">
      <Link href="/" className="hover:text-gold-500 transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 opacity-30" />
          {item.href ? (
            <Link href={item.href} className="hover:text-gold-500 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
