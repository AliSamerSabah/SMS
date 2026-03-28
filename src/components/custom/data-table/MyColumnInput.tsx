import { Input } from "@/components/ui/input";
import { subPerGrade } from "@/consts";
import { useTableContext } from "@/hooks/useTableContext";
import { useTableHelpers } from "@/hooks/useTableHelpers";
import { cn } from "@/lib/utils";
import type { Student } from "@/types";
import type { CellContext } from "@tanstack/react-table";
import { useEffect, useState } from "react";
type Props = {
  props: CellContext<Student, unknown>;
  field: "first" | "half" | "second" | "final";
};
export default function MyColumnInput({ props, field }: Props) {
  const tc = useTableContext();
  const subject = tc.subject.subject;
  const student = props.row.original;
  const grade = student.grades.subjects[subject][field];
  const { updateGrade, average } = useTableHelpers();
  const setIsDirty = tc.dirty.setIsDirty;
  const { averageStatus } = average(student, subject);
  const isExemptFinal = averageStatus === "exempted" && field === "final";

  const value = grade !== undefined ? grade : "";
  const sub = subPerGrade[student.academicInfo.currentStage].includes(subject)

  const placeholder  = isExemptFinal ? "XXXXX" : "No Data";
  const [tempState, setTempState] = useState(value);
useEffect(() => {
  setTempState(isExemptFinal ? "" : value);
}, [value, isExemptFinal]);
  return (
    <Input
      type="number"
      value={tempState}
      placeholder={placeholder}
      disabled={isExemptFinal || !sub}
      min={0}
      max={100}
      className={cn("w-20", isExemptFinal && "placeholder:opacity-100! placeholder:text-blue-600" , Number(value) >= 75 ? "text-green-500" : Number(value) >= 50 ? "text-yellow-500" : "text-red-500")}
      onChange={(e) => setTempState(e.target.value)}
      onBlur={(e) => {
          const raw = e.target.value;
//           if (raw === "") {
//   setTempState(value);
//   return;
// }
        const newValue = raw === "" ? undefined : Number(raw);
const isOutOfRange =
  newValue !== undefined && (newValue < 0 || newValue > 100);

const isSame = newValue === grade;

if (isOutOfRange || isSame) {
  setTempState(value);
  return;
}
        setIsDirty(true);
        updateGrade(props.row.original.personalInfo.name, field, newValue);
      }}
    />
  );
}
