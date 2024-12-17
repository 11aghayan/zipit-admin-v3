import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item_Body, T_Temp_Variant } from "@/app/types";

import { T_Selected_Photo } from "./Photos";

type Props = {
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>,
  variant: T_Temp_Variant,
  set_selected_photo: React.Dispatch<React.SetStateAction<T_Selected_Photo | undefined>>
}

export default function Add_Photo_Btn({ set_item, set_selected_photo, variant }: Props) {
  function handle_input(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      let photo_index = 0;

      set_item(prev => ({
        ...prev,
        variants: prev.variants.map(v => {
          if (v.temp_id === variant.temp_id) {
            photo_index = v.src.length;
            return {
              ...v,
              src: [...v.src, reader.result as string]
            }
          }
          return v;
        })
      }));

      set_selected_photo({
        index: photo_index,
        src: reader.result as string
      });
    };

    e.target.value = "";
  }

  return (
    <div className="relative w-full h-full bg-gray-100">
        <Icon 
          icon="stash:image-plus-light"
          className="absolute w-1/3 h-1/3 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          color="#333"
        />
      <label
        className="absolute inset-0 cursor-pointer"
      >
        <input 
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handle_input}
        />
      </label>
    </div>
  );
}