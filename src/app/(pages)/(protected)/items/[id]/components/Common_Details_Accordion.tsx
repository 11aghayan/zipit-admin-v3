import { T_Item_Body } from "@/app/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Category_Selector from "./Category_Selector";

type Props = {
  item: T_Item_Body<"add" | "edit">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
}

export default function Common_Details_Accordion({ item, set_item }: Props) {
  
  return (
    <AccordionItem 
      value="common-details"
    >
      <AccordionTrigger>Ընդհանուր մանրամասներ</AccordionTrigger>
      <AccordionContent>
        <Category_Selector 
          item={item}
          set_item={set_item}
        />
      </AccordionContent>
    </AccordionItem>
  );
}