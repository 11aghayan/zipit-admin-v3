import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

import { T_Item, T_Item_Body } from "@/app/types";
import { Button } from "@/components/ui/button";
import { add_item, delete_item, edit_item } from "@/app/actions/item-actions";
import { Action_Error } from "@/app/actions/lib";
import { useToast } from "@/hooks/use-toast";
import Delete_Modal from "@/app/ui/Delete_Modal";

import Common_Data from "./Common_Data";
import Variant, { new_variant } from "./Variant";

type Props = {
  item: T_Item_Body<"add" | "edit">,
  set_item: React.Dispatch<React.SetStateAction<T_Item_Body<"add" | "edit">>>,
  action: "add" | "edit";
}

export default function Layout({ item, set_item, action }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  
  const [is_delete_modal_open, set_is_delete_modal_open] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);
  
  async function handle_add() {
    set_is_loading(true);
    set_errors([]);
    const res = await add_item(item);
    set_is_loading(false);
    
    if (res instanceof Action_Error) {
      set_errors(res.messages);
      return;
    }

    set_item(res.data);
    router.replace(`/items/${res.data.id}`);
    toast({
      title: "Ապրանքը հաջողությամբ պահպանվել է"
    });
  } 
  
  async function handle_edit() {
    set_is_loading(true);
    set_errors([]);
    const res = await edit_item(item as T_Item_Body<"edit">);
    set_is_loading(false);
    
    if (res instanceof Action_Error) {
      set_errors(res.messages);
      return;
    }

    set_item(res.data);
    toast({
      title: "Փոփոխությունները հաջողությամբ պահպանվել են"
    });
  }
  
  return (
    <div>
      {
        is_loading
        ?
        <div className="fixed inset-0 z-50 bg-black/70 grid content-center">
          <Icon 
            icon="line-md:uploading-loop" 
            fontSize={64} 
            color="#ccc" 
            className="mx-auto" 
          />
        </div>
        :null
      }
      <Common_Data 
        set_item={set_item}
        item={item}
      />
      {
        item.variants.map((variant, i, arr) => (
          "delete" in variant
          ?
          null
          :
          <Variant 
            key={i}
            variant={variant}
            set_item={set_item}
            index={i}
            variants_count={arr.length}
          />
        ))
      }
      <div className="w-full max-w-96 mx-auto ">
        {errors.length > 0 ?
        errors.map((err, i) => <p key={i} className="text-destructive text-center">{err}</p>) : null}
        <Button
          type="button"
          variant="secondary"
          className="w-full mt-10"
          onClick={() => set_item(prev =>({ 
            ...prev, 
            variants: [
              ...prev.variants, 
              new_variant
          ]}))}
        >
          Ավելացնել նոր տարբերակ
        </Button>
        {
          action === "edit"
          ?
          <Delete_Modal 
            delete_func={delete_item}
            id={(item as T_Item<"full">).id}
            is_open={is_delete_modal_open}
            label={item.name_am}
            set_is_open={set_is_delete_modal_open}
            title="Վստա՞հ եք, որ ցանկանում եք ջնջել ապրանքը"
            toast_msg="Ապրանքը հաջողությամբ ջնջվել է"
            className="w-full mt-2"
            href="/items"
          />
          :
          null
        }
        <Button 
          type="button"
          className="mt-2 w-full"
          onClick={action === "add" ? handle_add : handle_edit}
        >
          Պահպանել
        </Button>
      </div>
    </div>
  );
}