import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { T_Min_Order_Unit, T_Size_Unit, T_Special_Group } from "@/app/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function size_unit_map(unit: T_Size_Unit) {
  const map = {
    mm: "մմ",
    cm: "սմ",
    m: "մ"
  };
  
  if (unit in map) {
    return map[unit];
  }

  return unit;
}

export function min_order_unit_map(unit: T_Min_Order_Unit) {
  const map = {
    pcs: "հատ",
    cm: "սմ",
    box: "տուփ",
    roll: "գլորում"
  };

  if (unit in map) {
    return map[unit];
  }

  return unit;
}

export function special_group_map(special_group: T_Special_Group | null) {
  const map = {
    prm: "Զեղչ",
    new: "Նոր",
    liq: "Լիկվիդացիա"
  };

  if (special_group === null) {
    return "Առանց հատուկ խմբի";
  }

  return map[special_group];
}