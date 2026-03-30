import StudentSearchDialog from '@/components/custom/Search';
import useAppContext from '@/hooks/useAppContext';
import { Link } from 'react-router-dom';

export default function Grades() {
  const {school:{principle,schoolAdmins}} = useAppContext()
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-5 pt-30 min-h-screen flex-wrap">
          <StudentSearchDialog/>
        <div className="w-200 flex justify-center items-center flex-wrap h-50 gap-5">
          <Link to="/grades/1st">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 1</div>
          </Link>
          <Link to="/grades/2nd">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 2</div>
          </Link>
          <Link to="/grades/3rd">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 3</div>
          </Link>
          <Link to="/grades/4th">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 4</div>
          </Link>
          <Link to="/grades/5th">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 5</div>
          </Link>
          <Link to="/grades/6th">
            <div className="box-effect size-50 rounded-4xl flex items-center justify-center font-extrabold text-3xl hover:scale-110 transition-all duration-500 dark:hover:brightness-125  hover:brightness-75">grades 6</div>
          </Link>
        </div>
        {/* <StudentSearch /> */}
      </div>
      <div className='flex justify-center items-center flex-col gap-5 pt-10'>
        <h3>school info</h3>
        <p>school's principle {principle}</p>
        <p>school's Administrators :  {schoolAdmins.join(" , ")}</p>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import axios from "axios";
// import StudentSearchDialog from '@/components/custom/Search';

// type Result = {
//   name: string;
//   grade: string;
//   class: string;
// };
// export function StudentSearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Result[]>([]);

//   async function handleSearch(value: string) {
//     setQuery(value);

//     if (!value.trim()) {
//       setResults([]);
//       return;
//     }

//     const res = await axios.get(`/api/search?name=${value}`);
//     setResults(res.data);
//   }

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search student..."
//         value={query}
//         onChange={(e) => handleSearch(e.target.value)}
//         className="border p-2 w-full"
//       />

//       <div className="mt-4 space-y-2">
//         {results.map((r, i) => (
//           <div key={i} className="border p-2 rounded">
//             <div><strong>{r.name}</strong></div>
//             <div>Grade: {r.grade}</div>
//             <div>Class: {r.class}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }