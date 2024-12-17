import { T_Item_Body, T_Temp_Variant } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>
}

export default function Color({ variant, set_item }: Props) {
  return (
    <div className="mt-2 sm:mt-0 md:flex gap-1">
      <Label className="w-full">
        Գույնը՝ հայերեն
        <Input 
          className="mt-1"
          type="text"
          value={variant.color_am}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, color_am: e.target.value } : v)
          }))}
        />
      </Label>
      <Label className="w-full">
        Գույնը՝ ռուսերեն
        <Input 
          className="mt-1"
          type="text"
          value={variant.color_ru}
          onChange={e => set_item(prev => ({ 
            ...prev, 
            variants: prev.variants.map(v => v.temp_id === variant.temp_id ? { ...v, color_ru: e.target.value } : v)
          }))}
        />
      </Label>
    </div>
  );
}