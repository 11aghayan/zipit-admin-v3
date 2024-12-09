import { object, string, z } from "zod";
 
export const signin_schema = object({
  username: string({ required_error: "Մուտքանունը բացակայում է", invalid_type_error: "type is not string" })
    .min(1, "Մուտքանունը բացակայում է"),
  password: string({ required_error: "Գաղտնաբառը բացակայում է", invalid_type_error: "type is not string" })
    .trim()
    .min(1, "Գաղտնաբառը բացակայում է")
});

export const change_password_schema = object({
  password: string({ required_error: "Գաղտնաբառը բացակայում է" })
    .min(1, "Գաղտնաբառը բացակայում է"),
  new_password: string({ required_error: "Նոր գաղտնաբառը բացակայում" })
    .min(1, "Նոր գաղտնաբառը բացակայում")
    .min(8, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն")
    .max(32, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն"),
  new_password_repeat: string({ required_error: "Նոր գաղտնաբառը բացակայում" })
    .min(1, "Նոր գաղտնաբառը բացակայում")
    .min(8, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն")
    .max(32, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն")
});

export const category_schema = object({
  label_am: string({ required_error: "Հայերեն անվանումը բացակայում է" })
    .min(1, "Հայերեն անվանումը բացակայում է"),
  label_ru: string({ required_error: "Ռուսերեն անվանումը բացակայում է" })
    .min(1, "Ռուսերեն անվանումը բացակայում է")
});