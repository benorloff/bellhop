"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { CheckCircleIcon, CircleEllipsisIcon, Clock10Icon, RefreshCcwIcon, StopCircleIcon, XCircleIcon } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "../ui/button";

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

const statuses = [
    {
      value: "paid",
      label: "Paid",
      icon: CheckCircleIcon,
    },
    {
      value: "open",
      label: "Open",
      icon: Clock10Icon,
    },
    {
      value: "draft",
      label: "Draft",
      icon: CircleEllipsisIcon,
    },
    {
      value: "uncollectible",
      label: "Uncollectible",
      icon: StopCircleIcon,
    },
    {
      value: "void",
      label: "Void",
      icon: XCircleIcon,
    },
]

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between py-4">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Search for an invoice..."
              value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("number")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={statuses}
              />
            )}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <RefreshCcwIcon className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          {/* <DataTableViewOptions table={table} /> */}
        </div>
      )
}