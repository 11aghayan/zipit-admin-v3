"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/lib/routes";
import Search from "@/app/ui/Search";
import Logout_Btn from "@/app/ui/Logout_Btn";
import { Button } from "@/components/ui/button";
import Settings_Btn from "@/app/ui/Settings_Btn";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <div className="flex bg-foreground justify-between p-3 gap-1">
      <nav className="flex gap-2">
        {
          routes.map(({ href, label}) => (
            <Button 
              key={href}
              variant={pathname === `/${href}` ? "default" : "secondary"}
              className="px-0 py-0"
            >
              <Link 
                href={href}
                className="px-4 py-2"
              >
                {label}
              </Link>
            </Button>
          ))
        }
      </nav>
      <Search />
      <div className="space-x-1">
        <Settings_Btn variant="secondary" />
        <Logout_Btn />
      </div>
    </div>
  );
}