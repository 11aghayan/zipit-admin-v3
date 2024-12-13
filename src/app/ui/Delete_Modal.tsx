"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Action_Error, Action_Success } from "@/app/actions/lib";
import { useToast } from "@/hooks/use-toast";
import { T_ID } from "@/app/types";

type Props = {
  id: T_ID,
  is_open: boolean,
  set_is_open: React.Dispatch<React.SetStateAction<boolean>>,
  title: string,
  label: string,
  delete_func(id: string): Promise<Action_Error | Action_Success<null>>,
  className?: string;
  href?: string;
  toast_msg: string;
}

export default function Delete_Modal({ id, is_open, set_is_open, toast_msg, title, label, delete_func, className = "", href }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);

  async function handle_delete() {
    set_is_loading(true);
    set_errors([]);
    try {
      const res = await delete_func(id);
      
      if (!res.success && res instanceof Action_Error) {
        set_errors(res.messages);
        return;
      }
      
      toast({
        title: toast_msg,
        className: "text-emerald-700"
      });
      if (!href) {
        window.location.reload();
      } else {
        router.push(href);
      }
    } finally {
      set_is_loading(false);
    }
  }
  
  return (
    <Dialog open={is_open} onOpenChange={set_is_open}>
      <DialogTrigger asChild className={className}>
        <Button onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          set_is_open(true);
        }} variant="destructive">Ջնջել</Button>
      </DialogTrigger>
      <DialogContent 
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DialogHeader className="mt-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {label}
          </DialogDescription>
        </DialogHeader>
        {errors.length > 0 ? 
        errors.map((err, i) => <p key={i} className="text-[0.8rem] font-medium text-destructive">{err}</p>) : null}
        <div className="w-full flex gap-1">
          <Button 
            className="w-full"
            variant="destructive"
            disabled={is_loading}
            onClick={handle_delete}
          >
            Այո
          </Button>
          <Button 
            className="w-full"
            variant="outline"
            disabled={is_loading}
            onClick={() => set_is_open(false)}
          >
            Ոչ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}