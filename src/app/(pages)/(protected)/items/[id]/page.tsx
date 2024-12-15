"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { T_Item, T_Item_Body } from "@/app/types";
import { get_item } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";
import { Skeleton } from "@/components/ui/skeleton";

import Layout from "@/app/ui/pages[id]/Layout";
import { new_variant } from "@/app/ui/pages[id]/Variant";

export default function Item() {
  const { id } = useParams();

  const [is_loading, set_is_loading] = useState(true);
  const [item, set_item] = useState<T_Item_Body<"add" | "edit"> | Action_Error | Action_Success<T_Item<"full">>>();
  
  useEffect(() => {
    if (id === "add") {
      set_item({
        category_id: "",
        name_am: "",
        name_ru: "",
        variants: [new_variant]
      });
      set_is_loading(false);
      return;
    }  

    fetch_item();
  }, [])
  
  async function fetch_item() {
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
      <p>{item.messages[0]}</p>
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
      action={id === "add" ? "add" : "edit"}
    />
  );
};