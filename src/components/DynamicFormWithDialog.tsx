import { DrawerDialog } from "@/components/ui/dialog-drawer";
import { Button } from "@/components/ui/button";
import { generateFormFields } from "./formBuilder";

const DynamicFormWithDialog = ({
  dialogFields,
  open,
  serviceType,
  form,
  updateConstraints,
  setOpen,
  t,
  setFieldsStateSection,
  index,
  fieldIndex,
  upperField,
  isEdit,
}: {
  dialogFields: any;
  serviceType: string;
  form: any;
  updateConstraints: {
    canUpdateFiles: boolean;
    canUpdateData: boolean;
  };
  setOpen: (open: boolean) => void;
  open: boolean;
  t: any;
  setFieldsStateSection: (
    index: number,
    fieldIndex: number,
    field: any
  ) => void;
  index: number;
  fieldIndex: number;
  upperField: any;
  isEdit: boolean;
}) => {
  return (
    <DrawerDialog open={open} setOpen={setOpen}>
      <div className="flex flex-col space-y-[5px]">
        {generateFormFields({
          serviceType,
          form,
          fields: dialogFields,
          index,
          setFieldsStateSection,
          t,
          updateConstraints,
          setOpen,
          open,
          isEdit,
        })}
      </div>
      <Button
        variant={"outline"}
        className="bg-primary-main text-white rounded-2xl mt-4"
        onClick={() => {
          const dialogFieldValues = dialogFields.reduce(
            (acc: any, field: any) => {
              if (field.type === "grid-group") {
                field.fields.forEach((subField: any) => {
                  acc[subField.name] = form.getValues(subField.name);
                });
              } else {
                acc[field.name] = form.getValues(field.name);
              }
              return acc;
            },
            {}
          );

          const isValid = dialogFields.every((field: any) => {
            if (field.conditional) {
              const controllingFieldValue = form.getValues(
                field.conditional.field
              );
              const conditionMet =
                controllingFieldValue === field.conditional.value;
              if (!conditionMet) {
                return true;
              }
            }
            if (field.type === "grid-group") {
              field.fields.forEach((subField: any) => {
                const value = form.getValues(subField.name);
                const validation = subField.validation.safeParse(value);
                if (!validation.success) {
                  form.setError(subField.name, {
                    message: validation.error.errors[0].message,
                  });
                  return false;
                }
              });
            } else {
              const value = form.getValues(field.name);
              const validation = field.validation.safeParse(value);
              if (!validation.success) {
                form.setError(field.name, {
                  message: validation.error.errors[0].message,
                });
                return false;
              }
            }
            return true;
          });

          if (isValid) {
            if (form.watch(`${upperField.name}_edit`)) {
              let newList = form.watch(upperField.name) || [];
              newList[form.watch(`${upperField.name}_index`)] = {
                ...Object.keys(dialogFieldValues).reduce((acc, key) => {
                  acc[key.replace("table/", "")] = dialogFieldValues[key];
                  return acc;
                }, {} as Record<string, any>),
                id: newList[form.watch(`${upperField.name}_index`)].id,
              };

              form.setValue(upperField.name, newList);
            } else {
              form.setValue(upperField.name, [
                ...form.watch(upperField.name),
                Object.keys(dialogFieldValues).reduce((acc, key) => {
                  acc[key.replace("table/", "")] = dialogFieldValues[key];
                  return acc;
                }, {} as Record<string, any>),
              ]);
            }
            const clearFields = (fields: any[]) => {
              fields.forEach((field: any) => {
                if (field.fields) {
                  clearFields(field.fields);
                } else {
                  form.setValue(field.name, undefined);
                }
              });
            };
            clearFields(dialogFields);
            form.setValue(`${upperField.name}_edit`, false);
            form.setValue(`${upperField.name}_index`, undefined);
            setOpen(false);
          }
        }}
      >
        {form.watch(`${upperField.name}_edit`) ? "تعديل" : "اضافة"}
      </Button>
    </DrawerDialog>
  );
};

export default DynamicFormWithDialog;
