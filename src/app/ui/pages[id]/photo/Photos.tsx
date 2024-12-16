import { useState } from 'react';

import { T_Item_Body, T_Item_Variant } from '@/app/types';

import Selected_Photo from './Selected_Photo';
import Photo_List from './Photo_List';

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export type T_Selected_Photo = {
  index: number;
  src: string;
};

export default function Photos({ variant, set_item, index }: Props) {
  const [selected_photo, set_selected_photo] = useState<T_Selected_Photo | undefined>(variant.src.length > 0 ? { index: 0, src: variant.src[0] } : undefined);
  
  
  
  return (
    <div className='w-full max-w-[500px] space-y-2 self-start mx-auto'>
      <Selected_Photo 
        index={index}
        selected_photo={selected_photo}
        set_item={set_item}
        set_selected_photo={set_selected_photo}
      />
    <Photo_List 
      index={index}
      selected_photo={selected_photo}
      set_item={set_item}
      set_selected_photo={set_selected_photo}
      variant={variant}
    />
    </div>
  );
}