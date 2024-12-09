"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { get_all_items, T_Items_Response } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";

//special_groups, categories, count, page, lang, sortby = key_dir

export default function Item_List() {
  const search_params = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  const [errors, set_errors] = useState<string[]>([]);
  const [data, set_data] = useState<Action_Error | Action_Success<T_Items_Response>>();
  
  useEffect(() => {
    // fetch_items();
  }, [search_params.toString()]);
  
  async function fetch_items() {
    const res = await get_all_items(`/items?${search_params.toString()}`);
    set_data(res);
  }
  
  return (
    <div>
      Item_List
    </div>
  );
}