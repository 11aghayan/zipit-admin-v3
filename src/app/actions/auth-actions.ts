import { AxiosResponse } from "axios";

import { signin_schema, change_password_schema } from "@/lib/zod";

import { 
  is_status_success, 
  axios,
  Action_Error,
  Action_Success 
} from "./lib"; 
import { 
  T_Server_Error_Response, 
  T_Error,
  T_Success } from "@/app/types";

export async function login(username_unchecked: any, password_unchecked: any): Promise<T_Success<null> | T_Error> {
  try {
    const zod_result = await signin_schema.safeParseAsync({ username: username_unchecked, password: password_unchecked });
  
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages, "login", zod_result.error) as T_Error;
    }
    
    const { username, password } = zod_result.data;
    
    const { status, data } = await axios.post("/auth/login", { username, password })  satisfies AxiosResponse & { data: T_Server_Error_Response }; 
    
    if (!is_status_success(status)) {
      return new Action_Error(data.message, "login", data.message) as T_Error;
    }
    
    return new Action_Success(null) as T_Success<null>;
  } catch (error) {
    return new Action_Error("Unknown error", "login", error) as T_Error;
  }
}

export async function logout(): Promise<T_Success<null> | T_Error> {
  try {
    const { status, data } = await axios.get("/auth/logout");

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "logout", data) as T_Error;
    }
    
    return new Action_Success(null) as T_Success<null>;
  } catch (error) {
    return new Action_Error("Unknown error", "logout", error) as T_Error;
  }
}

export async function change_password({password, new_password, new_password_repeat }: { password: string, new_password: string, new_password_repeat: string }) {
  try {
    const zod_result = await change_password_schema.safeParseAsync({ password, new_password, new_password_repeat });
    
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages, "change_password", zod_result.error) as T_Error;
    }
    
    const { status, data } = await axios.put("/auth/change-password", { password, new_password }) satisfies AxiosResponse & { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message, "change_password", data);
    }

    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown error", "change_password", error) as T_Error; 
  }
}