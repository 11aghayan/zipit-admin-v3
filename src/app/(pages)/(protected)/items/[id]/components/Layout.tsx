import { T_Item_Body } from "@/app/types";
import { Accordion } from "@/components/ui/accordion";
import Common_Details_Accordion from "./Common_Details_Accordion";

type Props = {
  item: T_Item_Body<"add" | "edit">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
}

export default function Layout({ item, set_item }: Props) {
  
  return (
    <div>
      <Accordion type="single" collapsible>
        <Common_Details_Accordion 
          set_item={set_item}
          item={item}
        />
      </Accordion>
    </div>
  );
}