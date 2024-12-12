import { T_Item_Body, T_Item_Variant } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Available({ index, set_item, variant }: Props) {
  
  return (
    <div className="w-full mt-2">
      <Label>
        Առկայություն
        <Select
          defaultValue={variant.available.toString() }
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, available: Number(val) }: v) 
          }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue defaultValue={variant.available.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Առկա է</SelectItem>
            <SelectItem value="0">Առկա չէ</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}