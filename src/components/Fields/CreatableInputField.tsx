import React from "react";
import Label from "../ui/label";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";

function CreatbleInputField({
  label,
  placeHolder,
  upperField,
  form,
  updateConstraints,
  t,
}: {
  label: string;
  placeHolder: string;
  upperField: any;
  form: any;
  updateConstraints: any;
  t: any;
}) {
  return (
    <div className="my-2">
      <Label>{label}</Label>
      <div className="flex flex-col gap-2">
        {(form.watch(upperField.name) || [""]).map(
          (item: any, index: number) => (
            <div className="flex items-center gap-2">
              <input
                autoComplete="off"
                className={`w-full
         bg-[#F8F8F8] p-2 
            placeholder:text-muted-foreground 
            placeholder:text-gray-400  
            focus-visible:outline-none 
            disabled:cursor-not-allowed disabled:opacity-50`}
                placeholder={placeHolder}
                disabled={!updateConstraints.canUpdateData}
                onChange={(e) => {
                  let newList = form.watch(upperField.name) || [""];
                  newList[index] = e.target.value;
                  form.setValue(upperField.name, newList, {
                    shouldValidate: true,
                  });
                }}
                value={item}
              />
              {index !== 0 && (
                <Button
                  variant={"outline"}
                  className="bg-red-400 text-white rounded-2xl"
                  onClick={() => {
                    let newList = form.watch(upperField.name) || "";
                    newList.splice(index, 1);
                    form.setValue(upperField.name, newList);
                  }}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              )}
              {index === (form.watch(upperField.name) || [""]).length - 1 && (
                <Button
                  variant={"outline"}
                  className="bg-primary-main text-white rounded-2xl"
                  onClick={() => {
                    let newList = form.watch(upperField.name) || "";
                    form.setValue(upperField.name, [...newList, ""]);
                  }}
                >
                  {t(`industrialModel.addAnotherDesigner`)}
                </Button>
              )}
            </div>
          )
        )}
      </div>
      {form.formState.errors[upperField.name]?.message && (
        <p className="text-red-500">
          {String(form.formState.errors[upperField.name]?.message)}
        </p>
      )}
    </div>
  );
}

export default CreatbleInputField;
