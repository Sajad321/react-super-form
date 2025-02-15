import { Paperclip } from "lucide-react";
import { CloudUpload } from "lucide-react";
import {
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "../ui/file-upload";
import { FileUploader } from "../ui/file-upload";

function FileField({ upperField, form }: { upperField: any; form: any }) {
  const dropZoneConfig = {
    maxFiles: upperField.maxFiles,
    maxSize: upperField.maxSize,
    multiple: upperField.multiple,
  };
  return (
    <div key={upperField.name}>
      <div
        key={upperField.name}
        className="w-full flex flex-col items-start gap-2"
      >
        <span className="font-bold text-lg text-start">{upperField.title}</span>
        {upperField.description && (
          <span className="text-start">{upperField.description}</span>
        )}
        {Array.isArray(upperField.instructionText) ? (
          <ol className="list-decimal">
            {upperField.instructionText.map((text: string, index: number) => (
              <li key={index} className="text-start">
                {text}
              </li>
            ))}
          </ol>
        ) : (
          <span className="text-start">{upperField.instructionText}</span>
        )}
      </div>
      <FileUploader
        value={form.watch(upperField.name) || []}
        onValueChange={(data: any) => {
          form.setValue(upperField.name, data);
        }}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-lg p-2"
      >
        <FileInput
          id="fileInput"
          className="outline-dashed outline-1 outline-slate-500"
        >
          <div className="flex items-center justify-center flex-col p-8 w-full ">
            <CloudUpload className="text-gray-500 w-10 h-10" />
            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
              &nbsp; or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
        </FileInput>
        <FileUploaderContent>
          {form.watch(upperField.name) &&
            form.watch(upperField.name).length > 0 &&
            form.watch(upperField.name).map((file: any, i: any) => (
              <FileUploaderItem key={i} index={i}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>

      {form.formState.errors[upperField.name]?.message && (
        <p className="text-red-500">
          {String(form.formState.errors[upperField.name]?.message)}
        </p>
      )}
    </div>
  );
}

export default FileField;
