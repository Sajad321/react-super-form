import React from "react";
import { DataTable } from "@/components/ui/data-table";

import DynamicFormWithDialog from "@/components/DynamicFormWithDialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DataCard } from "@/components/ui/data-card";

function TableField({
  serviceType,
  upperField,
  form,
  updateConstraints,
  t,
  open,
  setOpen,
  setFieldsStateSection,
  index,
  fieldIndex,
  isEdit,
  tenantId,
}: {
  serviceType: string;
  upperField: any;
  form: any;
  updateConstraints: any;
  t: any;
  open: boolean;
  setOpen: any;
  setFieldsStateSection: any;
  index: number;
  fieldIndex: number;
  isEdit: boolean;
  tenantId: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const processField = (field: any) => {
    const processed = {
      ...field,
      name: `table/${field.name}`,
      conditional: field.conditional
        ? {
            field: `table/${field.conditional?.field}`,
            value: field.conditional?.value,
          }
        : null,
    };

    if (field.fields) {
      processed.fields = field.fields.map(processField);
    }

    return processed;
  };

  return (
    <div className="my-2">
      <h1 className="text-start text-2xl font-bold mt-4">
        {t(`${serviceType}.${upperField.name}`)}
      </h1>
      {updateConstraints.canUpdateData && (
        <div className="flex justify-end items-end my-2">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant={"outline"}
            className="bg-primary-main text-white rounded-2xl"
          >
            {t(`${serviceType}.add${upperField.name}`)}
          </Button>
        </div>
      )}
      <DynamicFormWithDialog
        dialogFields={
          upperField.fields?.map(processField) ??
          upperField.columns.map(processField)
        }
        open={open}
        setOpen={setOpen}
        serviceType={serviceType}
        form={form}
        updateConstraints={updateConstraints}
        t={t}
        setFieldsStateSection={setFieldsStateSection}
        index={index}
        fieldIndex={fieldIndex}
        upperField={upperField}
        isEdit={isEdit}
        tenantId={tenantId}
      />
      {!isMobile ? (
        <DataTable
          columns={[
            ...upperField.columns.map((column: any) => ({
              cell: column.accessorKey.includes("Boolean")
                ? (table: any) => t(`${String(table.getValue())}`)
                : (table: any) => table.row.original[column.accessorKey],
              ...column,
              header:
                t(`${serviceType}.${column.accessorKey}`) +
                (column.tag ? " " + column.tag : ""),
            })),
            {
              accessorKey: "actions",
              header: t("Actions"),
              cell: (table: any) => (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      setOpen(true);
                      Object.keys(
                        form.watch(upperField.name)[table.row.index]
                      ).forEach((key: any) => {
                        form.setValue(
                          `table/${key}`,
                          form.watch(upperField.name)[table.row.index][key]
                        );
                      });
                      form.setValue(`${upperField.name}_edit`, true);
                      form.setValue(
                        `${upperField.name}_index`,
                        table.row.index
                      );
                    }}
                    variant={"outline"}
                    disabled={!updateConstraints.canUpdateData}
                    className="bg-primary-main text-white rounded-2xl"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      let newList = form.watch(upperField.name) || [];
                      newList.splice(table.row.index, 1);
                      form.setValue(upperField.name, newList);
                    }}
                    variant={"outline"}
                    disabled={!updateConstraints.canUpdateData}
                    className="bg-red-500 text-white rounded-2xl"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={form.watch(upperField.name) ?? []}
          currentPage={0}
          showPagination={false}
        />
      ) : (
        <DataCard
          columns={[
            ...upperField.columns.map((column: any) => ({
              cell: column.accessorKey.includes("Boolean")
                ? (table: any) => (
                    <div>
                      {" "}
                      {t(`${serviceType}.${column.accessorKey}`)} :
                      {t(`${String(table.getValue())}`)}{" "}
                    </div>
                  )
                : (table: any) => (
                    <div>
                      {" "}
                      {t(`${serviceType}.${column.accessorKey}`)} :
                      {table.row.original[column.name]}{" "}
                    </div>
                  ),
              ...column,
              header:
                t(`${serviceType}.${column.accessorKey}`) +
                (column.tag ? " " + column.tag : ""),
            })),
            {
              accessorKey: "actions",
              header: t("Actions"),
              cell: (table: any) => (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      setOpen(true);
                      upperField.fields
                        ? upperField.fields.forEach((column: any) => {
                            form.setValue(
                              `table/${column.name}`,
                              form.watch(upperField.name)[table.row.index][
                                column.name
                              ]
                            );
                          })
                        : upperField.columns.forEach((column: any) => {
                            form.setValue(
                              `table/${column.name}`,
                              form.watch(upperField.name)[table.row.index][
                                column.name
                              ]
                            );
                          });
                      form.setValue(`${upperField.name}_edit`, true);
                      form.setValue(
                        `${upperField.name}_index`,
                        table.row.index
                      );
                    }}
                    variant={"outline"}
                    disabled={!updateConstraints.canUpdateData}
                    className="bg-primary-main text-white rounded-2xl"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      let newList = form.watch(upperField.name) || [];
                      newList.splice(table.row.index, 1);
                      form.setValue(upperField.name, newList);
                    }}
                    variant={"outline"}
                    disabled={!updateConstraints.canUpdateData}
                    className="bg-red-500 text-white rounded-2xl"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={form.watch(upperField.name) ?? []}
          currentPage={0}
          showPagination={false}
        />
      )}
    </div>
  );
}

export default TableField;
