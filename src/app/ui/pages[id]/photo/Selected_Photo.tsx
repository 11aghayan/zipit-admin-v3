import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Body, T_Temp_Variant } from "@/app/types";
import { Button } from "@/components/ui/button";

import Add_Photo_Btn from "./Add_Photo_Btn";
import { T_Selected_Photo } from "./Photos";

type Props = {
  variant: T_Temp_Variant,
  selected_photo: T_Selected_Photo | undefined,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>,
  set_selected_photo: React.Dispatch<React.SetStateAction<T_Selected_Photo | undefined>>
}

export default function Selected_Photo({ selected_photo, set_item, set_selected_photo, variant }: Props) {
  function delete_photo() {
    set_selected_photo(
      variant.src[(selected_photo?.index as number) + 1] 
      ? 
      { index: selected_photo?.index as number, src: variant.src[(selected_photo?.index as number) + 1] } 
      : 
      variant.src[(selected_photo?.index as number) - 1] 
      ? 
      { index: (selected_photo?.index as number) - 1, src: variant.src[(selected_photo?.index as number) - 1] }
      :
      variant.src.length > 1 ? { index: 0, src: variant.src[0] } 
      : 
      undefined
    )
    
    set_item(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.temp_id === variant.temp_id ? ({
        ...v,
        src: v.src.filter((_s, i) => i !== selected_photo?.index)
      }) : v)
    }));
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
          variant={variant}
          set_item={set_item}
          set_selected_photo={set_selected_photo}
        />
      }
    </div>
  );
}