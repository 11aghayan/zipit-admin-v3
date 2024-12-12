import { T_Item_Body } from "@/app/types";
import { Button } from "@/components/ui/button";

import Common_Data from "./Common_Data";
import Variant from "./Variant";

type Props = {
  item: T_Item_Body<"add" | "edit">;
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>;
}

export default function Layout({ item, set_item }: Props) {

  function handle_submit() {
    console.log(item);
  } 

  return (
    <div>
      <Common_Data 
        set_item={set_item}
        item={item}
      />
      {
        item.variants.map((variant, i) => (
          <Variant 
            key={i}
            variant={variant}
            set_item={set_item}
            index={i}
          />
        ))
      }
      <Button 
        type="button"
        className="mt-10 w-full"
        onClick={handle_submit}
      >
        Save
      </Button>
    </div>
  );
}