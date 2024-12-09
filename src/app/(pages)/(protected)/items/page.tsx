import { SidebarTrigger } from "@/components/ui/sidebar";
import Add_Item from "./components/Add_Item";
import Item_List from "./components/Item_List";

export default function Items() {
  
  return (
    <div className="w-full">
      <div className="w-full flex gap-1 justify-between">
        <SidebarTrigger />
        <Add_Item />
      </div>
      <Item_List />
    </div>
  );
}