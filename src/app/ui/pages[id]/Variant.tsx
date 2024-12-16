import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Body, T_Item_Variant } from "@/app/types";
import { AccordionContent, AccordionItem, Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { size_unit_map } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Photo from "./photo/Photos";
import Color from "./Color";
import Size from "./Size";
import Min_Order from "./Min_Order";
import Price_Promo from "./Price_Promo";
import Special_Group from "./Special_Group";
import Available from "./Available";
import Description from "./Description";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>,
  index: number,
  variants_count: number
}

export default function Variant({ set_item, variant, index, variants_count }: Props) {
  function delete_variant() {
    if ("photo_id" in variant) {
      set_item(prev => ({
        ...prev,
        variants: prev.variants.map((v, i) => {
          if (i !== index) return v;
          return {
            ...v,
            delete: true
          }
        })
      }));
    } else {
      set_item(prev => ({
        ...prev,
        variants: prev.variants.filter((_v, i) => i !== index)
      }))
    }
    
  }
  
  return (
    <Accordion
      type="single"
      collapsible
    >
      <AccordionItem value={index.toString()}>
        <AccordionTrigger>
          <div>
            <span className="w-fit font-bold">
              Տարբերակ {index + 1 + " | "}
            </span>
            {variant.size_value}{size_unit_map(variant.size_unit)+" / "}
            {variant.color_am}{" "}
          </div>

        </AccordionTrigger>
        <AccordionContent>
          <div className="pt-4 sm:flex gap-4">
            <Photo 
              variant={variant}
              set_item={set_item}
              index={index}
            />
            <div className="w-full p-1">
              <Color 
                variant={variant}
                set_item={set_item}
                index={index}
              />
              <div className="flex flex-col gap-1 lg:flex-row">
                <Size 
                  variant={variant}
                  set_item={set_item}
                  index={index}
                />
                <Min_Order 
                  variant={variant}
                  set_item={set_item}
                  index={index}
                />
              </div>
              <Price_Promo 
                variant={variant}
                set_item={set_item}
                index={index}
              />
              <div className="w-full flex flex-col gap-1 sm:flex-row">
                <Special_Group 
                  variant={variant}
                  set_item={set_item}
                  index={index}
                />
                <Available 
                  variant={variant}
                  set_item={set_item}
                  index={index} 
                />
              </div>
              <Description 
                variant={variant}
                set_item={set_item}
                index={index}
              />
            </div>
          </div>
          {
              variants_count > 1
              ?
              <Button
                type="button"
                variant="destructive"
                className="w-full mt-2"
                size="default"
                onClick={delete_variant}
              > 
                <Icon icon="ic:round-delete" />
              </Button>
               :
              null
            }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const new_variant = {
  src: [],
  available: 1,
  color_am: "",
  color_ru: "",
  description_am: "",
  description_ru: "",
  min_order_unit: "pcs",
  min_order_value: 1,
  price: 0,
  promo: null,
  size_unit: "mm",
  size_value: 0,
  special_group: null
} as T_Item_Variant;