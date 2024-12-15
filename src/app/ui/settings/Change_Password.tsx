"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { change_password_schema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { change_password } from "@/app/actions/auth-actions";
import { Action_Error } from "@/app/actions/lib";


export default function Change_Password() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof change_password_schema>>({
    resolver: zodResolver(change_password_schema),
    defaultValues: {
      password: "",
      new_password: "",
      new_password_repeat: ""
    }
  });
  
  const [errors, set_errors] = useState<string[]>([]);
  const[is_loading, set_is_loading] = useState(false);
  const [password_visible, set_password_visible] = useState(false);
  const [new_password_visible, set_new_password_visible] = useState(false);
  const [new_password_repeat_visible, set_new_password_repeat_visible] = useState(false);
  
  async function handle_submit(values: z.infer<typeof change_password_schema>) {
    set_is_loading(true);
    set_errors([]);
    
    try {
      if (values.new_password !== values.new_password_repeat) {
        set_errors(["Գաղտնաբառերը չեն համընկնում"]);
        return;
      }
      
      const res = await change_password(values);

      if (!res.success && res instanceof Action_Error) {
        set_errors(res.messages);
        return;
      }
      
      toast({
        title: "Գաղտնաբառը հաջողությամբ փոխվել է",
      });
    } finally {
      set_is_loading(false);
    }
  }
  
  const inputs = [
    {
      name: "password" as const,
      toggle_visible: () => set_password_visible(prev => !prev),
      visible: password_visible,
      label: "Գաղտնաբառ"
    },
    {
      name: "new_password" as const,
      toggle_visible: () => set_new_password_visible(prev => !prev),
      visible: new_password_visible,
      label: "Նոր գաղտնաբառ"
    },
    {
      name: "new_password_repeat" as const,
      toggle_visible: () => set_new_password_repeat_visible(prev => !prev),
      visible: new_password_repeat_visible,
      label: "Կրկնեք նոր գաղտնաբառը"
    },
  ];
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(handle_submit)}
        className="w-full max-w-96 space-y-4"
      >
        {
          inputs.map(({ name, toggle_visible, visible, label }) => (
            <FormField 
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={visible ? "text" : "password"}
                        className="pr-16"
                        disabled={is_loading}
                        {...field}
                      />
                    </FormControl>
                    <Button 
                      variant="ghost"
                      onClick={toggle_visible}
                      className="absolute top-1/2 -translate-y-1/2 right-0"
                      type="button"
                      disabled={is_loading}
                    >
                      { 
                        visible ?
                        <Icon icon="streamline:visible" />
                        :
                        <Icon icon="streamline:invisible-1" />
                      }
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))
        }
        {errors.length > 0 ? 
          errors.map((err, i) => <p key={i} className="text-[0.8rem] font-medium text-destructive">{err}</p>) : null}
        <Button 
          type="submit"
          className="w-full"
        >
          Պահպանել
        </Button>
      </form>
    </Form>
  );
};