"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import Sorting_Section from "./components/Sorting_Section";
import Special_Groups_Section from "./components/Special_Groups_Section";
import Categories_Section from "./components/Categories_Section";
import Count_Section from "./components/Count_Section";

export type T_Section_Props = {
  header_styles: string
}

export default function Filters_Menu() {  
  const header_styles = "text-xs font-bold";
  
  return (
    <Sidebar side="left">
      <SidebarContent className="space-y-3 pt-10">
        <Sorting_Section 
          header_styles={header_styles}
        />
        <Count_Section 
          header_styles={header_styles}
        />
        <Special_Groups_Section 
          header_styles={header_styles}
        />
        <Categories_Section
          header_styles={header_styles}
        />
      </SidebarContent>
    </Sidebar>
  );
}