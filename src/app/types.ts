export type T_Props_Children = Readonly<{
  children: React.ReactNode;
}>;

export type T_Server_Error_Response = {
  message: string;
};

export type T_Error = { success: false, messages: string[] };
export type T_Success<T> = { success: true, data: T; };

export type T_Category = {
  id: string;
  label_am: string;
  label_ru: string;
  item_count: string;
};