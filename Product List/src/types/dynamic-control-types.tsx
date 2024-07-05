import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "select" | "number" | "checkbox";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DynamicFieldData {
  label: string;
  type: ControlType;
  name: string;
  placeholder?: string
  value?: any;
  options?: SelectOption[];
  config?: RegisterOptions;
}