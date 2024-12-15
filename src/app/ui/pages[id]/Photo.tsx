import { Icon } from '@iconify/react/dist/iconify.js';

import { T_Item_Body, T_Item_Variant } from '@/app/types';
import Image from 'next/image';

type Props = {
  variant: Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
  index: number;
}

export default function Photo({ variant, set_item, index }: Props) {

  function handle_input(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      set_item(prev => ({
        ...prev,
        variants: prev.variants.map((v, i) => {
          if (i === index) {
            return {
              ...v,
              src: reader.result as string
            }
          }
          return v;
        })
      }))
    };

    e.target.value = "";
  }
  
  return (
    <div className="relative self-start mx-auto w-full max-w-[500px] aspect-square border bg-gray-100">
      {
        variant.src
        ?
        <Image 
          src={variant.src}
          alt="product image"
          fill
        />
        :
        <Icon 
          icon="stash:image-plus-light"
          className="absolute w-1/3 h-1/3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          color="#333"
        />
      }
      <label 
        htmlFor="photo-input"
        className="absolute inset-0 cursor-pointer"
      />
      <input 
        type="file"
        className="hidden"
        accept="image/*"
        id="photo-input"
        onChange={handle_input}
      />
    </div>
  );
}