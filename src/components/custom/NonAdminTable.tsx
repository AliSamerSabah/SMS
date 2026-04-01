import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTableContext } from "@/hooks/useTableContext";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { baseStages, days } from "@/consts";
import { Button } from "@/components/ui/button";
import type { classes, TimeTableType } from "@/types";

function NATTT({
  classes,
  table,
}: {
  table: TimeTableType | null;
  classes: classes;
}) {
  if (!table || !classes || !table[classes])
    return <Button disabled>Loading timetable...</Button>;
  const myTable = table[classes];
  return (
    <Dialog>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border">Period</TableHead>
              {days.map((day) => {
                return (
                  <TableHead key={day} className="text-center border">
                    {day}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {baseStages.map((period) => {
              return (
                <TableRow key={period} className="border-0">
                  <TableCell className="font-bold border">
                    {period} Period
                  </TableCell>

                  {days.map((day) => {
                    return (
                      <TableCell key={day} className="border">
                        {myTable?.[day]?.[period] ?? ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function NonAdminTable() {
  const {
    data: { data },
    timeTable: { timeTable },
    classRoom: {
      classRoom: { classes },
    },
  } = useTableContext();
  const { isExempted } = useTableHelpers();
  return (
    <div className="flex items-center flex-col min-h-screen pt-20 ">
      <Card className="w-300">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>A list of this class' students </CardDescription>
          <NATTT table={timeTable} classes={classes} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of this class' students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Total Absents</TableHead>
                <TableHead className="text-right">
                  General Exemption Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student, i) => {
                const { exemptionStatus } = isExempted(student);
                const text =
                  exemptionStatus === "incomplete"
                    ? "Data Incomplete"
                    : exemptionStatus === false
                    ? "Not Exempted"
                    : "Exempted";
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{student.personalInfo.name}</TableCell>
                    <TableCell>{student.totalAbsences}</TableCell>
                    <TableCell className="text-right">{text}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
