import axs from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SUCCESS_STATUSES = [200, 201, 204];

export function is_status_success(status: number) {
  return SUCCESS_STATUSES.includes(status);
}

export const axios = axs.create({
  baseURL: API_BASE_URL,
  validateStatus: () => true,
  withCredentials: true
});

export class Action_Error {
  success = false;
  messages: string[];
  
  constructor(data: string | string[], fn_name: string, error: unknown) {
    this.messages = typeof data === "string" ? [data] : data;
    console.debug(`Error in action ${fn_name}:\n`, error);
  }
}

export class Action_Success<T> {
  success = true;
  data: T;
  
  constructor(data: T) {
    this.data = data;
  }
}