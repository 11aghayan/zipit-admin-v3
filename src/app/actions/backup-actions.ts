import { Action_Error, Action_Success, axios, is_status_success } from "./lib";
import { T_Error } from "../types";

export async function get_data() {
  try {
    const { status, data } = await axios.get("/backup");
    if (!is_status_success(status)) {
      return new Action_Error(data.message, "get_data", data.message) as T_Error;
    }
    return new Action_Success(data);  
  } catch (error) {
    return new Action_Error("Unknown Error", "get_all_categories", error);
  }
}