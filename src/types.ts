import type { ColumnDef } from "@tanstack/react-table";

export type Assessment = {
  first?: number;
  half?: number;
  second?: number;
  final?: number;
};



export type Grades = {
  subjects: Record<Subjects, Partial<Assessment>>;
};

export type AcademicStage = "1st" | "2nd" | "3rd" | "4th" | "5th" | "6th";

export type StudentStatus = "active" | "suspended" | "medical leave";

export type classRole =
  | "Student"
  | "Representative"
  | "Parliament Member"
  | "Attendance Officer"
  | "Assistant Attendance Officer";

export type classes = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Student = {
  personalInfo: {
    name: string;
    DOB: string;
    address: string;
    phone: string;
    notes: string;
    // mothersName: `${string} ${string} ${string} ${string}`;
    // bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    // religion: "Islam" | "Christianity" | "Judaism" | "Others" | string;
    // fathersJob:string
  };
  // legalInfo: {
  //   civilStatusIdNum: string;
  //   nationalityCertificateNum: string;
  //   RecordNum: string;
  //   pageNum: String;
  //   issuingAuthority: string;
  // };
  academicInfo: {
    currentStage: AcademicStage;
    currentClass: classes;
    // classRole: classRole;
    // status: StudentStatus;
  };
  totalAbsences: number;
  grades: Grades;
};


export type Subjects =
  | "Mathematics"
  | "Chemistry"
  | "Physics"
  | "Biology"
  | "Arabic"
  | "English"
  | "French"
  | "Kurdish"
  | "Religious Education"
  | "Computer"
  | "Crimes"
  | "Geography"
  | "Moral Education"
  | "Art"
  | "Physical Education"
/**
  fathers job
  mother's name
  
  */
export type CDS = ColumnDef<Student>;
export type Days = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
// export type TimeTableType = Record<Days, Record<string, Subjects>>;

//



export type Periods = Record<AcademicStage, Subjects>;

export type TimeTableType = Record<
  classes,
  Record<Days, Periods>
  >;


// export type TimeTableType = {
//   "1st": {
//     "Sun": {
//       "1st": {
//         subject: Subjects;
//         teacher: string;
//       },
//       "2nd": {
//         subject: Subjects;
//         teacher: string;
//       },
//     },
//     "Mon": {
//       "1st": {
//         subject: Subjects;
//         teacher: string;
//       },
//       "2nd": {
//         subject: Subjects;
//         teacher: string;
//       },
//     },
//   }
//   "2nd": {
//         "Sun": {
//       "1st": {
//         subject: Subjects;
//         teacher: string;
//       },
//       "2nd": {
//         subject: Subjects;
//         teacher: string;
//       },
//     },
//     "Mon": {
//       "1st": {
//         subject: Subjects;
//         teacher: string;
//       },
//       "2nd": {
//         subject: Subjects;
//         teacher: string;
//       },
//     },
//   }
// };

/*
{
1st : {
sun:{
}
}
2nd : {
}
3rd : {
}
4th : {
}
5th : {
}
6th : {
}
*/