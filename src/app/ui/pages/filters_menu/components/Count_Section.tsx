import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

import { T_Section_Props } from "../Filters_Menu";

type Props = T_Section_Props;

function Count_Section({ header_styles }: Props) {
  const router = useRouter();
  const search_params = new URLSearchParams(useSearchParams().toString());
  
  const [count, set_count] = useState(search_params.get("count") || "25");
  
  useEffect(() => {
    search_params.set("count", count);
    if (count === "25") search_params.delete("count");
    router.push(`/items?${search_params.toString()}`);
  }, [count]);
    
  return (
    <SidebarGroup>
      <SidebarGroupLabel className={header_styles}>Ապրանքների քանակը մեկ էջում</SidebarGroupLabel>
      <SidebarContent>
        <Select onValueChange={(val) => set_count(val)}>
          <SelectTrigger>
            <SelectValue
              defaultValue={count} 
              placeholder={count}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </SidebarContent>
    </SidebarGroup>
  );
}

export default function Wrapper({ header_styles }: Props) {
  return (
    <Suspense>
      <Count_Section header_styles={header_styles} />
    </Suspense>
  );
}