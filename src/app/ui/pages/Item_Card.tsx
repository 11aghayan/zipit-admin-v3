"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Delete_Modal from "@/app/ui/Delete_Modal";
import { T_ID } from "@/app/types";
import { delete_item } from "@/app/actions/item-actions";
import { Button } from "@/components/ui/button";

type Props = {
  id: T_ID;
  name: string;
  photo_id: string;
}

export default function Item_Card({ id, photo_id, name }: Props) {

  const [is_delete_modal_open, set_is_delete_modal_open] = useState(false);
  
  return (
    <Card className="h-full flex flex-col justify-between ">
      <CardContent className="px-2 pt-6 pb-2">
        <Image 
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/photo/${photo_id}?width=250&height=250`} 
          alt="Product photo" 
          width={150} 
          height={150} 
          className="m-auto rounded-md"
          loading="lazy"
        />
      </CardContent>
      <CardHeader className="flex-1">
        <CardTitle className="text-center flex flex-col justify-between h-full mb-3">
          {name}
        </CardTitle>
        <Link href={`/items/${id}`}>
          <Button className="w-full">
            Խմբագրել
          </Button>
        </Link>
          <Delete_Modal 
            id={id}
            delete_func={delete_item}
            is_open={is_delete_modal_open}
            set_is_open={set_is_delete_modal_open}
            label={name}
            title="Վստա՞հ եք, որ ցանկանում եք ջնջել ապրանքը"
            toast_msg="Ապրանքը հաջողությամբ ջնջվել է"
          />
      </CardHeader>
    </Card>
);
}