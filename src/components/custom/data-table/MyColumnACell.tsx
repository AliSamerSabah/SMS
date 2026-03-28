import { Input } from "@/components/ui/input";
import { useTableContext } from "@/hooks/useTableContext";
import type { Student } from "@/types";
import type { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export function AbsenceCell({ row}: { row: Row<Student>}) {
    const [temp, setTemp] = useState(row.original.totalAbsences);
    const tc = useTableContext();

  useEffect(() => {
    setTemp(row.original.totalAbsences);
  }, [row.original.totalAbsences]);

  return (
    <Input
      type="number"
      value={temp}
      onChange={(e) => {
        const val = e.currentTarget.value;
        if (val === "") return setTemp(0); // or skip
        setTemp(Number(val));
      }}
      onBlur={() => {
        if (temp === row.original.totalAbsences) return;

        tc.dirty.setIsDirty(true);

        tc.data.setData((old) =>
          old.map((r) =>
            r.personalInfo.name === row.original.personalInfo.name
              ? { ...r, totalAbsences: temp }
              : r
          )
        );
      }}
    />
  );
}