import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import type { Student } from "@/types";
import { memo, useMemo } from "react";

type Props = { student: Student };
export const MyColumnSheet = memo(({ student }: Props) => {
  const {
    academicInfo: { currentClass, currentStage },
    personalInfo: { DOB, address, name, notes, phone },
    totalAbsences,
  } = student;
  const { isExempted, myRounder } = useTableHelpers();
  const exp = useMemo(() => isExempted(student), [student, isExempted]);

  const exemptionText = useMemo(() => {
    if (exp.exemptionStatus === "incomplete") return "Data Incomplete";
    if (exp.exemptionStatus === false) return "Not Exempted";
    return `Exempted ${
      exp.exemptionNum !== null ? myRounder(exp.exemptionNum) : ""
    }`;
  }, [exp, myRounder]);
  const fields = [
    ["name", name],
    ["date of birth", DOB],
    ["address", address],
    ["guardian's phone", phone],
    ["class", currentClass],
    ["grade", currentStage],
    ["absences", totalAbsences],
  ];
  return (
    <Sheet>
      <SheetTrigger
        className="data-[variant=destructive]:*:[svg]:text-destructive! relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0"
        asChild
      >
        <Button
          variant={"ghost"}
          className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0"
        >
          View Student
        </Button>
      </SheetTrigger>
      <SheetContent className="py-20 overflow-y-scroll! flex flex-col items-center gap-3">
        <SheetHeader>
          <SheetTitle>{student.personalInfo.name}</SheetTitle>
          <SheetDescription>
            View the students personal and academic information also view thier
            grades and attendance
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 items-center justify-center px-2">
          {fields.map(([label, value], i) => (
            <>
              <div key={label}>
                {label}: {value}
              </div>
              {i !== fields.length - 1 && <Separator />}
            </>
          ))}
          <div>General Exemption Status: {exemptionText}</div>
          <Separator />
          <div className="flex flex-col items-center">
            notes : <div>{notes}</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});
