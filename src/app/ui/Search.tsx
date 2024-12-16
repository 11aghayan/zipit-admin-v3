"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense, useCallback } from 'react';

import { Input } from '@/components/ui/input';

function Search() {
  const search_params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  let timeout_id: NodeJS.Timeout;

  const handle_change = useCallback((text: string) => {
    text = text.length > 100 ? text.slice(0, 100) : text;
    
    const params = new URLSearchParams(search_params.toString());
    params.set("search", text);
    if (!params.get("search")) {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [search_params]);
  
  return (
    <div 
      className="relative w-full max-w-56"
      style={{
        display: pathname === "/items" ? "block" : "none"
      }}
    >
      <Icon 
        icon="line-md:search" 
        className="absolute top-1/2 -translate-y-1/2 right-2"
      />
      <Input 
        type="text"
        aria-label="items search input"
        placeholder="Որոնել ապրանքներ..."
        defaultValue={search_params.get("search") || ""}
        className="pr-8 bg-background"
        onChange={(e) => {
          clearTimeout(timeout_id);
          timeout_id = setTimeout(() => {
            handle_change(e.target.value)
          }, 500);
        }}
      />
    </div>
  );
}

export default function Wrapper() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}