import { T_Item_Body, T_Item_Variant, T_Special_Group } from "@/app/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { special_group_map } from "@/lib/utils";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Special_Group({ set_item, variant, index }: Props) {
  
  return (
    <div className="mt-2 w-full">
      <Label>
        Հատուկ խումբ
        <Select 
          defaultValue={variant.special_group ?? "null"}
          onValueChange={val => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map((v, i) => i === index ? { ...v, special_group: val === "null" ? null : val as T_Special_Group }: v) 
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