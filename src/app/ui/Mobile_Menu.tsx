"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger,  } from "@/components/ui/sheet";
import Logout_Btn from "@/app/ui/Logout_Btn";
import { routes } from "@/lib/routes";
import clsx from "clsx";

export default function Mobile_Menu() {
  const pathname = usePathname();

  const [is_open, set_is_open] = useState(false);
  
  return (
    <Sheet open={is_open} onOpenChange={set_is_open}>
      <SheetTrigger>
        <Icon icon="line-md:menu-fold-left" fontSize={32} />
      </SheetTrigger>
      <SheetContent
        side="right" 
        title="menu"
        className="flex flex-col"
      >
        <SheetTitle>Menu</SheetTitle>
        <section className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-3 mt-6">
            {
              routes.map(({ href, label }) => (
                <Link
                  key={href} 
                  href={href}
                  className={clsx("w-full rounded-md p-2", pathname === `/${href}` ? "bg-accent" : "bg-background")}
                  onClick={() => set_is_open(false)}
                >
                  {label}
                </Link>
              ))
            }
          </div>
          <div className="ml-auto">
            <Logout_Btn />
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}