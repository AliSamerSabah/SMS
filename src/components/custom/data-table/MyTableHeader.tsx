import type { Student, Subjects } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subPerGrade } from "@/consts";
import { Button } from "@/components/ui/button";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { File, Search, Undo2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useTableContext } from "@/hooks/useTableContext";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MyTableTT } from "./MyTableTT";
import {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ChangeEvent,
} from "react";
import { AddStudentSheet } from "./AddStudentSheet";
export default function MyTableHeader() {
  const tc = useTableContext();
  const { exportExcel } = useTableHelpers();
  const hasData = tc.data.data.length !== 0;
  const prevData = useRef<Student[] | null>(null);

  useEffect(() => {
    if (prevData.current === null && tc.data.data.length > 0) {
      prevData.current = structuredClone(tc.data.data);
    }
  }, [tc.data.data]);
  useEffect(() => {
    if (tc.data.data.length === 0 && prevData.current !== null)
      prevData.current = tc.data.data;
  }, [tc.classRoom.classRoom]);

  const handleSave = useCallback(async () => {
    try {
      await axios.post(
        `/api/createFile/${tc.classRoom.classRoom.grades}/${tc.classRoom.classRoom.classes}.json`,
        tc.data.data,
      );
      toast.success("Students saved successfully");
      tc.dirty.setIsDirty(false);
      prevData.current = structuredClone(tc.data.data);
    } catch {
      toast.error("Error saving students");
    }
  }, [tc.classRoom.classRoom, tc.data.data, tc.dirty.isDirty]);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      tc.globalFilter.setGlobalFilter(e.target.value);
    },
    [tc.globalFilter.globalFilter],
  );
  const handleValueChange = useCallback(
    (value: Subjects) => tc.subject.setSubject(value),
    [tc.subject.subject],
  );
  const handleUndo = useCallback(() => {
    if (prevData.current !== null) {
      tc.data.setData(structuredClone(prevData.current));
      tc.dirty.setIsDirty(false);
    }
  }, [tc.data.data, tc.dirty.isDirty]);

  // const visibleColumns = useMemo(() => {
  //   return tc.table.getAllLeafColumns().filter((column) => column.getCanHide());
  // }, [tc.table, tc.columns.columns]);
  const subjects = useMemo(() => {
    return subPerGrade[tc.classRoom.classRoom.grades];
  }, [tc.classRoom.classRoom.grades]);
  const globalFilter = tc.table.getState().globalFilter;

  const filteredCount = useMemo(
    () => tc.table.getFilteredRowModel().rows.length,
    [globalFilter],
  );
  // const getColumnLabel = (column: Column<Student, unknown>) => {
  //   if (typeof column.columnDef.header === "string") {
  //     return column.columnDef.header;
  //   }
  //   return column.id.includes(tc.subject.subject)
  //     ? column.id.replace(tc.subject.subject, "")
  //     : column.id;
  // };
  // const toggleColumn = useCallback((column: Column<Student, unknown>) => {
  //   column.toggleVisibility(!column.getIsVisible());
  // }, []);
  // if (tc.data.data.length === 0) return <div></div>;
  return (
    <div className="flex gap-4 justify-center items-center">
      {hasData && (
        <>
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              value={tc.globalFilter.globalFilter}
              onChange={handleSearch}
              className="max-w-sm peer"
            />
            <InputGroupAddon>
              <Search size={16} />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"}>
              {filteredCount}
              {""} results
            </InputGroupAddon>
            {/* className="relative right-6 top-2 peer-focus-within:hidden!" */}
          </InputGroup>
          <Select value={tc.subject.subject} onValueChange={handleValueChange}>
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <File size={16} />
                Export To Excel
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-55">
              <div className="flex flex-col gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => exportExcel("Current Subject")}
                >
                  Current-Subject's Grades
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => exportExcel("All Subjects")}
                >
                  All-Subjects' Grades
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal size={16} />
                View
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-52 p-0">
              <Command>
                <CommandInput placeholder="Search columns..." />

                <CommandList>
                  <CommandEmpty>No columns found.</CommandEmpty>

                  {visibleColumns.map((column) => (
                      <CommandItem
                        key={column.id}
onClick={() => toggleColumn(column)}
                        className="flex items-center justify-between"
                      >
<span>{getColumnLabel(column)}</span>
                        {column.getIsVisible() && <Check size={16} />}
                      </CommandItem>
                    ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}
        </>
      )}
          <Button disabled={!tc.dirty.isDirty} onClick={handleSave}>
            Save
          </Button>
          <Button disabled={!tc.dirty.isDirty} onClick={handleUndo}>
            <Undo2 size={16} />
            undo changes
          </Button>
      <MyTableTT />
      <AddStudentSheet />
    </div>
  );
}
