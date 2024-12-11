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
      <AccordionContent className="flex flex-col gap-2">
        <Category_Selector 
          item={item}
          set_item={set_item}
        />
        <Label className="m-1">
          <p>Հայերեն անվանում</p>
          <Input 
            className="mt-1"
            value={item.name_am}
            onChange={(e) => set_item(prev => ({ ...prev, name_am: e.target.value }))}
          />
        </Label>
        <Label className="m-1">
          <p>Ռուսերեն անվանում</p>
          <Input 
            className="mt-1"
            value={item.name_ru}
            onChange={(e) => set_item(prev => ({ ...prev, name_ru: e.target.value }))}
          />
        </Label>
      </AccordionContent>
    </AccordionItem>
  );
}