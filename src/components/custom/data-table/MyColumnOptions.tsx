import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import { cn } from "@/lib/utils";
import type { Student } from "@/types";
import type { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pin, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyColumnSheet } from "./MyColumnSheet";

type Props = {
  props: CellContext<Student, CellContext<Student, unknown>>;
};

export function ColumnOptions({ props }: Props) {
  const { deleteStudent } = useTableHelpers();
  const pinState = props.row.getIsPinned();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-20 p-0 flex justify-center gap-5"
        >
          <MoreHorizontal className="h-4 w-4" />
          <Pin className={cn("size-5", pinState ? "inline" : "hidden")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <MyColumnSheet student={props.row.original} />
        {/* <DropdownMenuItem>Edit Student</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {pinState && (
          <DropdownMenuItem onClick={() => props.row.pin(false)}>
            Disable Pinning
          </DropdownMenuItem>
        )}
        {(pinState === "bottom" || !pinState) && (
          <DropdownMenuItem onClick={() => props.row.pin("top")}>
            Pin to top
          </DropdownMenuItem>
        )}
        {(pinState === "top" || !pinState) && (
          <DropdownMenuItem onClick={() => props.row.pin("bottom")}>
            Pin to bottom
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger>Delete Student</AlertDialogTrigger>
          <AlertDialogContent className="duration-700" size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete Student?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this student's data from the
                database and cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  deleteStudent(props);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
