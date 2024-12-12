"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { T_Item, T_Item_Body } from "@/app/types";
import { get_item } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";

import Layout from "./components/Layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Item() {
  const { id } = useParams();
  const search_params = new URLSearchParams(useSearchParams().toString());

  const [is_loading, set_is_loading] = useState(true);
  const [errors, set_errors] = useState<string[]>([]);
  const [item, set_item] = useState<T_Item_Body<"add" | "edit"> | Action_Error | Action_Success<T_Item<"full">>>();
  
  useEffect(() => {
    if (id === "add") {
      set_item({
        category_id: "",
        name_am: "",
        name_ru: "",
        variants: [
          {
            src: "",
            available: 1,
            color_am: "",
            color_ru: "",
            description_am: "",
            description_ru: "",
            min_order_unit: "pcs",
            min_order_value: 1,
            price: 0,
            promo: null,
            size_unit: "mm",
            size_value: 0,
            special_group: null
          }
        ]
      });
      set_is_loading(false);
      return;
    }  

    fetch_item();
  }, [search_params.toString()])
  
  async function fetch_item() {
    set_errors([]);
    set_is_loading(true);
    try {
      const response = await get_item(id as string);
  
      set_item(response);
    } finally {
      set_is_loading(false);
    }
  }
  
  if (!item || is_loading) {
    return (
      <div className="space-y-1">
        {
          new Array(4).fill(1).map((val, i) => (
            <Skeleton 
              key={val + i}
              className="h-[52px]"
            />
          ))
        }
      </div>
    );
  }
  
  if (item instanceof Action_Error) {
    return (
      <p>Error</p>
    );
  }

  if (item instanceof Action_Success) {
    set_item(item.data);
    return null;
  } 
  
  return (
    <Layout 
      item={item} 
      set_item={set_item as React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>}
    />
  );
};