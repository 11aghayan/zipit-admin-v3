import Image from "next/image";
import clsx from "clsx";

import { T_Item_Body, T_Temp_Variant } from "@/app/types";

import { T_Selected_Photo } from "./Photos";
import Add_Photo_Btn from "./Add_Photo_Btn";

type Props = {
  selected_photo: T_Selected_Photo | undefined,
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>,
  set_selected_photo: React.Dispatch<React.SetStateAction<T_Selected_Photo | undefined>>
}

export default function Photo_List({ set_item, set_selected_photo, variant, selected_photo }: Props) {
  
  return (
    <div className="inline-flex gap-1">
      {
        variant.src.map((image_src, i) => (
          <div
            key={i}
            className={clsx(
              "w-20 h-20 border relative",
              i === selected_photo?.index ? "cursor-default before:absolute before:inset-0 before:z-10 before:bg-white/65" : "cursor-pointer"
            )}
            onClick={() => set_selected_photo({ index: i, src: image_src })}
          >
            <Image 
              src={image_src}
              alt="item photo"
              fill
            />
          </div>
        ))
      }
      <div className="w-20 h-20 border">
        <Add_Photo_Btn
          variant={variant}
          set_item={set_item}
          set_selected_photo={set_selected_photo}
        />
      </div>
    </div>
  );
}