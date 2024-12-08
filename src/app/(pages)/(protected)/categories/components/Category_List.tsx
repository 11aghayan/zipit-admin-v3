"use client";

import { useEffect, useState } from "react";

import { get_all_categories, T_Categories_Response } from "@/app/actions/category-actions";
import { Action_Error } from "@/app/actions/lib";
import { T_Success } from "@/app/types";

import Category_Card from "./Category_Card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Category_List() {
  const [data, set_data] = useState<Action_Error | T_Success<T_Categories_Response>>();

  useEffect(() => {
    fetch_categories();
  }, []);
  
  async function fetch_categories() {
    const data = await get_all_categories();
    set_data(data);
  }
  
  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {
          (new Array(39).fill(1)).map((val, i) => (
            <Skeleton 
              key={val + i}
              className="h-[145px] w-full"
            />
          ))
        }
      </div>
    );
  }
  
  if (!data.success || data instanceof Action_Error) {
    return (
      <div>
        {
          data.messages.map((message, i) => (
            <p key={i} className="text-destructive">
              {message}
            </p>
          ))
        }
      </div>
    );
  }

  if (data.data.categories.length < 1) {
    return (
      <p>Կատեգորիաներ չկան</p>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {
        data.data.categories.map(({ id, label_am, label_ru }) => (
          <Category_Card 
            key={id}
            id={id}
            label_am={label_am}
            label_ru={label_ru}
          />
        ))
      }
    </div>
  );
}