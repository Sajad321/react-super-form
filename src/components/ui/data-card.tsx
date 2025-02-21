import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import Marquee from "@/components/ui/marquee";
import { FolderArchive } from "lucide-react";

interface DataCardProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pages?: number;
  currentPage: number;
  goToFirstPage?: () => void;
  goToPrevPage?: () => void;
  goToNextPage?: () => void;
  goToLastPage?: () => void;
  totalCount?: number;
  emptyText?: string;
  handleRefresh?: () => void;
  isFetching?: boolean;
  showPagination?: boolean;
}

export function DataCard<TData, TValue>({
  columns,
  data,
  pages,
  emptyText,
}: DataCardProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pages || 0,
    manualPagination: true,
  });

  const { i18n, t } = useTranslation();

  return (
    <div className="flex flex-col h-full" dir={i18n.dir()}>
      <div className="text-right">
        <div className="flex flex-wrap gap-4 p-4">
          {table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="card border rounded-2xl flex flex-col gap-4 p-4 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]"
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="card-content">
                  <div className="">
                    {typeof cell.getValue() === "string" &&
                    (cell.getValue() as string)?.length > 250 ? (
                      <Marquee
                        text={cell.getValue() as string}
                        direction="right"
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {!table.getRowModel().rows?.length && (
          <div className="flex flex-col justify-center items-center p-5 h-full">
            <FolderArchive className="w-[200px] h-[200px]" />
            <h1 className="text-2xl font-bold mt-3">
              {" "}
              {t("common.notFound")} {emptyText}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
