import type { AcademicStage, classes, Days, Subjects } from "./types";

export const ALL_SUBJECTS: Subjects[] = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Arabic",
  "English",
  "French",
  "Religious Education",
  "Art",
  "Physical Education",
  "Kurdish",
  "Geography",
  "Computer",
  "Crimes",
  "Moral Education",
];

const baseSubs: Subjects[] = [
  "Arabic",
  "English",
  "French",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
  "Religious Education",
  "Physical Education",
  "Art",
];

type subPerGrade = Record<AcademicStage , Subjects[]>

export const subPerGrade: subPerGrade = {
    "1st": [...baseSubs , "Computer" , "Geography" , "Moral Education" ],
    "2nd": [...baseSubs , "Computer" , "Geography" , "Moral Education" ],
    "3rd": [...baseSubs , "Geography"],
    "4th": [...baseSubs , "Computer" , "Kurdish" , "Crimes" ],
    "5th": [...baseSubs , "Computer" , "Kurdish"],
    "6th": [...baseSubs],
} 

export const baseStages: AcademicStage[] = ["1st", "2nd", "3rd", "4th", "5th", "6th"]
export const days: Days[] = ["Sun", "Mon", "Tue", "Wed", "Thu"]
export const CLASSES:classes[] = ["A", "B", "C", "D", "E", "F", "G"]  