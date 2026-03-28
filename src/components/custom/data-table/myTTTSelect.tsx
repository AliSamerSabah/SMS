import { subPerGrade } from "@/consts";
import type { AcademicStage, Days } from "@/types";
import { memo, useId } from "react";
type Props = {
  value: string;
  day: Days;
  period: AcademicStage;
  updateCell: (day: Days, period: AcademicStage, value: string) => void;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  grades: AcademicStage;
};
export const Cell = memo(
  ({ value, day, period, updateCell, setIsDirty, grades }: Props) => {
    const subjects = subPerGrade[grades];
    const id = useId();
    return (
      <>
        <input
          key={value}
          className="w-full border px-2 py-1"
          list={id}
          defaultValue={value}
          onBlur={(e) => {
            if (e.target.value === value) return;
            updateCell(day, period, e.currentTarget.value);
            setIsDirty(true);
          }}
        />

        <datalist id={id}>
          {subjects.map((sub) => (
            <option key={sub} value={sub} />
          ))}
        </datalist>
      </>
    );
  },
);
