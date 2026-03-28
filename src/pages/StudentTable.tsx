import AdminTable from "@/components/custom/AdminTable";
import NonAdminTable from "@/components/custom/NonAdminTable";
import useAppContext from "@/hooks/useAppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import type { AcademicStage, classes, Student, TimeTableType } from "../types";
import { useTableContext } from "@/hooks/useTableContext";
import useColumns from "@/hooks/useColumns";

type FetchData = {
  students: Student[];
  timeTable: TimeTableType;
} | null;
export default function StudentTable() {
  const [data, setData] = useState<FetchData>(null);

  const { classNum, classOrder } = useParams<{
    classNum: AcademicStage;
    classOrder: classes;
  }>();

  if (!classNum || !classOrder) return null;

  const { user } = useAppContext();
  const tc = useTableContext();

  // ✅ hook must be here
  const columns = useColumns();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get<FetchData>(
          `/api/classroom/${classNum}/${classOrder}`,
        );
        setData(res.data);
      } catch (error) {
        tc.data.setData([]);
        console.error(error);
      }
    }
    getData();
  }, [classNum, classOrder]);

  // set columns once
  useEffect(() => {
    tc.columns.setColumns(columns);
  }, [columns]);

  useEffect(() => {
    if (data === null)
      return () => {
        tc.data.setData([]);
        tc.timeTable.setTimeTable(null);
      };

    tc.loading.setIsLoading(false);
    tc.timeTable.setTimeTable(data.timeTable);
    tc.data.setData(data.students);
    tc.classRoom.setClassRoom({
      classes: classOrder,
      grades: classNum,
    });
  }, [data, classOrder, classNum]);

  return (
    <div className="container mx-auto py-10">
      {user.isAdmin ? <AdminTable /> : <NonAdminTable />}
    </div>
  );
}

// import axios from "axios";
// // import { StudentTable } from "./data-table";
// import { useEffect, useState } from "react";
// import type { AcademicStage, classes, Student } from "../components/custom/data-table/types";
// import { StudentTable } from "./data-table";

// export default function DemoPage() {
//   const [data, setData] = useState<Student[]>([]);

//   useEffect(() => {
//     async function getData() {
//       const res = await axios.get<Student[]>("/api/JSON/1st/A.json");
//       setData(res.data);
//     }
//     getData();
//   }, []);

//   return (
//     <div className="container mx-auto py-10">
//       <StudentTable studentData={data} />
//     </div>
//   );
// }
