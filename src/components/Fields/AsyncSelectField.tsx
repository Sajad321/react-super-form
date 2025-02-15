import React from "react";
import Label from "../ui/label";
import AsyncSelect from "react-select/async";
import debounce from "lodash.debounce";

function AsyncSelectField({
  label,
  placeHolder,
  upperField,
  form,
  updateConstraints,
  setFieldsStateSection,
  index,
  fieldIndex,
}: {
  label: string;
  placeHolder: string;
  upperField: any;
  form: any;
  updateConstraints: any;
  setFieldsStateSection: any;
  index: number;
  fieldIndex: number;
}) {
  return (
    <div className="my-2 relative">
      <Label>{label}</Label>
      <div className="relative">
        <AsyncSelect
          name={placeHolder}
          onChange={(selectedOption) =>
            form.setValue(upperField.name, selectedOption?.value, {
              shouldValidate: true,
            })
          }
          value={
            typeof form.watch(upperField.name) === "object"
              ? {
                  value: form.watch(upperField.name)?.id,
                  label: form.watch(upperField.name)?.name,
                }
              : upperField.options?.find(
                  (option: any) => option.value === form.watch(upperField.name)
                )
          }
          isDisabled={!updateConstraints.canUpdateData}
          loadOptions={debounce((inputValue: any, callback: any) => {
            upperField.loadOptions
              ? upperField.loadOptions(inputValue).then((data: any) => {
                  setFieldsStateSection(index, fieldIndex, {
                    ...upperField,
                    options:
                      data.data.map((item: any) => ({
                        value: item.id,
                        label: item.name,
                      })) || [],
                  });
                  callback(
                    data?.data.map((item: any) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  );
                })
              : [];
          }, 300)}
          placeholder={placeHolder}
          defaultOptions={upperField.options}
          className="pl-8" // Add padding for the button space
        />
        {form.watch(upperField.name) && (
          <button
            type="button"
            onClick={() => form.setValue(upperField.name, null)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default AsyncSelectField;
