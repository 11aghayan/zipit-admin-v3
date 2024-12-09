type T_ID = string;

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

export type T_Item_Short = {
  id: T_ID;
  name: string;
  photo_id: string;
};