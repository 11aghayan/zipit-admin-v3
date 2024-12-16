import Image from "next/image";

import { T_Item_Body } from "@/app/types";

import Add_Photo_Btn from "./Add_Photo_Btn";
import { T_Selected_Photo } from "./Photos";

type Props = {
  selected_photo: T_Selected_Photo | undefined;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
  set_selected_photo: React.Dispatch<React.SetStateAction<T_Selected_Photo | undefined>>
}

export default function Selected_Photo({ selected_photo, index, set_item, set_selected_photo }: Props) {
  return (
    <div className="relative w-full h-full border aspect-square">
      {
        selected_photo ?
        <Image 
          src={selected_photo.src}
          alt="item photo"
          fill
        />
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