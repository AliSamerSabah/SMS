// import {
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   type PaginationState,
//   type RowPinningState,
// } from "@tanstack/react-table";
// import {
//   useState,
//   createContext,
//   type ReactNode,
//   useEffect,
//   useRef,
// } from "react";
// import type { AcademicStage, CDS, classes, Student, Subjects } from "@/types";
// import useAppContext from "@/hooks/useAppContext";
// import axios from "axios";

// function givTableContext() {
//   const suggestions = [5, 10, 15, 20, 25, 30, 40, 50];
//   const appContext = useAppContext();
//   const [data, setData] = useState<Student[]>([]);
//   const [classRoom, setClassRoom] = useState<{
//     classes: classes;
//     grades: AcademicStage;
//   }>({
//     classes: "A",
//     grades: "1st",
//   });
//   const [subject, setSubject] = useState<Subjects>(appContext.table.subject);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnVisibility, setColumnVisibility] = useState({
//     studentClass: false,
//     finalAverage: false,
//     studentGrade: false,

//   });
//   const computedColumnVisibility = {
//     [`Student Class ${subject}`]: columnVisibility.studentClass,
//     [`Final Average ${subject}`]: columnVisibility.finalAverage,
//     [`Student Grade ${subject}`]: columnVisibility.studentGrade,
//   };

//   const [open, setOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDirty, setIsDirty] = useState(false);
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: appContext.table.RPP,
//   });
//   const [rowPinning, setRowPinning] = useState<RowPinningState>({
//     top: [],
//     bottom: [],
//   });

//   const [columns, setColumns] = useState<CDS[]>([]);
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       globalFilter,
//       pagination,
//       columnVisibility: computedColumnVisibility,
//       rowPinning,
//     },
//     onColumnVisibilityChange: (updater) => {
//       const next =
//         typeof updater === "function"
//           ? updater(computedColumnVisibility)
//           : updater;

//       setColumnVisibility((prev) => ({
//         ...prev,
//         studentClass: next[`Student Class ${subject}`] ?? prev.studentClass,
//         finalAverage: next[`Final Average ${subject}`] ?? prev.finalAverage,
//         studentGrade: next[`Student Grade ${subject}`] ?? prev.studentGrade,
//       }));
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onPaginationChange: setPagination,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onRowPinningChange: setRowPinning,
//     enableRowPinning: true,
//   });
//   const tableVars = {
//     table,
//     columns: { columns, setColumns },
//     suggestions,
//     open: { open, setOpen },
//     pagination: { pagination, setPagination },
//     data: { data, setData },
//     dirty: { isDirty, setIsDirty },
//     subject: { subject, setSubject },
//     classRoom: { classRoom, setClassRoom },
//     columnVisibility: { columnVisibility, setColumnVisibility },
//     rowPinning: { rowPinning, setRowPinning },
//     globalFilter: { globalFilter, setGlobalFilter },
//     loading: { isLoading, setIsLoading },
//   };
//   return tableVars;
// }
// type TableContext = ReturnType<typeof givTableContext>;

// export const tableContext = createContext<TableContext | null>(null);

// export default function TableContextProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const suggestions = [5, 10, 15, 20, 25, 30, 40, 50];
//   const appContext = useAppContext();
//   const [data, setData] = useState<Student[]>([]);
//   const [classRoom, setClassRoom] = useState<{
//     classes: classes;
//     grades: AcademicStage;
//   }>({
//     classes: "A",
//     grades: "1st",
//   });
//   const [subject, setSubject] = useState<Subjects>(appContext.table.subject);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnVisibility, setColumnVisibility] = useState({
//     studentClass: false,
//     finalAverage: false,
//     studentGrade: false,
//   });
//   const computedColumnVisibility = {
//     [`Student Class ${subject}`]: columnVisibility.studentClass,
//     [`Final Average ${subject}`]: columnVisibility.finalAverage,
//     [`Student Grade ${subject}`]: columnVisibility.studentGrade,
//   };
//   const [open, setOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDirty, setIsDirty] = useState(false);
//   const changingSub = useRef(false);
//   const [pagination, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: appContext.table.RPP,
//   });
//   const [rowPinning, setRowPinning] = useState<RowPinningState>({
//     top: [],
//     bottom: [],
//   });

//   const [columns, setColumns] = useState<CDS[]>([]);
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     state: {
//       globalFilter,
//       pagination,
//       columnVisibility: computedColumnVisibility,
//       rowPinning,
//     },
//     onColumnVisibilityChange: (updater) => {
//       const next =
//         typeof updater === "function"
//           ? updater(computedColumnVisibility)
//           : updater;

//       setColumnVisibility((prev) => ({
//         ...prev,
//         studentClass: next[`Student Class ${subject}`] ?? prev.studentClass,
//         finalAverage: next[`Final Average ${subject}`] ?? prev.finalAverage,
//         studentGrade: next[`Student Grade ${subject}`] ?? prev.studentGrade,
//       }));
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     onPaginationChange: setPagination,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onRowPinningChange: setRowPinning,
//     enableRowPinning: true,
//   });
//   const tableVars = {
//     table,
//     columns: { columns, setColumns },
//     suggestions,
//     open: { open, setOpen },
//     pagination: { pagination, setPagination },
//     data: { data, setData },
//     dirty: { isDirty, setIsDirty },
//     subject: { subject, setSubject },
//     classRoom: { classRoom, setClassRoom },
//     columnVisibility: { columnVisibility, setColumnVisibility },
//     rowPinning: { rowPinning, setRowPinning },
//     globalFilter: { globalFilter, setGlobalFilter },
//     loading: { isLoading, setIsLoading },
//     changingSub,
//   };

//   const { user, school } = useAppContext();

//   useEffect(() => {
//     setSubject(subject); 
//     const pagin = {...pagination}
//     setPagination({
//       pageIndex: pagin.pageIndex,
//       pageSize: pagin.pageSize
//     })
//   }, [data]);

//   useEffect(() => {
//     async function uploadSilentData() {
//       try {
//         await axios.post("/api/createFile/metadata/context.json", {
//           user,
//           school,
//           table: {
//             subject,
//             RPP: pagination.pageSize,
//           },
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     uploadSilentData();
//   }, [subject, pagination.pageSize]);

//   return (
//     <tableContext.Provider value={tableVars}>{children}</tableContext.Provider>
//   );
// }

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type RowPinningState,
} from "@tanstack/react-table";

import {
  useState,
  createContext,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";

import type { AcademicStage, CDS, classes, Student, Subjects, TimeTableType } from "@/types";
import useAppContext from "@/hooks/useAppContext";
import axios from "axios";


// 🧠 ENGINE (all logic lives here)
function useTableEngine() {
  const appContext = useAppContext();

  // 🔹 Core state
  const [data, setData] = useState<Student[]>([]);
  const [timeTable, setTimeTable] = useState<TimeTableType | null>(null);
  const [columns, setColumns] = useState<CDS[]>([]);
  const [subject, setSubject] = useState<Subjects>(appContext.table.subject);

  const [classRoom, setClassRoom] = useState<{
    classes: classes;
    grades: AcademicStage;
  }>({
    classes: "A",
    grades: "1st",
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [open, setOpen] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: appContext.table.RPP,
  });

  const [rowPinning, setRowPinning] = useState<RowPinningState>({
    top: [],
    bottom: [],
  });


  // 🔥 Table instance
  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
      pagination,
      rowPinning,
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowPinningChange: setRowPinning,

    enableRowPinning: true,
  });

  // 🎯 Return clean API
  return {
    table,

    columns: { columns, setColumns },
    data: { data, setData },
    timeTable: { timeTable, setTimeTable },
    subject: { subject, setSubject },
    classRoom: { classRoom, setClassRoom },

    pagination: { pagination, setPagination },
    rowPinning: { rowPinning, setRowPinning },

    globalFilter: { globalFilter, setGlobalFilter },
    open: { open, setOpen },
    dirty: { isDirty, setIsDirty },
    loading: { isLoading, setIsLoading },

    suggestions: [5, 10, 15, 20, 25, 30, 40, 50],
  };
}


// 🧱 CONTEXT
type TableContext = ReturnType<typeof useTableEngine>;

export const tableContext = createContext<TableContext | null>(null);


// 🏗️ PROVIDER
export default function TableContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const tableVars = useTableEngine();
  const { user, school } = useAppContext();

  // 🔥 Persist context silently
  useEffect(() => {
    async function upload() {
      try {
        await axios.post("/api/createFile/metadata/context.json", {
          user,
          school,
          table: {
            subject: tableVars.subject.subject,
            RPP: tableVars.pagination.pagination.pageSize,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    upload();
  }, [
    tableVars.subject.subject,
    tableVars.pagination.pagination.pageSize,
  ]);

  return (
    <tableContext.Provider value={tableVars}>
      {children}
    </tableContext.Provider>
  );
}