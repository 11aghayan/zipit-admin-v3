"use client";

import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth-actions";

function Logout_Btn() {
  const router = useRouter();
  const pathname = usePathname();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  async function handle_logout() {
    const res = await logout();
    if (!res.success) {
      alert(JSON.stringify(res.messages));
      return;
    }
    search_params.set("pathfrom", pathname.slice(1));
    router.replace(`/login?${search_params.toString()}`);
  }
  
  return (
    <Button 
      type="button"
      onClick={handle_logout}
      variant="destructive"
    >
      <Icon icon="line-md:logout" />
    </Button>
  );
}

export default function Wrapper() {
  return (
    <Suspense>
      <Logout_Btn />
    </Suspense>
  );
} 