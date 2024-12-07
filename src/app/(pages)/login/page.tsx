"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { signin_schema } from "@/lib/zod";
import { useState } from "react";
import { login } from "@/app/actions/auth-actions";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function Login() {
  const form = useForm<z.infer<typeof signin_schema>>({
    resolver: zodResolver(signin_schema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const router = useRouter();
  
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);
  
  async function handle_submit({ username, password }: z.infer<typeof signin_schema>) {
    set_is_loading(true);
    set_errors([]);
    try {
      const res = await login(username, password);
      if (!res.success) {
        set_errors(res.messages);
        return;
      }

      router.refresh();
    } finally {
      set_is_loading(false);
    }
  }
  
  return (
    <div className="min-h-dvh p-3 flex flex-col justify-center items-center">
      <h1 className={`${inter.className} text-center text-xl mb-3`}>ZIPIT.admin</h1>
      <Form {...form}>
        <form 
          className="flex flex-col gap-2 w-full max-w-96"
          onSubmit={form.handleSubmit(handle_submit)}
        >
          <FormField 
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="Մուտքանուն" 
                    disabled={is_loading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Գաղտնաբառ" 
                    disabled={is_loading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errors.length > 0 ? 
          errors.map((err, i) => <p key={i} className="text-[0.8rem] font-medium text-destructive">{err}</p>) : null}
          <Button 
            type="submit"
            disabled={is_loading}
          >
            Մուտք
          </Button>
        </form> 
      </Form>
    </div>
  );
};