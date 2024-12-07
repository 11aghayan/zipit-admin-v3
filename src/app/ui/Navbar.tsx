"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { routes } from "@/lib/routes";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {
          routes.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <Link 
                href={href} 
                legacyBehavior 
                passHref
              >
                <NavigationMenuLink
                  className={clsx(navigationMenuTriggerStyle(), pathname === `/${href}` ? "bg-accent" : "bg-background")}
                >
                  {label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))
        }
      </NavigationMenuList>
    </NavigationMenu>
  );
}