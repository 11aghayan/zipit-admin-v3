"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { category_schema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { add_category } from "@/app/actions/category-actions";
import { Action_Error } from "@/app/actions/lib";
import { useToast } from "@/hooks/use-toast";

export default function Add_Category() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof category_schema>>({
    resolver: zodResolver(category_schema),
    defaultValues: {
      label_am: "",
      label_ru: ""
    }
  });
  
  const [is_open, set_is_open] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);
  
  async function handle_submit(values: z.infer<typeof category_schema>) {
    set_is_loading(true);
    set_errors([]);
    try {
      const res = await add_category(values);

      if (!res.success && res instanceof Action_Error) {
        set_errors(res.messages);
        return;
      }

      toast({
          title: "Կատեգորիան հաջողությամբ ավելացվել է"
      });
      window.location.reload()
    } finally {
      set_is_loading(false);
    }
  }
  
  return (
    <Dialog open={is_open} onOpenChange={set_is_open}>
      <DialogTrigger asChild>
        <Button>Ավելացնել նոր կատեգորիա</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-2">
          <DialogTitle>Ավելացնել նոր կատեգորիա</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handle_submit)} className="space-y-3">
            <FormField
              control={form.control}
              name="label_am"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Կատեգորիայի անվանումը հայերեն</FormLabel>
                  <FormControl>
                    <Input disabled={is_loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label_ru"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Կատեգորիայի անվանումը ռուսերեն</FormLabel>
                  <FormControl>
                    <Input disabled={is_loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errors.length > 0 ? 
              errors.map((err, i) => <p key={i} className="text-[0.8rem] font-medium text-destructive">{err}</p>) : null}
            <Button 
              type="submit" 
              className="w-full"
              disabled={is_loading}
            >
                Ավելացնել
              </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}