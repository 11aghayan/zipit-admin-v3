import { AxiosResponse } from "axios";

import { 
  is_status_success, 
  axios,
  Action_Error,
  Action_Success 
} from "./lib"; 
import { 
  T_Server_Error_Response, 
  T_Error, 
  T_Success,
  T_Category } from "@/app/types";
import { category_schema } from "@/lib/zod";

export type T_Categories_Response = { length: number, categories: T_Category[] };

export async function get_all_categories() {
  try {
    const { status, data } = await axios.get("/categories/admin") satisfies AxiosResponse & { data: T_Categories_Response | T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "get_all_categories", data.message) as T_Error;
    }
  
    return new Action_Success<T_Categories_Response>(data) as T_Success<T_Categories_Response>;  
  } catch (error) {
    return new Action_Error("Unknown Error", "get_all_categories", error);
  }
}

export async function edit_category(id: string, label_am_unchecked: unknown, label_ru_unchecked: unknown) {
  try {
    const zod_result = await category_schema.safeParseAsync({ label_am: label_am_unchecked, label_ru: label_ru_unchecked });
    
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages, "edit_category", zod_result.error) as T_Error;
    }

    const { label_am, label_ru } = zod_result.data;

    const { status, data } = await axios.put(`/categories/${id}`, { label_am, label_ru }) satisfies AxiosResponse & { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "edit_category", data.message) as T_Error;
    }
    
    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown Error", "edit_category", error);
  }
}

export async function delete_category(id: string) {
  try {
    const { status, data } = await axios.delete(`/categories/${id}`) satisfies AxiosResponse & { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "delete_category", data.message) as T_Error;
    }

    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown Error", "delete_category", error);
  }
}

export async function add_category(labels: { label_am: string, label_ru: string }) {
  try {
    const zod_result = await category_schema.safeParseAsync(labels);
    
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages, "add_category", zod_result.error) as T_Error;
    }

    const { status, data } = await axios.post("/categories", labels) satisfies AxiosResponse & { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "add_category", data.message) as T_Error;
    }

    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown Error", "add_category", error);
  }
}