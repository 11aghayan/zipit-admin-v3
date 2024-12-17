import { T_Item_Body, T_Special_Group, T_Temp_Variant } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { special_group_map } from "@/lib/utils";

type Props = {
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>
}

export default function Special_Group({ set_item, variant }: Props) {
  
  return (
    <div className="mt-2 w-full">
      <Label>
        Հատուկ խումբ
        <Select 
          defaultValue={variant.special_group ?? "null"}
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, special_group: val === "null" ? null : val as T_Special_Group }: v) 
          }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue defaultValue={variant.special_group ?? "null"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prm">{special_group_map("prm")}</SelectItem>
            <SelectItem value="new">{special_group_map("new")}</SelectItem>
            <SelectItem value="liq">{special_group_map("liq")}</SelectItem>
            <SelectItem value="null">{special_group_map(null)}</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}