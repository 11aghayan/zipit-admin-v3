import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";

import { T_Section_Props } from "../Filters_Menu";

type Props = T_Section_Props;

export default function Special_Groups_Section({ header_styles }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [special_groups, set_special_groups] = useState<(keyof typeof special_group_map)[]>([]);
  
  
  useEffect(() => {
    search_params.set("special_groups", special_groups.join(","));
    if (special_groups.length < 1) search_params.delete("special_groups");
    router.push(`/items?${search_params.toString()}`);
  }, [special_groups.length])

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>Հատուկ խումբ</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        {
          (Object.keys(special_group_map) as (keyof typeof special_group_map)[]).map((group) => (
            <Toggle
              key={group}
              variant="outline"
              className="data-[state=on]:bg-[#efbf38]"
              pressed={special_groups.includes(group)}
              onClick={() => {
                set_special_groups(prev => {
                  if (special_groups.includes(group)) {
                    return prev.filter(g => g !== group) 
                  }
                  return [...prev, group];
                })
              }}
            >
              {special_group_map[group]}
            </Toggle>
          ))
        }
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const special_group_map = {
  liq: "Լիկվիդացիա",
  prm: "Ակցիա",
  new: "Նոր"
};