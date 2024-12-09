import { AxiosResponse } from "axios";

import { 
  is_status_success, 
  axios,
  Action_Error,
  Action_Success 
} from "./lib";
import { T_Item_Body, T_Item, T_Server_Error_Response } from "@/app/types";

export type T_Items_Response = {
  length: number;
  pages: number;
  items: T_Item<"short">[];
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

export async function delete_item(id: string) {
  try {
    const { data, status } = await axios.delete(`/items/item/admin/${id}`) satisfies AxiosResponse satisfies { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "delete_item", data.message);
    }
    
    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown Error", "delete_item", error);
  }
}

export async function add_item(b: T_Item_Body<"add">) {
  const body = {
    ...b,
    variants: b.variants.map(variant => {
      const temp = JSON.parse(JSON.stringify(variant));
      delete temp.photo_id;
      return temp;
    })
  }
  
  try {
    const { data, status } = await axios.post("/items/item/admin", body) satisfies AxiosResponse satisfies { data: { item: T_Item<"full"> } | T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "add_item", data.message);
    }
    
    return new Action_Success<T_Item<"full">>(data.item);
  } catch (error) {
    return new Action_Error("Unknown Error", "add_item", error);
  }
}

export async function get_item(id: string) {
  try {
    const { data, status } = await axios.get(`/items/item/admin/${id}`) satisfies AxiosResponse satisfies { data: { item: T_Item<"full"> } | T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "get_item", data.message);
    }
    
    return new Action_Success<T_Item<"full">>(data.item);
  } catch (error) {
    return new Action_Error("Unknown Error", "get_item", error);
  }
}