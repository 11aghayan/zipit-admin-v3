"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

import { get_all_items, T_Items_Response } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";
import { Skeleton } from "@/components/ui/skeleton";

import Item_Card from "./Item_Card";
import Items_Pagination from "./Item_Pagination";

export default function Item_List() {
  
  const search_params = new URLSearchParams(useSearchParams().toString());
  const page = Number(search_params.get("page") || "1");

  const [is_loading, set_is_loading] = useState(true);
  const [data, set_data] = useState<Action_Error | Action_Success<T_Items_Response>>();

  
  const layout_styles = "mt-4 gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  
  useEffect(() => {
    set_is_loading(true);
    fetch_items();
  }, [search_params.toString()]);
  
  async function fetch_items() {
    const res = await get_all_items(search_params.toString());
    set_is_loading(false);
    set_data(res);
  }
  
  if (!data || is_loading) {
    return (
      <div className={`grid ${layout_styles}`}>
        {
          (new Array(Number(search_params.get("count") || "25")).fill(1)).map((val, i) => (
            <Skeleton 
              key={val + i}
              className="h-[232px]"
            />
          ))
        }
      </div>
    );
  }
  
  if (data instanceof Action_Error) {
    return (
      <p className="text-destructive text-2xl mt-7 font-semibold text-center">
        {data.messages[0]}
      </p>
    );
  }
  
  const { items, length, pages } = data.data;

  return (
    <div>
      <div className={clsx(layout_styles, length > 0 ? "grid" : "")}>
        {
          length > 0
          ?
          items.map(({ id, name, photo_id }) => (
            <Item_Card 
              key={id}
              id={id}
              photo_id={photo_id}
              name={name}
            />
          ))
          :
          <p className="text-2xl mt-3 opacity-25 font-semibold text-center">Ապրանքներ չեն գտնվել</p>
        }
      </div>
      <Items_Pagination 
        page={page}
        pages={pages}
      />
    </div>
  );
}