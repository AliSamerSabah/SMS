import type { CDS, Student } from "@/types";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import { cn } from "@/lib/utils";
import type { HeaderContext } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  // MoreHorizontal,
  // Pin,
  // Trash2Icon,
} from "lucide-react";
import { useMemo} from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogMedia,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { useTableContext } from "./useTableContext";
import MyColumnInput from "@/components/custom/data-table/MyColumnInput";
import { ColumnOptions } from "@/components/custom/data-table/MyColumnOptions";
import { AbsenceCell } from "@/components/custom/data-table/MyColumnACell";
// import { toast } from "sonner";

const bc = {
  average: "text-black flex justify-center rounded-2xl",
  class: "flex items-center gap-5 ",
};

const SortStatusIcon = ({
  props,
}: {
  props: HeaderContext<Student, unknown>;
}) => {
  return (
    <span>
      {props.column.getIsSorted() === "asc" ? (
        <ArrowUp size={30} />
      ) : props.column.getIsSorted() === "desc" ? (
        <ArrowDown size={30} />
      ) : (
        <ArrowUp className="invisible" size={30} />
      )}
    </span>
  );
};
const CustomHeader = ({
  text,
  props,
}: {
  text: string;
  props: HeaderContext<Student, unknown>;
}) => {
  return (
    <span className={cn(bc.class , "cursor-pointer w-full h-full")}>
      <span>{text}</span>
      <SortStatusIcon props={props} />
    </span>
  );
};
// type DropdownProps = {
//   props: CellContext<Student, unknown>;
// };
// const Options = ({ props }: DropdownProps) => {
//   // const tc = useTableContext();
//   const { deleteStudent } = useTableHelpers();
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="ghost"
//           className="h-8 w-20 p-0 flex justify-center gap-5"
//         >
//           <MoreHorizontal className="h-4 w-4" />
//           <Pin
//             className={cn(
//               "size-5",
//               props.row.getIsPinned() ? "inline" : "hidden",
//             )}
//           />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuLabel>Options</DropdownMenuLabel>
//         <DropdownMenuItem>View Student</DropdownMenuItem>
//         <DropdownMenuItem>Edit Student</DropdownMenuItem>
//         <DropdownMenuSeparator />

//         {props.row.getIsPinned() && (
//           <DropdownMenuItem onClick={() => props.row.pin(false)}>
//             Disable Pinning
//           </DropdownMenuItem>
//         )}
//         {(props.row.getIsPinned() === "bottom" || !props.row.getIsPinned()) && (
//           <DropdownMenuItem onClick={() => props.row.pin("top")}>
//             Pin to top
//           </DropdownMenuItem>
//         )}
//         {(props.row.getIsPinned() === "top" || !props.row.getIsPinned()) && (
//           <DropdownMenuItem onClick={() => props.row.pin("bottom")}>
//             Pin to bottom
//           </DropdownMenuItem>
//         )}
//         <DropdownMenuSeparator />
//         <AlertDialog>
//           <AlertDialogTrigger asChild>
//             <Button variant="destructive">Delete Student</Button>
//           </AlertDialogTrigger>
//           <AlertDialogContent className="duration-700" size="sm">
//             <AlertDialogHeader>
//               <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
//                 <Trash2Icon />
//               </AlertDialogMedia>
//               <AlertDialogTitle>Delete Student?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will permanently delete this student's data from the
//                 database and cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 variant="destructive"
//                 onClick={() => {
//                   deleteStudent(props);
//                 }}
//               >
//                 Delete
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };
// type props = {
//   subject: Subjects;
//   data: Student[];
//   setData: Dispatch<SetStateAction<Student[]>>;
//   isDirty: boolean;
//   setIsDirty: Dispatch<SetStateAction<boolean>>;
// };
export default function useColumns(): CDS[] {
  const { average, finalAverage, getIndex, myRounder , isExempted } =
    useTableHelpers();
  const tc = useTableContext();
  const subject = tc.subject.subject;
  return useMemo<CDS[]>(
    () => [
      {
        id: `Index ${subject}`,
        header: "#",
        cell: ({ table, row }) => getIndex(table, row),
      },
      {
        id: `Student ID ${subject}`,
        header: (props) => {
          return (
            <span
              className={cn(bc.class, "text-white w-full h-full cursor-pointer")}
              onClick={() => props.table.toggleAllRowsSelected()}
            >
              <span>ID</span>
              <Checkbox
                checked={
                  props.table.getIsAllPageRowsSelected() ||
                  (props.table.getIsSomePageRowsSelected() && "indeterminate")
                }
                className="cursor-pointer"
              />
            </span>
          );
        },

        cell: (props) => {
          return (
            <span
              className="flex justify-center  items-center gap-5 cursor-pointer"
              onClick={() => props.row.toggleSelected()}
            >
              {props.row.index + 1}
              <Checkbox
                checked={props.row.getIsSelected()}
                className="cursor-pointer"
              />
            </span>
          );
        },
      },

      {
        id: `Student Name ${subject}`,
        header: (props) => {
          return <CustomHeader text="name" props={props} />;
        },
        accessorFn: (row) => row.personalInfo.name,
        cell: (props) => <span>{props.row.getValue(props.column.id)}</span>,
      },

      // {
      //   id: `Student Grade ${subject}`,
      //   header: (props) => {
      //     return <CustomHeader text="Grade" props={props} />;
      //   },
      //   accessorFn: (row) => row.academicInfo.currentStage,
      // },
      // {
      //   id: `Student Class ${subject}`,
      //   header: (props) => {
      //     return <CustomHeader text="Class" props={props} />;
      //   },
      //   accessorFn: (row) => row.academicInfo.currentClass,
      // },

      {
        id: `First-Term Grade ${subject}`,
        header: (props) => {
          return <CustomHeader text="1st" props={props} />;
        },
        accessorFn: (row) => row.grades.subjects[subject].first,
        cell: (props) => <MyColumnInput field="first" props={props} />,
      },

      {
        id: `Half-year Grade ${subject}`,
        header: (props) => {
          return <CustomHeader text="half" props={props} />;
        },
        accessorFn: (row) => row.grades.subjects[subject].half,
        cell: (props) => <MyColumnInput field="half" props={props} />,
      },

      {
        id: `Second-Term Grade ${subject}`,
        header: (props) => {
          return <CustomHeader text="2nd" props={props} />;
        },
        accessorFn: (row) => row.grades.subjects[subject]?.second,
        cell: (props) => <MyColumnInput field="second" props={props} />,
      },
      {
        id: `Student Average ${subject}`,

        header: (props) => {
          return <CustomHeader text="Student average" props={props} />;
        },

        accessorFn: (row) => {
          const result = average(row, subject);
          return result.averageStatus === undefined ? null : result.averageNum;
        },

        cell: (props) => {
          const { averageNum } = average(props.row.original, subject);

          if (averageNum === "incomplete") {
            return (
              <span className={cn(bc.average, "bg-yellow-500")}>
                Data Incomplete
              </span>
            );
          } else {
            return <span className={cn(Number(myRounder(averageNum)) >= 85 ? "text-green-500" : Number(myRounder(averageNum)) >=50? "text-amber-500":"text-red-500")}>{myRounder(averageNum)}</span>;
          }
        },
      },

      {
        id: `Final Grade ${subject}`,
        header: (props) => {
          return <CustomHeader text="Final" props={props} />;
        },
        accessorFn: (row) => row.grades.subjects[subject].final,

        cell: (props) => <MyColumnInput field="final" props={props} />,
        // {
        //   const {averageNum , averageStatus} = average(props.row.original, subject);
        //   const final = props.row.original.grades.subjects[subject].final;
        //   if (final === undefined && averageStatus !== "exempted")
        //     return (
        //       <span className={cn(bc.average, "bg-yellow-500")}>No Data</span>
        //     );
        //   if (
        //     final === undefined &&
        //     averageStatus === "exempted" &&
        //     averageNum !== "incomplete" &&
        //     averageNum >= 85
        //   ) {
        //     return <div>XXXXX</div>;
        //   }

        //   if (final !== undefined && averageStatus !== "exempted")
        //     return (
        //       <div>
        //         {myRounder(final)}
        //       </div>
        //     );
        // },
      },
      {
        id: `Final Average ${subject}`,
        header: (props) => {
          return <CustomHeader text="Final Average" props={props} />;
        },
        accessorFn: (row) => {
          const result = average(row, subject);
          return result.averageStatus === undefined ? null : result.averageNum;
        },

        cell: (props) => {
          const finalAvg = finalAverage(props.row.original, subject);
          if (finalAvg === "incomplete") {
            return (
              <span className={cn(bc.average, "text-yellow-500")}>
                Data Incomplete
              </span>
            );
          }
          if (finalAvg === "exempted") {
            return <span className="text-blue-700">XXXXX</span>;
          } else {
            return <div className={cn(Number(myRounder(finalAvg)) >= 75 ? "text-green-500": Number(myRounder(finalAvg)) >=50? "text-amber-500":"text-red-500")} >{myRounder(finalAvg)}</div>;
          }
        },
      },

      {
        id: `Exemption Status ${subject}`,

        accessorFn: (row) => average(row, subject).averageStatus,

        header: (props) => (
          <CustomHeader text={`Exemption Status in ${subject}`} props={props} />
        ),

        cell: (props) => {
          const { averageStatus } = average(props.row.original, subject);

          if (averageStatus === "incomplete")
            return (
              <span className={cn(bc.average, "bg-yellow-500")}>
                Data Incomplete
              </span>
            );
          if (averageStatus === "exempted") {
            return (
              <div>
                <span className={cn(bc.average, "bg-green-500")}>Yes</span>
              </div>
            );
          } else {
            return (
              <div>
                <span className={cn(bc.average, "bg-red-500")}>No</span>
              </div>
            );
          }
        },
      },
      {
        id: `General Exemption Status ${subject}`,
        header: (props) => (
          <span
            className={cn(bc.class, "flex justify-center items-center gap-5")}
          >
            <span>General Exemption Status</span>
            <SortStatusIcon props={props} />
          </span>
        ),
        accessorFn: (props) => isExempted(props).exemptionNum,
        cell: (props) => {
          const { exemptionStatus , exemptionNum } = isExempted(props.row.original);
          if (exemptionStatus === "incomplete")
            return (
              <span className={cn(bc.average, "bg-yellow-500")}>
                Data Incomplete
              </span>
            );
          if (exemptionStatus === true) {
            return (
              <div>
                <span className={cn(bc.average, "bg-green-500")}>Yes ({exemptionNum? myRounder(exemptionNum): ""})</span>
              </div>
            );
          } else {
            return (
              <div>
                <span className={cn(bc.average, "bg-red-500")}>No</span>
              </div>
            );
          }
        },
      },
      {
        id: `Absents ${subject}`,
        header: (props) => (
          <CustomHeader text="Absents" props={props} />
        ),
        accessorFn: (props) => props.totalAbsences,
        cell: (props) => <AbsenceCell row={props.row} />
      },
      {
        id: `Actions ${subject}`,
        header: (props) => (
          <CustomHeader text="Actions" props={props} />
        ),
        cell: (props) => {
          return <ColumnOptions props={props} />;
        },
      },
    ],
    [subject],
  );
}
