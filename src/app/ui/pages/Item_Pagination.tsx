"use client";

import { useSearchParams } from "next/navigation";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import clsx from "clsx";

type Props = {
  page: number,
  pages: number
}

export default function Items_Pagination({ page, pages }: Props) {
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  function page_link_url(page: number, pages: number) {
    page = page < 1 ? 1 : page > pages ? pages : page;
    search_params.set("page", page.toString());
    return `/items?${search_params.toString()}`
  }
  
  return (
    <Pagination className="pt-20">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            className={clsx(page <= 1 ? "pointer-events-none" : "")}
            href={page_link_url(page - 1, pages)} 
          />
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
                className={clsx(page === p ? "pointer-events-none" : "")}
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
          <PaginationNext 
            className={clsx(page >= pages ? "pointer-events-none" : "")}
            href={page_link_url(page + 1, pages)} 
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}