import { T_Item_Body, T_Item_Variant } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Description({ index, set_item, variant }: Props) {
  
  return (
    <div className="mt-2 flex flex-col lg:flex-row gap-2">
      <Label className="w-full">
        Description Arm
        <Textarea 
          className="min-h-32 mt-1"
          value={variant.description_am ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, description_am: e.target.value || null } : v)
          }))}
        />
      </Label>
      <Label className="w-full">
        Description Rus
        <Textarea 
          className="min-h-32 mt-1"
          value={variant.description_ru ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, description_ru: e.target.value || null } : v)
          }))}
        />
      </Label>
    </div>
  );
}