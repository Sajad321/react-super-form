import { UseFormReturn } from "react-hook-form";
import InputIcon from "@/components/ui/InputIcon";
import ReactSelect from "react-select";
import Label from "@/components/ui/label";
import Checkbox from "@/components/ui/checkbox";
import RadioField from "./Fields/RadioField";
import MultiSelectField from "./Fields/MultiSelectField";
import AsyncSelectField from "./Fields/AsyncSelectField";
import TableField from "./Fields/TableField";
import DateField from "./Fields/DateField";
import FileField from "./Fields/FileField";
import { cn } from "@/lib/utils";

export function generateFormFields({
  serviceType,
  form,
  fields,
  index,
  setFieldsStateSection,
  t,
  updateConstraints,
  setOpen,
  open,
  isEdit,
}: {
  serviceType: string;
  form: UseFormReturn<any>;
  fields: {
    name: string;
    type?: string;
    validation?: any;
    icon?: string;
    options?: { value: string; label: string; details?: string }[];
    conditional?: {
      field: string;
      value: string;
    };
    fields?: any;
    loadOptions?: (inputValue: string) => Promise<any[]>;
    link?: string;
    downloadLink?: string;
    instructionText?: string | string[];
    description?: string;
    title?: string;
    minDate?: any;
    maxSize?: number;
    fileTypes?: string[];
    columns?: any;
    data?: any;
    currentPage?: number;
    checkChassis?: (id: string) => Promise<any>;
    placeHolder?: string;
    flexCol?: boolean;
    refine?: (form: any) => void;
    upperNotes?: string[];
    exampleFile?: string;
    maxLength?: number;
    min?: number;
    tenantId?: string;
    className?: string;
    max?: any;
    tag?: string;
    flat?: boolean;
    note?: string;
    notes?: string[];
    labelOff?: boolean;
  }[];
  index: number;
  setFieldsStateSection: (
    index: number,
    fieldIndex: number,
    field: any
  ) => void;
  t: any;
  updateConstraints: {
    canUpdateFiles: boolean;
    canUpdateData: boolean;
  };
  setOpen: (open: boolean) => void;
  open: boolean;
  isEdit: boolean;
}) {
  return fields.map((upperField, fieldIndex) => {
    let label;
    if (upperField?.name?.includes("table/")) {
      label = t(`${serviceType}.${upperField.name.replace("table/", "")}`);
    } else {
      label = t(`${serviceType}.${upperField.name}`);
    }
    const placeHolder = upperField.placeHolder || label;
    if (upperField.conditional) {
      const { field: conditionalField, value: conditionalValue } =
        upperField.conditional;
      const conditionalFieldValue = form.watch(conditionalField);
      if (conditionalFieldValue !== conditionalValue) {
        return null;
      }
    }
    switch (upperField.type) {
      case "string":
        return (
          <div className="flex flex-col">
            <InputIcon
              key={upperField.name}
              placeholder={placeHolder}
              value={form.watch(upperField.name)}
              onChange={(e) => {
                if (e.target.value == "") {
                  form.setValue(upperField.name, "", {
                    shouldValidate: true,
                  });
                } else {
                  form.setValue(upperField.name, e.target.value, {
                    shouldValidate: true,
                  });
                }
              }}
              name={upperField.name}
              error={form.formState.errors[upperField.name]?.message as string}
              icon={upperField.icon || null}
              divClassName="my-2"
              label={label}
              type={"text"}
              disabled={!updateConstraints.canUpdateData}
            />
          </div>
        );
      case "number":
        return (
          <div className="flex flex-col">
            <InputIcon
              key={upperField.name}
              placeholder={placeHolder}
              name={upperField.name}
              note={
                upperField.name == "capitalInt"
                  ? t(`${serviceType}.capitalIntMin`)
                  : undefined
              }
              value={form.watch(upperField.name)}
              onKeyDown={(e) => {
                const arabicNumbers = /[\u0660-\u0669]/;
                if (
                  !(
                    /^\d$/.test(e.key) ||
                    arabicNumbers.test(e.key) ||
                    e.key === "Backspace" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight"
                  )
                ) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^\d٠-٩0-9]/g, "");
                if (numericValue !== "") {
                  if (upperField.min && Number(numericValue) < upperField.min) {
                    form.setError(upperField.name, {
                      message: `القيمة المدخلة أقل من القيمة الأدنى المسموح بها`,
                    });
                  } else {
                    form.setValue(upperField.name, numericValue, {
                      shouldValidate: true,
                    });
                    form.clearErrors(upperField.name);
                  }
                } else {
                  form.setValue(upperField.name, undefined, {
                    shouldValidate: true,
                  });
                }
                upperField.refine?.(form);
              }}
              error={form.formState.errors[upperField.name]?.message as string}
              icon={upperField.icon || null}
              divClassName="my-2"
              label={label + (upperField.tag ? " " + upperField.tag : "")}
              type={"text"}
              disabled={!updateConstraints.canUpdateData}
            />
          </div>
        );
      case "radio":
        return (
          <RadioField
            serviceType={serviceType}
            label={label}
            upperField={upperField}
            form={form}
            updateConstraints={updateConstraints}
            t={t}
          />
        );
      case "select":
      case "select-BE":
        return (
          <div className="">
            {upperField.labelOff ? null : <Label>{label}</Label>}
            <ReactSelect
              isClearable
              value={upperField.options
                ?.map((option) => ({
                  ...option,
                  label:
                    upperField.type == "select"
                      ? t(`${serviceType}.${option.label}`)
                      : option.label,
                }))
                .find((option) => option.value === form.watch(upperField.name))}
              onChange={(selectedOption) =>
                form.setValue(upperField.name, selectedOption?.value, {
                  shouldValidate: true,
                })
              }
              isDisabled={!updateConstraints.canUpdateData}
              options={upperField.options?.map((option) => ({
                ...option,
                label:
                  upperField.type == "select"
                    ? t(`${serviceType}.${option.label}`)
                    : option.label,
              }))}
              placeholder={placeHolder}
              classNamePrefix="react-select"
              className="mt-3"
            />
            {form.formState.errors[upperField.name]?.message && (
              <p className="text-red-500">
                {String(form.formState.errors[upperField.name]?.message)}
              </p>
            )}
          </div>
        );
      case "multi-select":
        return (
          <MultiSelectField
            serviceType={serviceType}
            placeHolder={placeHolder}
            label={label}
            upperField={upperField}
            form={form}
            updateConstraints={updateConstraints}
            t={t}
          />
        );
      case "file":
        return <FileField upperField={upperField} form={form} />;
      case "date":
        return <DateField label={label} upperField={upperField} form={form} />;
      case "async-select":
        return (
          <AsyncSelectField
            label={label}
            placeHolder={placeHolder}
            upperField={upperField}
            form={form}
            updateConstraints={updateConstraints}
            setFieldsStateSection={setFieldsStateSection}
            index={index}
            fieldIndex={fieldIndex}
          />
        );
      case "group":
        return (
          <div className={"my-2"}>
            {upperField.name && (
              <h2 className="text-lg text-new-primary font-semibold text-start mb-2">
                {label}
              </h2>
            )}
            {upperField.note && (
              <p className="text-sm text-new-primary text-start">
                {upperField.note}
              </p>
            )}
            <div
              className={`${
                upperField.className && upperField.className
              } flex flex-col`}
            >
              {generateFormFields({
                serviceType,
                form,
                fields: upperField.fields,
                index,
                setFieldsStateSection,
                t,
                updateConstraints,
                setOpen,
                open,
                isEdit,
              })}
            </div>
          </div>
        );
      case "grid-group":
        const formFieldsGenerator: any = generateFormFields({
          serviceType,
          form,
          fields: upperField.fields,
          index,
          setFieldsStateSection,

          t,
          updateConstraints,
          setOpen,
          open,
          isEdit,
        });
        if (upperField.flat) {
          return (
            <div className={upperField.className}>{formFieldsGenerator}</div>
          );
        }

        return (
          <div className="flex flex-col gap-2 my-2">
            <h2 className="text-lg text-new-primary font-semibold text-start">
              {label}
            </h2>
            {upperField.note && (
              <p className="text-sm text-new-primary text-start">
                {upperField.note}
              </p>
            )}
            <div
              className={cn(
                "border-2 border-gray-300 rounded-md p-2",
                upperField.className
              )}
            >
              {formFieldsGenerator}
            </div>
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-start gap-2">
            <Checkbox
              id={upperField.name}
              value={form.watch(upperField.name)}
              checked={form.watch(upperField.name)}
              onClick={() =>
                form.setValue(upperField.name, !form.watch(upperField.name), {
                  shouldValidate: true,
                })
              }
            />
            <label
              htmlFor={upperField.name}
              className={`${
                upperField.className
                  ? upperField.className
                  : "text-sm font-medium"
              } text-start peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
              {t(`${serviceType}.${upperField.name}`)}
            </label>
          </div>
        );
      case "table":
        return (
          <TableField
            serviceType={serviceType}
            upperField={upperField}
            form={form}
            updateConstraints={updateConstraints}
            t={t}
            setOpen={setOpen}
            open={open}
            setFieldsStateSection={setFieldsStateSection}
            index={index}
            fieldIndex={fieldIndex}
            isEdit={isEdit}
          />
        );
      default:
        return null;
    }
  });
}
