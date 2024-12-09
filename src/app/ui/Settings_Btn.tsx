import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  variant: "default" | "secondary"
}

export default function Settings_Btn({ variant }: Props) {

  return (
    <Link 
      href="/settings"
    >
      <Button 
        type="button"
        variant={variant}
      >
        <Icon icon="solar:settings-bold" />
      </Button>
    </Link>
  );
}