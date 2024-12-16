import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

import { T_Section_Props } from "../Filters_Menu";

type Props = T_Section_Props;

function Sorting_Section({ header_styles }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [sorting, set_sorting] = useState<keyof typeof sorting_map>(search_params.get("sortby") as keyof typeof sorting_map | undefined || "name_asc");
  
  useEffect(() => {
    search_params.set("sortby", sorting);
    if (sorting === "name_asc") search_params.delete("sortby");
    router.push(`/items?${search_params.toString()}`);
  }, [sorting]);
    
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>Դասավորել ըստ</SidebarGroupLabel>
      <SidebarContent>
        <Select onValueChange={(val) => set_sorting(val as typeof sorting)}>
          <SelectTrigger>
            <SelectValue
              defaultValue={sorting} 
              placeholder={sorting_map[sorting]}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name_asc">{sorting_map.name_asc}</SelectItem>
            <SelectItem value="name_desc">{sorting_map.name_desc}</SelectItem>
            <SelectItem value="price_asc">{sorting_map.price_asc}</SelectItem>
            <SelectItem value="price_desc">{sorting_map.price_desc}</SelectItem>
          </SelectContent>
        </Select>
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Sorting_Section header_styles={header_styles} />
    </Suspense>
  );
}

const sorting_map = {
  "name_asc": "Անվան Ա-Ֆ",
  "name_desc": "Անվան Ֆ-Ա",
  "price_asc": "Գնի աճման",
  "price_desc": "Գնի նվազման"
};