export type FormField = {
  type: string;
  name: string;
  label: string;
};

export type FormStep = {
  step: number;
  fields: FormField[];
};

export type SteppedFormConfig = FormStep[];
export type SingleFormConfig = FormField[];
