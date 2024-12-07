import { object, string } from "zod";
 
export const signin_schema = object({
  username: string({ required_error: "Օգտատիրոջ անունը բացակայում է", invalid_type_error: "type is not string" })
    .min(1, "Օգտատիրոջ անունը բացակայում է"),
  password: string({ required_error: "Գաղտնաբառը բացակայում է", invalid_type_error: "type is not string" })
    .trim()
    .min(1, "Գաղտնաբառը բացակայում է")
});

export const change_password_schema = object({
  password: string({ required_error: "Գաղտնաբառը բացակայում է" })
    .min(1, "Գաղտնաբառը բացակայում է"),
  new_password: string({ required_error: "Նոր գաղտնաբառը բացակայում" })
    .min(8, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն")
    .max(32, "Գաղտնաբառը պետք է ունենա առնվազն 8 և առավելագույնը 32 նիշ երկարություն")
});
