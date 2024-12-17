import { T_Item_Body, T_Temp_Variant } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>
}

export default function Available({ set_item, variant }: Props) {
  
  return (
    <div className="w-full mt-2">
      <Label>
        Առկայություն
        <Select
          defaultValue={variant.available.toString() }
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, available: Number(val) }: v) 
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