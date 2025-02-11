"use client";

import { get_data } from "@/app/actions/backup-actions";
import { Action_Error } from "@/app/actions/lib";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Backup() {
  const [is_loading, set_is_loading] = useState(false);
  const [errors, set_errors] = useState<string[]>([]);
  const [data, set_data] = useState<string>();
  
  async function handle_get_data() {
    try {
      set_is_loading(true);
      set_errors([]);
      const data = await get_data();

      if (data instanceof Action_Error) {
        set_errors(data.messages);
        return;
      }
      
      const url = URL.createObjectURL(new Blob([JSON.stringify(data.data)], { type: "text/plain" }));
      set_data(url);
    } finally {
      set_is_loading(false);
    }
  }
  
  return (
    <div className="flex flex-col gap-2 items-center">
      <Button 
        onClick={handle_get_data}
        disabled={is_loading}
      >
        Get Data
      </Button>
      {
       errors.length > 0 ? 
       errors.map((e, i) => (
        <p 
          key={i}
          className="text-red-600 text-center"
        >
          {e}
        </p>
       )) : null
      }
      {
        !is_loading && !!data
        ?
        <a href={data} download="data.txt">
          <Button variant="outline">
            Download data
          </Button>
        </a>
        :
        null
      }
    </div>
  );
}