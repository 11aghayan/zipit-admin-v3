import { useState } from 'react';

import { T_Item_Body, T_Temp_Variant } from '@/app/types';

import Selected_Photo from './Selected_Photo';
import Photo_List from './Photo_List';

type Props = {
  variant: T_Temp_Variant,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>
}

export type T_Selected_Photo = {
  index: number;
  src: string;
};

export default function Photos({ variant, set_item }: Props) {
  const [selected_photo, set_selected_photo] = useState<T_Selected_Photo | undefined>(variant.src.length > 0 ? { index: 0, src: variant.src[0] } : undefined);
  
  return (
    <div className='w-full max-w-[500px] space-y-2 self-start mx-auto'>
      <Selected_Photo 
        variant={variant}
        selected_photo={selected_photo}
        set_item={set_item}
        set_selected_photo={set_selected_photo}
      />
      <Photo_List
        selected_photo={selected_photo}
        set_item={set_item}
        set_selected_photo={set_selected_photo}
        variant={variant}
      />
    </div>
  );
}