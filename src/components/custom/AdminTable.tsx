// import * as XLSX from "xlsx";

// import {
//   TableHeader,
//   TableRow as TR,
//   TableCell as TC,
//   TableBody,
//   Table,
//   TableHead,
//   TableCaption,
//   // TableFooter,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Combobox,
//   ComboboxContent,
//   ComboboxEmpty,
//   ComboboxInput,
//   ComboboxItem,
//   ComboboxList,
// } from "@/components/ui/combobox";

// import { DropdownMenu , DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger  } from "@/components/ui/dropdown-menu";

// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
//   SlidersHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// type FilterType =
//   | "equals"
//   | "doesn't equal"
//   | "contains"
//   | "doesn't contain"
//   | "more than"
//   | "less than";
// import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { average, finalAverage, getIndex, isExempted, myRounder } from "@/lib/data-table-helpers";

import MyTableHeader from "./data-table/MyTableHeader";
import MyTableFooter from "./data-table/MyTableFooter";
import MyTable from "./data-table/MyTable";

export default function AdminTable() {
  
  return (
    <div className="space-y-4">
      <MyTableHeader />
      <div className="rounded-2xl border-2 flex flex-col ">
        <div className="overflow-auto flex-1 rounded-t-2xl border-2 ">
          <MyTable />
        </div>
        <MyTableFooter />
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   type ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerDescription,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import * as XLSX from "xlsx";

// import {
//   Table,
//   TableBody,
//   TC,
//   TableHead,
//   TableHeader,
//   TR,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { type Student, type Subjects } from "./types";

// /* ---------------- SUBJECTS ---------------- */

// const ALL_SUBJECTS: Subjects[] = [
//   "mathematics",
//   "physics",
//   "chemistry",
//   "biology",
//   "arabic",
//   "english",
//   "french",
//   "religous education",
//   "art",
//   "physical education",
//   "kurdish",
//   "geography",
//   "computer",
//   "crimes",
//   "moral education",
// ];

// /* ---------------- COMPONENT ---------------- */

// export function StudentTable({ data }: { data: Student[] }) {
//   const [tableData, setTableData] = useState<Student[]>(data);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [selectedSubject, setSelectedSubject] =
//     useState<Subjects>("mathematics");
//   useEffect(() => {
//     setTableData(data);
//   }, [data]);
//   /* ----------- UPDATE GRADE ----------- */

//   function updateGrade(
//     rowIndex: number,
//     subject: Subjects,
//     field: "first" | "half" | "second" | "final",
//     value: number,
//   ) {
//     setTableData((old) =>
//       old.map((row, index) => {
//         if (index !== rowIndex) return row;

//         return {
//           ...row,
//           grades: {
//             ...row.grades,
//             subjects: {
//               ...row.grades?.subjects,
//               [subject]: {
//                 ...row.grades?.subjects?.[subject],
//                 [field]: value,
//               },
//             },
//           },
//         };
//       }),
//     );
//   }

//   /* ----------- GRADE COLUMN ----------- */

//   function gradeColumn(
//     subject: Subjects,
//     field: "first" | "half" | "second" | "final",
//   ): ColumnDef<Student> {
//     return {
//       id: `${subject}-${field}`,
//       header: `${subject} ${field}`,
//       accessorFn: (row) => row.grades?.subjects?.[subject]?.[field] ?? "",
//       cell: ({ row, getValue }) => {
//         const value = getValue<number>() ?? "";

//         return (
//           <Input
//             type="number"
//             value={value}
//             className="w-20"
//             onChange={(e) =>
//               updateGrade(row.index, subject, field, Number(e.target.value))
//             }
//           />
//         );
//       },
//     };
//   }

//   /* ----------- BUILD COLUMNS ----------- */

//   const columns = React.useMemo<ColumnDef<Student>[]>(() => {
//     const base: ColumnDef<Student>[] = [
//       {
//         header: "#",
//         accessorFn: (_row, i) => i + 1,
//       },
//       {
//         header: "Name",
//         accessorFn: (row) => row.personalInfo.name,
//       },
//       {
//         header: "Stage",
//         accessorFn: (row) => row.academicInfo.currentStage,
//       },
//       {
//         header: "Class",
//         accessorFn: (row) => row.academicInfo.currentClass,
//       },
//     ];

//     const subjectColumns: ColumnDef<Student>[] = [
//       gradeColumn(selectedSubject, "first"),
//       gradeColumn(selectedSubject, "half"),
//       gradeColumn(selectedSubject, "second"),
//       gradeColumn(selectedSubject, "final"),
//     ];

//     return [...base, ...subjectColumns];
//   }, [selectedSubject]);

//   /* ----------- TABLE INSTANCE ----------- */

//   const table = useReactTable({
//     data: tableData,
//     columns,
//     state: { globalFilter },
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: { pageSize: 10 },
//     },
//   });

//   /* ----------- EXPORT ----------- */

//   function exportExcel() {
//     const flat = tableData.map((student, index) => {
//       const row: any = {
//         Index: index + 1,
//         Name: student.personalInfo.name,
//         Stage: student.academicInfo.currentStage,
//         Class: student.academicInfo.currentClass,
//       };

//       for (const subject of ALL_SUBJECTS) {
//         const g = student.grades?.subjects?.[subject];
//         if (!g) continue;

//         row[`${subject} first`] = g.first;
//         row[`${subject} half`] = g.half;
//         row[`${subject} second`] = g.second;
//         row[`${subject} final`] = g.final;
//       }

//       return row;
//     });

//     const ws = XLSX.utils.json_to_sheet(flat);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   }

//   /* ----------- RENDER ----------- */

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-4 items-center">
//         <Input
//           placeholder="Search..."
//           value={globalFilter}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//           className="max-w-sm"
//         />

//         <Select
//           value={selectedSubject}
//           onValueChange={(value) => setSelectedSubject(value as Subjects)}
//         >
//           <SelectTrigger className="w-50">
//             <SelectValue placeholder="Select subject" />
//           </SelectTrigger>
//           <SelectContent>
//             {ALL_SUBJECTS.map((subject) => (
//               <SelectItem key={subject} value={subject}>
//                 {subject}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Button onClick={exportExcel}>Export Excel</Button>
//       </div>
//       <div className="rounded-2xl border-2 overflow-auto">
//         <Table className="w-343.5 h-131.5">
//           <TableHeader className="">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TR key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     onClick={header.column.getToggleSortingHandler()}
//                     className="cursor-pointer whitespace-nowrap border-2 "
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </TableHead>
//                 ))}
//               </TR>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.map((row) => {
//               const student = row.original;

//               return (
//                 <Drawer key={row.id}>
//                   <TR>
//                     {row.getVisibleCells().map((cell, cellIndex) => {
//                       const isIndexColumn = cellIndex === 0; // first column (#)

//                       return (
//                         <TC
//                           key={cell.id}
//                           className="whitespace-nowrap border-2"
//                         >
//                           {isIndexColumn ? (
//                             <DrawerTrigger asChild>
//                               <button className="text-blue-600 hover:underline cursor-pointer">
//                                 {flexRender(
//                                   cell.column.columnDef.cell,
//                                   cell.getContext(),
//                                 )}
//                               </button>
//                             </DrawerTrigger>
//                           ) : (
//                             flexRender(
//                               cell.column.columnDef.cell,
//                               cell.getContext(),
//                             )
//                           )}
//                         </TC>
//                       );
//                     })}
//                   </TR>

//                   <DrawerContent className="max-h-[90vh] overflow-y-auto">
//                     <DrawerHeader>
//                       <DrawerTitle>{student.personalInfo.name}</DrawerTitle>
//                       <DrawerDescription>
//                         Full Student Information
//                       </DrawerDescription>
//                     </DrawerHeader>

//                     <div className="p-6 space-y-4">
//                       <div>
//                         <h3 className="font-semibold mb-2">Personal Info</h3>
//                         <p>
//                           <strong>DOB:</strong> {student.personalInfo.DOB}
//                         </p>
//                         <p>
//                           <strong>Address:</strong>{" "}
//                           {student.personalInfo.address}
//                         </p>
//                         <p>
//                           <strong>Phone:</strong> {student.personalInfo.phone}
//                         </p>
//                         <p>
//                           <strong>Notes:</strong>{" "}
//                           {student.personalInfo.notes || "—"}
//                         </p>
//                       </div>

//                       <div>
//                         <h3 className="font-semibold mb-2">Academic Info</h3>
//                         <p>
//                           <strong>Stage:</strong>{" "}
//                           {student.academicInfo.currentStage}
//                         </p>
//                         <p>
//                           <strong>Class:</strong>{" "}
//                           {student.academicInfo.currentClass}
//                         </p>
//                         <p>
//                           <strong>Role:</strong>{" "}
//                           {student.academicInfo.classRole}
//                         </p>
//                         <p>
//                           <strong>Status:</strong> {student.academicInfo.status}
//                         </p>
//                         <p>
//                           <strong>Total Absences:</strong>{" "}
//                           {student.totalAbsences}
//                         </p>
//                       </div>
//                     </div>
//                   </DrawerContent>
//                 </Drawer>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between">
//         <Button
//           variant="secondary"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>

//         <span className="text-sm">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>

//         <Button
//           variant="secondary"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
("use client");
//  if (subject == "mathematics") return (
//     <>
//      <div className="space-y-4">
//        <div className="flex gap-4 items-center">
//          <Input
//            placeholder="Search..."
//           //  value={globalFilter}
//           //  onChange={(e) => setGlobalFilter(e.target.value)}
//            className="max-w-sm"
//          />
//          <Select
//            value={subject}
//            onValueChange={(value) => setSubject(value as Subjects)}
//          >
//            <SelectTrigger className="w-50">
//              <SelectValue placeholder="Select subject" />
//            </SelectTrigger>
//            <SelectContent>
//              {ALL_SUBJECTS.map((subject) => (
//                <SelectItem key={subject} value={subject}>
//                  {subject}
//                </SelectItem>
//              ))}
//            </SelectContent>
//          </Select>
//          <Button onClick={exportExcel}>Export Excel</Button>
//        </div>
//       <Suspense fallback={(<Table>hi</Table>)}>
//         <Table key={subject}>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TR key={headerGroup.id} className="w-343.5 h-12">
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                   </TableHead>
//                 ))}
//               </TR>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TR key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TC key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TC>
//                 ))}
//               </TR>
//             ))}
//           </TableBody>
//           <TableFooter />
//           <TableCaption />
//         </Table>
//       </Suspense>
//       </div>
//       </>
//   );
("else");
{
  /* <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-18 data-size:h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */
}

{
  /* <Popover>
                        <PopoverTrigger>
                          <Input
                            placeholder="Search column..."
                            value={tempPaginationPageSize}
                            type="number"
                            min={0}
                            onChange={(e)=> setTempPaginationPageSize(parseInt(e.currentTarget.value))}
                            onBlur={() =>
                              setPagination((prev) => {
                                return {
                                  ...prev,
                                  pageSize: tempPaginationPageSize,
                                };
                              })
                            }
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandList>
                              {suggestions.map((s) => (
                                <CommandItem
                                  key={s}
                                  onSelect={() =>{
                                    setPagination((prev) => {
                                      return { ...prev, pageSize: s };
                                    })
                                  setTempPaginationPageSize(s)}
                                  }
                                >
                                  {s}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover> */
}
