import { T_Item_Body, T_Item_Variant, T_Temp_Variant } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>
}

export default function Price_Promo({ variant, set_item }: Props) {
  return (
    <div className="mt-2 flex gap-1">
      <Label className="w-full">
        Գին
        <Input 
          className="mt-1"
          type="number"
          min={1}
          value={variant?.price.toString() ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, price: Number(e.target.value || NaN) } : v)
          }))}
        />
      </Label>
      <Label className="w-full">
        Զեղչ
        <Input 
          className="mt-1"
          type="number"
          min={0}
          value={variant?.promo?.toString() ?? ""}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, promo: e.target.value === "0" || e.target.value === "" ? null : Number(e.target.value || NaN) } : v)
          }))}
        />
      </Label>
    </div>
  );
}