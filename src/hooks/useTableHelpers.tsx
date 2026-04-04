import type { Student, Subjects } from "@/types";
import type { CellContext, Row, Table } from "@tanstack/react-table";
import { toast } from "sonner";
import * as XLSX from "xlsx";

import { useTableContext } from "@/hooks/useTableContext";
import { subPerGrade } from "@/consts";

export function useTableHelpers() {
  const tc = useTableContext();

  function deleteStudent(props: CellContext<Student, unknown>) {
    tc.data.setData((prev) =>
      prev.filter(
        (s) => s.personalInfo.name !== props.row.original.personalInfo.name,
      ),
    );
    tc.dirty.setIsDirty(true);
    toast.success(
      "Student deleted , please press on the save button to save the changes",
    );
  }

  //   function pinStudent(rowId: string) {
  //     tc.rowPinning.setRowPinning({
  //       top: [rowId],
  //     });
  //     }

  function getIndex(table: Table<Student>, row: Row<Student>) {
    const rows = [
      ...table.getTopRows(),
      ...table.getCenterRows(),
      ...table.getBottomRows(),
    ];
    const index = rows.findIndex((r) => r.id === row.id);
    return index + 1;
  }
  type AverageStatus = "incomplete" | "low_grade" | "low_average" | "exempted";

  function average(
    student: Student,
    subject: Subjects,
  ): {
    averageStatus: AverageStatus;
    averageNum: number | "incomplete";
  } {
    const { first, half, second } = student.grades.subjects[subject];

    if (first === undefined || half === undefined || second === undefined) {
      return {
        averageStatus: "incomplete",
        averageNum: "incomplete",
      };
    }

    const avg = (first + half + second) / 3;

    if ([first, half, second].some((v) => v! < 75)) {
      return {
        averageStatus: "low_grade",
        averageNum: avg,
      };
    }

    if (avg < 85) {
      return {
        averageStatus: "low_average",
        averageNum: avg,
      };
    }

    return {
      averageStatus: "exempted",
      averageNum: avg,
    };
  }
  type FinalAverageResult =
    | "incomplete"
    | "exempted"
    // | "calculated"
    | number;

  function finalAverage(
    student: Student,
    subject: Subjects,
  ): FinalAverageResult {
    const { first, half, second, final } = student.grades.subjects[subject];

    // 1. Check ONLY core grades first
    if (first === undefined || half === undefined || second === undefined) {
      return "incomplete";
    }

    // 2. Now it's safe to compute exemption
    const { averageStatus } = average(student, subject);

    if (averageStatus === "exempted") {
      return "exempted";
    }

    // 3. Now final is required
    if (final === undefined) {
      return "incomplete";
    }

    // 4. Compute
    return (first + half + second + final) / 4;
  }

  // function isExempted(student: Student, subject: Subjects) {
  //   const status = average(student, subject);
  //   if (status.check === undefined) return undefined;
  //   return status.check;
  // }

  function myRounder(num: number) {
    return num.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }

  function exportExcel(type: "All Subjects" | "Current Subject") {
    const table = tc.table;
    if (table.getSelectedRowModel().rows.length === 0)
      return toast.warning("Please select at least one student .");
    let flat;
    if (type === "Current Subject") {
      const subject = tc.subject.subject;
      flat = table.getSelectedRowModel().rows.map((row , i) => {
        const student = row.original;
        const grade = student.grades.subjects[subject];
        const { averageNum, averageStatus } = average(student, subject);
        const finalAvg = finalAverage(student, subject);
        const ID = i
        const Name = student.personalInfo.name;
        const Stage = student.academicInfo.currentStage;
        const Class = student.academicInfo.currentClass;
        const First = grade.first === undefined ? "No Data" : grade.first;
        const Half = grade.half === undefined ? "No Data" : grade.half;
        const Second = grade.second === undefined ? "No Data" : grade.second;
        const Average =
          averageNum === "incomplete"
            ? "Data Incomplete"
            : myRounder(averageNum);
        const Final =
          averageStatus === "exempted"
            ? "XXXXX"
            : student.grades.subjects[subject].final === undefined
            ? "No Data"
            : student.grades.subjects[subject].final;

        const Final_Average =
          finalAvg === "incomplete"
            ? "Data Incomplete"
            : finalAvg === "exempted"
            ? "XXXXX"
            : myRounder(finalAvg);
        const Exemption_Status =
          averageStatus === "incomplete"
            ? "Data Incomplete"
            : averageStatus === "exempted"
            ? "Exempted"
            : "Not Exempted";
        const Absences = student.totalAbsences;
        const Notes = student.personalInfo.notes;
        const rows: any = {
          ID,
          Name,
          Stage,
          Class,
          First,
          Half,
          Second,
          Average,
          Final,
          "Final Average": Final_Average,
          "Exemption Status": Exemption_Status,
          Absences,
          Notes,
        };
        return rows;
      });
    } else {
      flat = table.getSelectedRowModel().rows.map((row , i) => {
        const student = row.original;
        const ID = i;
        const Name = student.personalInfo.name;
        const Stage = student.academicInfo.currentStage;
        const Class = student.academicInfo.currentClass;
        const Absences = student.totalAbsences;
        const Notes = student.personalInfo.notes;

        let rows: any = {
          ID,
          Name,
          Stage,
          Class,
          Absences,
          Notes,
        };

        for (const sub of subPerGrade[Stage]) {
          const { averageNum, averageStatus } = average(student, sub);
          const finalAvg = finalAverage(student, sub);
          const grade = student.grades.subjects[sub];
          const First = grade.first === undefined ? "No Data" : grade.first;
          const Half = grade.half === undefined ? "No Data" : grade.half;
          const Second = grade.second === undefined ? "No Data" : grade.second;
          const Average =
            averageNum === "incomplete"
              ? "Data Incomplete"
              : myRounder(averageNum);
          const Final =
            averageStatus === "exempted"
              ? "XXXXX"
              : student.grades.subjects[sub].final === undefined
              ? "No Data"
              : student.grades.subjects[sub].final;
          const Final_Average =
            finalAvg === "incomplete"
              ? "Data Incomplete"
              : finalAvg === "exempted"
              ? "XXXXX"
              : myRounder(finalAvg);
          const Exemption_Status =
            averageStatus === "incomplete"
              ? "Data Incomplete"
              : averageStatus === "exempted"
              ? "Exempted"
              : "Not Exempted";

          const tempObj: any = {
            [`First-${sub}`]: First,
            [`Half-${sub}`]: Half,
            [`Second-${sub}`]: Second,
            [`Average-${sub}`]: Average,
            [`Final-${sub}`]: Final,
            [`Final Average-${sub}`]: Final_Average,
            [`Exemption Status-${sub}`]: Exemption_Status,
          };

          rows = {
            ...rows,
            ...tempObj,
          };
        }

        return rows;
      });
    }
    // for (const subject of ALL_SUBJECTS) {
    //   const g = student.original.grades.subjects[subject];
    //   if (!g) continue;

    //   row[`${subject} first`] = g.first;
    //   row[`${subject} half`] = g.half;
    //   row[`${subject} second`] = g.second;
    //   row[`${subject} final`] = g.final;
    // }
    const classes = tc.classRoom.classRoom.classes;
    const grades = tc.classRoom.classRoom.grades;

    const ws = XLSX.utils.json_to_sheet(flat);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      ws,
      `${grades}-${classes}-${
        type === "All Subjects" ? "ALL" : "CURRENT"
      } Students`,
    );
    XLSX.writeFile(
      wb,
      `${grades}-${classes}-${
        type === "All Subjects" ? "ALL" : "CURRENT"
      } Students.xlsx`,
    );
  }

  function updateGrade(
    name: string,
    field: "first" | "half" | "second" | "final",
    value: number | undefined,
  ) {
    tc.data.setData((old) =>
      old.map((row) => {
        if (row.personalInfo.name !== name) return row;

        return {
          ...row,
          grades: {
            subjects: {
              ...row.grades.subjects,
              [tc.subject.subject]: {
                ...row.grades.subjects[tc.subject.subject],
                [field]: value,
              },
            },
          },
        };
      }),
    );
  }

  function isExempted(student: Student): {exemptionStatus: boolean | "incomplete", exemptionNum: null | number} {
    // let hasIncomplete = false;
    let num = 0
    for (const sub of subPerGrade[student.academicInfo.currentStage]) {
      const { averageStatus ,averageNum } = average(student, sub);
      if (averageStatus === "incomplete") {
        // hasIncomplete = true;
        // continue;
        return {exemptionStatus:"incomplete", exemptionNum:null}
      }
      // if (hasIncomplete) return "incomplete";
      if (averageStatus !== "exempted") {
        return {exemptionStatus:false,exemptionNum:null};
      }
      if(typeof averageNum === "number") num += averageNum
    }
    
    return {exemptionStatus:true, exemptionNum: num/subPerGrade[student.academicInfo.currentStage].length};
  }

  return {
    deleteStudent,
    getIndex,
    average,
    finalAverage,
    myRounder,
    exportExcel,
    updateGrade,
    isExempted,
  };
}
