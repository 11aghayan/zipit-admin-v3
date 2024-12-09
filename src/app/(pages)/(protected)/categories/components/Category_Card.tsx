"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { delete_category, edit_category } from "@/app/actions/category-actions";
import { Action_Error } from "@/app/actions/lib";
import { useToast } from "@/hooks/use-toast"


type Props = {
  id: string;
  label_am: string;
  label_ru: string;
}

export default function Category_Card({ id, label_am, label_ru }: Props) {
  const { toast } = useToast();
  
  const [header, set_header] = useState(label_am);
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);
  const [values, set_values] = useState({
    label_am,
    label_ru
  });
  const [is_edit_dialog_open, set_is_edit_dialog_open] = useState(false);
  const [is_delete_dialog_open, set_is_delete_dialog_open] = useState(false);
  
  async function handle_change(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    set_is_loading(true);
    set_errors([]);
    try {
      const res = await edit_category(id, values.label_am, values.label_ru);

      if (!res.success && res instanceof Action_Error) {
        set_errors(res.messages);
        return;
      }
      
      toast({
        title: "Կատեգորիան հաջողությամբ փոփոխվել է"
      });
      set_header(values.label_am);
      set_is_edit_dialog_open(false);
    } finally {
      set_is_loading(false);
    }
  }
  
  async function handle_delete() {
    set_is_loading(true);
    set_errors([]);
    try {
      const res = await delete_category(id);
      
      if (!res.success && res instanceof Action_Error) {
        set_errors(res.messages);
        return;
      }
      
      toast({
        title: "Կատեգորիան հաջողությամբ ջնջվել է"
      });
      window.location.reload();
    } finally {
      set_is_loading(false);
    }
  }
  
  return (
    <Card 
      key={id}
      className="flex flex-col justify-between"
    >
      <CardHeader className="text-center font-medium">
        {header}
      </CardHeader>
      <CardContent className="flex justify-between gap-1">
        <Dialog open={is_edit_dialog_open} onOpenChange={set_is_edit_dialog_open}>
          <DialogTrigger asChild>
            <Button>Խմբագրել</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Խմբագրել կատեգորիան</DialogTitle>
            </DialogHeader>
            <form 
              onSubmit={handle_change}
              className="flex flex-col gap-3"
            >
              {
                [
                  { name: "label_am", label: "Հայերեն անվանում" }, 
                  { name: "label_ru", label: "Ռուսերեն անվանում" }
                ].map(({ label, name }) => (
                  <Label 
                    key={name}
                    className="space-y-1"
                  >
                    <p>{label}</p>
                    <Input
                      name={name}
                      value={values[name as keyof typeof values]}
                      type="text"
                      disabled={is_loading}
                      onChange={(e) => set_values(prev => ({ ...prev, [name]: e.target.value }))}
                    />
                  </Label>
                ))
              }
              {errors.length > 0 ? 
              errors.map((err, i) => <p key={i} className="text-[0.8rem] font-medium text-destructive">{err}</p>) : null}
              <Button 
                type="submit" 
                className="w-full"
                disabled={is_loading}
              >
                Պահպանել
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={is_delete_dialog_open} onOpenChange={set_is_delete_dialog_open}>
          <DialogTrigger asChild>
            <Button variant="destructive">Ջնջել</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="mt-3">
              <DialogTitle>Վստա՞հ եք, որ ցանկանում եք ջնջել կատեգորիան</DialogTitle>
              <DialogDescription>
                {label_am}
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
                onClick={() => set_is_delete_dialog_open(false)}
              >
                Ոչ
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}