import { z } from "zod";

export type FormField = {
  type: string;
  name: string;
  placeholder?: string;
  validation?: z.ZodSchema;
  options?: string[] | { label: string; value: string }[];
};

export type FormStep = {
  step: number;
  fields: FormField[];
};

export type SteppedFormConfig = FormStep[];
export type SingleFormConfig = FormField[];
