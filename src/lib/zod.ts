import { number, object, string } from "zod";
 
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

export const item_add_schema = object({
  name_am: string({ required_error: "Հայերեն անունը բացակայում է" })
    .min(1, "Հայերեն անունը բացակայում է")
    .max(100, "Անունը չի կարող ունենալ ավելի քան 100 նիշ"),
  name_ru: string({ required_error: "Ռուսերեն անունը բացակայում է" })
    .min(1, "Ռուսերեն անունը բացակայում է")
    .max(100, "Անունը չի կարող ունենալ ավելի քան 100 նիշ"),
  category_id: string({ required_error: "Կատեգորիան բացակայում է" })
    .min(10, "Կատեգորիան բացակայում է"),
  variants: object({
    src: string({ required_error: "Լուսանկարը բացակայում է" })
      .min(10, "Լուսանկարը բացակայում է"),
    color_am: string({ required_error: "Հայերեն գույնը բացակայում է" })
      .min(1, "Հայերեն գույնը բացակայում է"),
    color_ru: string({ required_error: "Ռուսերեն գույնը բացակայում է" })
      .min(1, "Ռուսերեն գույնը բացակայում է"),
    min_order_value: number({ required_error: "Նվազագույն պատվերի քանակը բացակայում է", invalid_type_error: "Նվազագույն պատվերի քանակը բացակայում է" })
      .min(0, "Նվազագույն պատվերի քանակը չի կարող պակաս լինել 0-ից"),
    price: number({ required_error: "Գինը բացակայում է", invalid_type_error: "Գինը բացակայում է" })
      .min(1, "Գինը չի կարող պակաս լինել 1-ից"),
    size_value: number({ required_error: "Չափի արժեքը բացակայում է", invalid_type_error: "Չափի արժեքը բացակայում է" })
      .min(0, "Չափի արժեքը չի կարող պակաս լինել 0-ից"),
    promo: number().nullable(),
    special_group: string().nullable(),
    description_am: string().nullable(),
    description_ru: string().nullable()
  }).array().min(1)
});

export const item_edit_schema = item_add_schema.extend({ 
  id: string({ required_error: "Item ID is missing" })
    .min(1, "Item ID is missing"),
  variants: item_add_schema.shape.variants.element.extend({
    photo_id: string({ required_error: "Photo ID is missing" })
      .min(1, "Photo ID is missing"),
    color_id: string({ required_error: "Color ID is missing" })
      .min(1, "Color ID is missing"),
    size_id: string({ required_error: "Size ID is missing" })
      .min(1, "Size ID is missing"),
    item_id: string({ required_error: "Item ID is missing" })
      .min(1, "Item ID is missing"),
  }).array()
});
