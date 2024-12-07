import { AxiosResponse } from "axios";

import { signin_schema, change_password_schema } from "@/lib/zod";

import { 
  is_status_success, 
  axios,
  Action_Error,
  Action_Success 
} from "./lib"; 
import { T_Server_Error_Response } from "@/app/types";

type T_Error = { success: false, messages: string[] };
type T_Login_Success = { success: true, data: null };

export async function login(username_unchecked: any, password_unchecked: any): Promise<T_Login_Success | T_Error> {
  try {
    const zod_result = await signin_schema.safeParseAsync({ username: username_unchecked, password: password_unchecked });
  
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages) as T_Error;
    }
    
    const { username, password } = zod_result.data;
    
    const { status, data } = await axios.post("/auth/login", { username, password }) as AxiosResponse satisfies { data: T_Server_Error_Response }; 
    
    if (!is_status_success(status)) {
      return new Action_Error(data.message) as T_Error;
    }
    
    return new Action_Success(null) as T_Login_Success;
  } catch (error) {
    return new Action_Error("Unknown error") as T_Error;
  }
}

type T_Logout_Success = { success: true, data: null };

export async function logout(): Promise<T_Logout_Success | T_Error> {
  try {
    const { status, data } = await axios.get("/auth/logout");

    if (!is_status_success(status)) {
      return new Action_Error(data.message) as T_Error;
    }
    
    return new Action_Success(null) as T_Logout_Success;
  } catch (error) {
    return new Action_Error("Unknown error") as T_Error;
  }
}

export async function change_password(password_unchecked: any, new_password_unchecked: any) {
  try {
    const zod_result = await change_password_schema.safeParseAsync({ password: password_unchecked, new_password: new_password_unchecked });
    
    if (!zod_result.success) {
      const zod_messages = zod_result.error.errors.map(err => err.message);
      return new Action_Error(zod_messages) as T_Error;
    }
    
    const { status, data } = await axios.put("/auth/change-password", { password: "password", new_password: "Password_1" }) as AxiosResponse satisfies { data: T_Server_Error_Response };

    if (!is_status_success(status)) {
      return new Action_Error(data.message);
    }

    return new Action_Success(null);
  } catch (error) {
    return new Action_Error("Unknown error") as T_Error; 
  }
}