import Label from "@/components/ui/label";
import { SmartDatetimeInput } from "../ui/smart-date-input";

function DateField({
  label,
  upperField,
  form,
}: {
  label: string;
  upperField: any;
  form: any;
}) {
  return (
    <div className="">
      <Label>{label}</Label>
      <div className="w-full my-2 bg-[#F8F8F8] text-gray-500 border rounded-full flex justify-start items-center">
        <SmartDatetimeInput
          value={form.watch(upperField.name)}
          onValueChange={(value: any) => {
            form.setValue(upperField.name, value);
          }}
          placeholder="e.g. Tomorrow morning 9am"
        />
      </div>
      {form.formState.errors[upperField.name]?.message && (
        <p className="text-red-500">
          {String(form.formState.errors[upperField.name]?.message)}
        </p>
      )}
    </div>
  );
}

export default DateField;
