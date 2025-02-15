import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";
import Marquee from "@/components/ui/Marquee";
import { FolderArchive } from "lucide-react";

interface DataTableProps<TData, TValue> {
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
  hideCountsPerPage?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pages,
  emptyText,
}: DataTableProps<TData, TValue>) {
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
      <div className="rounded-md border text-right overflow-y-scroll">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {table.getRowModel().rows?.length > 0 && (
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.getValue() === "string" &&
                      (cell.getValue() as string)?.length > 250 ? (
                        <Marquee
                          text={cell.getValue() as string}
                          direction="right"
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {!table.getRowModel().rows?.length && (
          <div className="flex flex-col justify-center items-center p-5 h-full">
            <FolderArchive className="w-[200px] h-[200px]" />
            <h1 className="text-2xl font-bold mt-3">
              {t("common.notFound")} {emptyText}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
