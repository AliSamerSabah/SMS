import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTableContext } from "@/hooks/useTableContext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRef } from "react";



export default function MyTableFooter() {
  const pageSizePicker = useRef<HTMLInputElement>(null)
  const tc = useTableContext()
  if (tc.data.data.length === 0) return <div></div> 

  return (
    <div className="border-t bg-muted/50 font-medium p-2 w-319!">
      <div className="flex w-full items-center justify-between  overflow-auto p-1 flex-row gap-8">
        <div className="flex-1 whitespace-nowrap text-muted-foreground text-sm">
          {tc.table.getFilteredSelectedRowModel().rows.length} of{" "}
          {tc.table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap font-medium text-sm">
              Rows per page
            </p>
            <Popover open={tc.open.open} onOpenChange={tc.open.setOpen}>
              <PopoverTrigger asChild>
                <Input
                  ref={pageSizePicker}
                  type="number"
                  defaultValue={tc.pagination.pagination.pageSize}
                  onFocus={() => tc.open.setOpen(true)}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={(e) => {
                    tc.pagination.setPagination({
                      ...tc.pagination.pagination,
                      pageSize:parseInt(e.currentTarget.value),
                    });
                    tc.open.setOpen(false);
                  }}
                />
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command>
                  <CommandList>
                    {tc.suggestions.map((sug, i) => (
                      <CommandItem
                        key={i}
                        onSelect={() => {
                          tc.pagination.setPagination({
                            ...tc.pagination.pagination,
                            pageSize: sug,
                          });
                          tc.open.setOpen(false);
                          if(pageSizePicker.current) pageSizePicker.current.value = sug.toString();
                        }}
                        className="flex items-center justify-between"
                      >
                        {sug}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-center">
            <span className="flex items-center justify-center gap-3">
              <span>Go to Page </span>
              <Input
                type="number"
                defaultValue={1}
                     onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Tab"
                    ) {
                      e.preventDefault();
                    }
                  }}
                className="w-14"
                onBlur={(e) => {
                  if (
                    !e.target.value ||
                    parseInt(e.target.value) > tc.table.getPageCount() ||
                    parseInt(e.target.value) === 0
                  )
                    return (e.currentTarget.value = (
                      tc.table.getState().pagination.pageIndex + 1
                    ).toString());
                  if (e.target.value) {
                    tc.table.setPageIndex(parseInt(e.target.value) - 1);
                  }
                }}
              />
            </span>
          </div>
          <div className="flex items-center justify-center font-medium text-sm">
            Page {tc.table.getState().pagination.pageIndex + 1} of{" "}
            {tc.table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => tc.table.setPageIndex(0)}
              disabled={!tc.table.getCanPreviousPage()}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => tc.table.previousPage()}
              disabled={!tc.table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => tc.table.nextPage()}
              disabled={!tc.table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() =>
                tc.table.setPageIndex(tc.table.getPageCount() - 1)
              }
              disabled={!tc.table.getCanNextPage()}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
