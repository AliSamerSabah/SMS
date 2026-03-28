import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead as TH,
  TableHeader,
  TableCell as TC,
  TableRow as TR,
} from "@/components/ui/table";
import { baseStages, days } from "@/consts";
import { useTableContext } from "@/hooks/useTableContext";
import type { AcademicStage, Days, TimeTableType } from "@/types";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Cell } from "./myTTTSelect";

export function MyTableTT() {
  const tc = useTableContext();
  const { grades, classes } = tc.classRoom.classRoom;
  const { timeTable, setTimeTable } = tc.timeTable;
  const [open, setOpen] = useState(false);
  // const [table, setTable] = useState<TimeTableType | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const periods = baseStages;
  const prevData = useRef<TimeTableType | null>(null);

  useEffect(() => {
    if (prevData.current === null && timeTable !== null)
      prevData.current = structuredClone(timeTable);
  }, [timeTable]);
  // let myTable: TimeTableType[classes] | undefined = table?.[classes]
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await axios.get<TimeTableType>(
  //         `/api/JSON/${grades}/timeTable.json`,
  //       );
  //       setTable(res.data);
  //     } catch (error) {
  //       console.error(error);
  //       setTable(null);
  //     }
  //   }
  //   getData();
  // }, [grades]);
  // useEffect(() => {
  //   if (prevData.current === null && table !== null) {
  //     prevData.current = structuredClone(table);
  //   }
  // }, [table]);

  const updateCell = useCallback(
    (day: Days, period: AcademicStage, value: string) => {
      setTimeTable((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          [classes]: {
            ...prev[classes],
            [day]: {
              ...prev[classes][day],
              [period]: value,
            },
          },
        };
      });
    },
    [setTimeTable, classes],
  );


  if (!timeTable || !classes || !timeTable[classes]) return <Button disabled>Loading timetable...</Button>;

  const myTable = timeTable[classes];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>View Timetable</Button>
      </DialogTrigger>

      <DialogContent className="duration-500 min-w-350">
        <DialogHeader>
          <DialogTitle>Timetable</DialogTitle>
          <DialogDescription>
            View and edit this class timetable
          </DialogDescription>
        </DialogHeader>

        {open && (
          <Table>
            <TableHeader>
              <TR>
                <TH className="border">Period</TH>
                {days.map((day) => {
                  return (
                    <TH key={day} className="text-center border">
                      {day}
                    </TH>
                  );
                })}
              </TR>
            </TableHeader>

            <TableBody>
              {periods.map((period) => {
                return (
                  <TR key={period} className="border-0">
                    <TC className="font-bold border">{period} Period</TC>

                    {days
                      .map((day) => {
                        // console.log("day:", day, "value:", myTable?.[day]);
                        return (
                          <TC key={day}>
                            <Cell
                              value={myTable?.[day]?.[period] ?? ""}
                              setIsDirty={setIsDirty}
                              day={day}
                              period={period}
                              updateCell={updateCell}
                              grades={grades}
                            />
                            {/* <Input
                        className="w-auto border"
                        value={editableTable![grades][day][period].teacher}
                        onChange={(e) =>
                          updateCell(day, period, "teacher", e.target.value)
                        }
                      /> */}
                          </TC>
                        );
                      })}
                  </TR>
                );
              })}
            </TableBody>
          </Table>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>

          <Button
            disabled={!isDirty}
            onClick={async () => {
              try {
                await axios.post(
                  `/api/createFile/${tc.classRoom.classRoom.grades}/timeTable.json`,
                  timeTable,
                );
                toast.success("Students saved successfully");
                setIsDirty(false);
                prevData.current = structuredClone(timeTable);
              } catch {
                toast.error("Error saving students");
              }
            }}
          >
            Save
          </Button>
          <Button
            disabled={!isDirty}
            onClick={() => {
              if (prevData.current !== null) {
                setTimeTable(structuredClone(prevData.current));
                setIsDirty(false);
                console.log("clean boiiiiiiii");
              }
            }}
          >
            <Undo2 size={16} />
            undo changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
