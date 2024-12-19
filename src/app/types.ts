export type T_ID = string;
export type T_Size_Unit = "mm" | "cm" | "m";
export type T_Min_Order_Unit = "pcs" | "cm" | "box" | "roll" | "m";
export type T_Special_Group = "new" | "prm" | "liq";

export type T_Props_Children = Readonly<{
  children: React.ReactNode;
}>;

export type T_Server_Error_Response = {
  message: string;
};

export type T_Error = { success: false, messages: string[] };
export type T_Success<T> = { success: true, data: T; };

export type T_Category = {
  id: T_ID;
  label_am: string;
  label_ru: string;
  item_count: string;
};

export type T_Item<T extends "short" | "full"> = T extends "short" ? {
  id: T_ID;
  name: string;
  photo_id: string;
} : T_Item_Main & {
  variants: T_Item_Variant[];
};

export type T_Item_Main = {
  id: T_ID;
  category_id: T_ID;
  name_am: string;
  name_ru: string;
}

export type T_Item_Variant = T_Item_Info & T_Size & T_Color & T_Photo;

export type T_Size = {
  id: T_ID;
  item_id: T_ID;
  size_value: number | string;
  size_unit: T_Size_Unit;
};

export type T_Color = {
  id: T_ID;
  item_id: T_ID;
  color_am: string;
  color_ru: string;
};

export type T_Photo = {
  id: T_ID;
  item_id: T_ID;
  src: string[] | [];
};

export type T_Item_Info = {
  item_id: T_ID;
  photo_id: T_ID;
  price: number | string;
  promo: number | string | null;
  size_id: T_ID;
  color_id: T_ID;
  min_order_value: number | string;
  min_order_unit: T_Min_Order_Unit;
  description_am: string | null;
  description_ru: string | null;
  special_group: T_Special_Group | null;
  creation_date: number;
  available: number;
};

export type T_Temp_Variant = (Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> | Omit<T_Item_Variant, "creation_date">) & { temp_id: number };

export type T_Item_Body<T extends "add" | "edit"> = T extends "add" ? 
(Omit<T_Item_Main, "id"> & {
  variants: (Omit<T_Item_Variant, "id" | "item_id" | "size_id" | "photo_id" | "color_id" | "creation_date"> & { temp_id: number})[]
}) : 
(T_Item_Main & {
  variants: T_Temp_Variant[]
});