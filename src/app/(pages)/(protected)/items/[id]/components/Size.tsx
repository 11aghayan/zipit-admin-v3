import { T_Item_Body, T_Item_Variant, T_Size_Unit } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { size_unit_map } from "@/lib/utils";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Size({ index, set_item, variant }: Props) {
  return (
    <div className="mt-2 w-full lg:w-1/2">
      <Label className="w-full">
        Չափի արժեք
        <Input 
          type="number"
          className="mt-1"
          min={0}
          value={variant.size_value.toString() ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, size_value: Number(e.target.value || NaN) } : v)
          }))}
        />
      </Label>
      <Label className="w-full">
        Չափի միավոր
        <Select
          value={variant.size_unit}
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, size_unit: val as T_Size_Unit } : v)
          }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Ընտրեք չափի միավորը" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mm">{size_unit_map("mm")}</SelectItem>
            <SelectItem value="cm">{size_unit_map("cm")}</SelectItem>
            <SelectItem value="m">{size_unit_map("m")}</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}