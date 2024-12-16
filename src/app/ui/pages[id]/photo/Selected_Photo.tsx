import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Body, T_Item_Variant } from "@/app/types";
import { Button } from "@/components/ui/button";

import Add_Photo_Btn from "./Add_Photo_Btn";
import { T_Selected_Photo } from "./Photos";

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  selected_photo: T_Selected_Photo | undefined;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
  set_selected_photo: React.Dispatch<React.SetStateAction<T_Selected_Photo | undefined>>
}

export default function Selected_Photo({ selected_photo, index, set_item, set_selected_photo, variant }: Props) {
  function delete_photo() {
    set_item(prev => ({
      ...prev,
      variants: prev.variants.map(v => ({
        ...v,
        src: v.src.filter((_s, i) => i !== selected_photo?.index)
      }))
    }));

    set_selected_photo(variant.src.length > 1 ? { index: 0, src: variant.src[1] } : undefined);
  }
  
  return (
    <div className="relative w-full h-full border aspect-square">
      
      {
        selected_photo ?
        <div>
          <Button 
            className="absolute top-3 left-3 z-10"
            variant="destructive"
            size="icon"
            onClick={delete_photo}
          >
            <Icon icon="ic:round-delete" /> 
          </Button>
          <Image 
            src={selected_photo.src}
            alt="item photo"
            fill
          />
        </div>
        :
        <Add_Photo_Btn 
          index={index}
          set_item={set_item}
          set_selected_photo={set_selected_photo}
        />
      }
    </div>
  );
}