"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { get_all_items, T_Items_Response } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Item_List() {
  const search_params = new URLSearchParams(useSearchParams().toString());

  const [is_loading, set_is_loading] = useState(false);
  const [data, set_data] = useState<Action_Error | Action_Success<T_Items_Response>>();
  
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
      <p>Loading...</p>
    );
  }
  
  if (data instanceof Action_Error) {
    return (
      <p>{data.messages[0]}</p>
    );
  }
  
  const { items, length, pages } = data.data;
  
  return (
    <div className="mt-4 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {
        length > 0
        ?
        items.map(({ id, name, photo_id }) => (
          <Card
            key={id}
            className="hover:bg-accent"
          >
            <Link href={`/items/${id}`}>
              <CardContent className="p-2">
                <Image 
                  src={`http://localhost:3200/api/v2/photo/${photo_id}?width=150&height=150`} 
                  alt="Product photo" 
                  width={150} 
                  height={150} 
                  className="m-auto rounded-md"
                />
              </CardContent>
              <CardHeader className="px-3">
                <CardTitle className="text-center">
                  {name}
                </CardTitle>
              </CardHeader>
            </Link>
          </Card>
        ))
        :
        <p>No Items</p>
      }
    </div>
  );
}