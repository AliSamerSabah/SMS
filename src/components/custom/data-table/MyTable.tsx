import { Table, TableBody, TableCaption, TableHead, TableHeader , TableCell as TC , TableRow as TR } from "@/components/ui/table";
import { useTableContext } from "@/hooks/useTableContext";
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";



export default function MyTable() {
  const tc = useTableContext()
  if (tc.data.data.length === 0) return <div className="font-extrabold text-5xl h-50 flex justify-center items-center">No Data</div> 
  return (
    <Table>
      <TableCaption className="pb-5">
        A list of all of the students' information and grades of the {tc.classRoom.classRoom.grades} grade of class {tc.classRoom.classRoom.classes} in {tc.subject.subject} .
      </TableCaption>
      {/* w-343.5 h-131.5 */}
      <TableHeader>
        <TR key={tc.table.getHeaderGroups()[0].id}>
          {tc.table.getHeaderGroups()[0].headers.map((header) => (
            <TableHead
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="whitespace-nowrap border "
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TR>
      </TableHeader>
      <TableBody>
        {tc.loading.isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <TR key={i}>
              {Array.from({ length: tc.columns.columns.length }).map((_, j) => (
                <TC key={j}>
                  <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                </TC>
              ))}
            </TR>
          ))
        ) : (
          <>
            {/* TOP PINNED ROWS */}
            {tc.table.getTopRows().map((row) => (
              <TR
                key={row.id}
                className={cn(
                  "hover:bg-primary/30 even:bg-foreground/30 border-4 border-amber-400",
                  row.getIsSelected()
                    ? "bg-purple-800! text-white hover:opacity-80"
                    : "",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TC key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TC>
                ))}
              </TR>
            ))}
            {/* NORMAL ROWS */}
            {tc.table.getCenterRows().map((row) => (
              <TR
                key={row.id}
                className={cn(
                  "hover:bg-primary/30 even:bg-foreground/30 border ",
                  row.getIsSelected()
                    ? "bg-purple-800! text-white hover:opacity-80"
                    : "",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TC key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TC>
                ))}
              </TR>
            ))}
            {/* BOTTOM PINNED ROWS */}
            {tc.table.getBottomRows().map((row) => (
              <TR
                key={row.id}
                className={cn(
                  "hover:bg-primary/30 even:bg-foreground/30 border-4! border-amber-400!",
                  row.getIsSelected()
                    ? "bg-purple-800! text-white hover:opacity-80"
                    : "",
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TC key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TC>
                ))}
              </TR>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
