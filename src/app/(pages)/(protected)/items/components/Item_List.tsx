"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { get_all_items, T_Items_Response } from "@/app/actions/item-actions";
import { Action_Error, Action_Success } from "@/app/actions/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Item_List() {
  const search_params = new URLSearchParams(useSearchParams().toString());

  const [is_loading, set_is_loading] = useState(true);
  const [data, set_data] = useState<Action_Error | Action_Success<T_Items_Response>>();
  const [page, set_page] = useState<number>(Number(search_params.get("page") || "1"));
  
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
  
  function page_link_url(page: number, pages: number) {
    page = page < 1 ? 1 : page > pages ? pages : page;
    search_params.set("page", page.toString());
    return `/items?${search_params.toString()}`
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
  
  const { items, length } = data.data;
  const pages = 4;

  return (
    <div>
      <div className={clsx(layout_styles, length > 0 ? "grid" : "")}>
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
          <p className="text-2xl mt-3 opacity-25 font-semibold text-center">Ապրանքներ չեն գտնվել</p>
        }
      </div>
      <Pagination className="pt-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={page_link_url(page - 1, pages)} />
          </PaginationItem>
          {
            page - 1 > 1 && pages > 3
            ?
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            :
            null
          }
          { 
            [page - 2 > 0 && pages === page ? page - 2  : null, page - 1 > 0 ? page - 1 : null, page, page + 1 > pages ? null : page + 1, page === 1 && pages > 2 ? 3 : null].filter(p => p !== null)
            .map((p, i) => (
              <PaginationItem
                key={i}
              >
                <PaginationLink 
                  href={page_link_url(p, pages)}
                  isActive={page === p}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))
          }
          {
            page + 1 < pages && pages > 3
            ?
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            :
            null
          }
          <PaginationItem>
            <PaginationNext href={page_link_url(page + 1, pages)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}