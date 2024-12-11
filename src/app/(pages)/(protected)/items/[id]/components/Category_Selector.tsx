import { useEffect, useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { T_Item_Body, T_Success } from "@/app/types";
import { get_all_categories, T_Categories_Response } from "@/app/actions/category-actions";
import { Action_Error } from "@/app/actions/lib";
import { Label } from "@/components/ui/label";

type Props = {
  item: T_Item_Body<"add" | "edit">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
}

export default function Category_Selector({ item, set_item }: Props) {
  
  const [categories, set_categories] = useState<Action_Error | T_Success<T_Categories_Response>>();
  
  useEffect(() => {
    fetch_categories();
  }, []);
  
  async function fetch_categories() {
    const data = await get_all_categories(); 
    set_categories(data);
  }
  
  if (!categories) {
    return (
      <p>Loading...</p>
    );
  }

  if (categories instanceof Action_Error) {
    return (
      <p>{categories.messages[0]}</p>
    );
  }
  
  return (
    <div className="m-1">
      <Label className="mb-1">Կատեգորիա</Label>
      <Select 
        value={item.category_id} 
        onValueChange={val => set_item(prev => ({ ...prev, category_id: val }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Ընտրեք կատեգորիան" />
        </SelectTrigger>
          <SelectContent>
          <SelectGroup>
            {
              categories.data.categories.map(({ id, label_am }) => (
                <SelectItem 
                  key={id}
                  value={id}
                >
                  {label_am}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}