import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Add_Item() {
  
  return (
    <Link href="items/add">
      <Button>
        Ավելացնել ապրանք
      </Button>
    </Link>
  );
};