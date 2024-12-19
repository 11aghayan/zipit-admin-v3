import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { T_Item, T_Min_Order_Unit, T_Size_Unit, T_Special_Group } from "@/app/types";

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
    roll: "գլանափաթէթ",
    m: "մ"
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

export function generate_temp_id() {
  return Math.round(Math.random() * 1_000_000);
}

export function append_temp_id(item: T_Item<"full">) {
  return {
    ...item,
    variants: item.variants.map(v => ({ ...v, temp_id: generate_temp_id() }))
  }
}

export function get_numeric(val: string) {
  if (val.length < 1) return "";
  if (val.at(-1) === ",") {
    if (val.includes(".")) {
      return val.slice(0, -1);
    }
    if (val.length === 1) {
      return "0.";
    }
    return val.slice(0, -1) + ".";
  }
  if (val.at(-1) === ".") {
    if (val.indexOf(".") !== val.length - 1) {
      return val.slice(0, -1);
    }
    if (val.length === 1) {
      return "0.";
    }
    return val;
  }
  if (isNaN(Number(val))) return val.slice(0, -1);
  if (val.at(-1) === "-") return val.slice(0, -1);
  if (val === "00") return "0";
  return val;
}