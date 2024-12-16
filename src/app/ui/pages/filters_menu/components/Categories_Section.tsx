import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { get_all_categories, T_Categories_Response } from "@/app/actions/category-actions";
import { Action_Error } from "@/app/actions/lib";
import { T_Success } from "@/app/types";
import { Toggle } from "@/components/ui/toggle";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

import { T_Section_Props } from "../Filters_Menu";

type Props = T_Section_Props;

function Categories_Section({ header_styles }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());

  const [data, set_data] = useState<Action_Error | T_Success<T_Categories_Response>>();
  const [selected_categories, set_selected_categories] = useState<string[]>(search_params.get("categories")?.split(",") || []);

  async function fetch_categories() {
    const res = await get_all_categories();
    set_data(res);
  }
  
  useEffect(() => {
    fetch_categories()
  }, [])
  
  useEffect(() => {
    search_params.set("categories", selected_categories.join(","));
    if (selected_categories.length < 1) search_params.delete("categories");
    router.push(`/items?${search_params.toString()}`)
  }, [selected_categories.length]);

  if (!data) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className={header_styles}>Կատեգորիաներ</SidebarGroupLabel>
        <SidebarContent>
          {
            (new Array(39).fill(1)).map((val, i) => (
              <Skeleton 
                key={val + i}
                className="h-12"
              />
            ))
          }
        </SidebarContent>
      </SidebarGroup>
    )
  }

  if (data instanceof Action_Error) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className={header_styles}>Կատեգորիաներ</SidebarGroupLabel>
        <SidebarContent>
          <p className="text-destructive text-center text-lg">{data.messages[0]}</p>
        </SidebarContent>
      </SidebarGroup>
    )
  }
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>Կատեգորիաներ</SidebarGroupLabel>
      <SidebarContent>
        {
          data.data.length > 0 ?
          data.data.categories.map(({ id, label_am }) => (
            <Toggle
              key={id}
              variant="outline"
              className="data-[state=on]:bg-[#34685c] data-[state=on]:text-background h-12"
              pressed={selected_categories.includes(id)}
              onClick={() => {
                set_selected_categories(prev => {
                  if (selected_categories.includes(id)) {
                    return prev.filter(val => val !== id) 
                  }
                  return [...prev, id];
                })
              }}
            >
              {label_am}
            </Toggle>
          ))
          : 
          <p className="text-lg text-center text-gray-300">Կատեգորիաներ չկան</p>
        }
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Categories_Section header_styles={header_styles} />
    </Suspense>
  );
}