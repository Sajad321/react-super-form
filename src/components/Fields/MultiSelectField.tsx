import React from "react";
import Label from "@/components/ui/label";
import ReactSelect from "react-select";

function MultiSelectField({
  serviceType,
  placeHolder,
  label,
  upperField,
  form,
  updateConstraints,
  t,
}: {
  serviceType: string;
  placeHolder: string;
  label: string;
  upperField: any;
  form: any;
  updateConstraints: any;
  t: any;
}) {
  return (
    <div className="my-2">
      <Label>{label}</Label>
      <ReactSelect
        isMulti={true}
        value={upperField.options
          ?.map((option: any) => ({
            ...option,
            label: t(`${serviceType}.${option.label}`),
          }))
          .filter((option: any) =>
            form.watch(upperField.name)?.includes(option.value)
          )}
        onChange={(selectedOptions) =>
          form.setValue(
            upperField.name,
            selectedOptions.map((option) => option.value),
            { shouldValidate: true }
          )
        }
        isDisabled={!updateConstraints.canUpdateData}
        options={upperField.options?.map((option: any) => ({
          ...option,
          label: t(`${serviceType}.${option.label}`),
        }))}
        placeholder={placeHolder}
        classNamePrefix="react-select"
        className="my-2"
      />
      {form.formState.errors[upperField.name]?.message && (
        <p className="text-red-500">
          {String(form.formState.errors[upperField.name]?.message)}
        </p>
      )}
    </div>
  );
}

export default MultiSelectField;
