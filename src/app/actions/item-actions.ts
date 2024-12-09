import { AxiosResponse } from "axios";

import { 
  is_status_success, 
  axios,
  Action_Error,
  Action_Success 
} from "./lib";
import { T_Item_Short, T_Server_Error_Response } from "@/app/types";

export type T_Items_Response = {
  length: number;
  pages: number;
  items: T_Item_Short[];
}

export async function get_all_items(search_params: string) {
  try {
    const { status, data } = await axios.get(`/items/admin/all?${search_params}`) satisfies AxiosResponse satisfies { data: T_Items_Response | T_Server_Error_Response };
    
    if (!is_status_success(status)) {
      return new Action_Error(data.message, "get_all_items", data.message);
    }
    
    return new Action_Success<T_Items_Response>(data);
  } catch (error) {
    return new Action_Error("Unknown Error", "get_all_items", error);
  }
}