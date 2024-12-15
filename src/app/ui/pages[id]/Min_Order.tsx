import { T_Item_Body, T_Item_Variant, T_Min_Order_Unit } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { min_order_unit_map } from "@/lib/utils";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Min_Order({ index, set_item, variant }: Props) {
  return (
    <div className="mt-2 w-full lg:w-1/2">
      <Label className="w-full">
        Նվազագույն պատվերի քանակ
        <Input 
          type="number"
          className="mt-1"
          min={0}
          value={variant.min_order_value.toString() ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, min_order_value: Number(e.target.value || NaN) } : v)
          }))}
        />
      </Label>
      <Label className="w-full">
        Նվազագույն պատվերի միավոր
        <Select
          value={variant.min_order_unit}
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, min_order_unit: val as T_Min_Order_Unit } : v)
          }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Ընտրեք նվազագույն պատվերի միավորը" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pcs">{min_order_unit_map("pcs")}</SelectItem>
            <SelectItem value="cm">{min_order_unit_map("cm")}</SelectItem>
            <SelectItem value="box">{min_order_unit_map("box")}</SelectItem>
            <SelectItem value="roll">{min_order_unit_map("roll")}</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}