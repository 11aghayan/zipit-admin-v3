"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth-actions";
import { useRouter } from "next/navigation";


export default function Logout_Btn() {
  const router = useRouter();
  
  async function handle_logout() {
    const res = await logout();
    if (!res.success) {
      alert("Logout error");
      return;
    }

    router.refresh();
  }
  
  return (
    <Button 
      type="button"
      onClick={handle_logout}
      variant="default"
    >
      <Icon icon="line-md:logout" />
    </Button>
  );
}