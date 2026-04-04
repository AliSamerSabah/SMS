// import Award from "@/assets/images/ui/award.png"

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col gap-20 items-center  pt-10 gridBoy">
//       <div className="ali">
//         <Logo />
//       </div>
//       <div className="girdBoy grid max-w-6xl mx-auto p-25 box-effect rounded-3xl">
//         <h1 className="text1 text-4xl font-bold mb-10">
//           Al-Kadraa Distinguished High School
//         </h1>

//         <p className="text2 text-2xl! leading-relaxed">
//           Al-Kadraa Distinguished High School stands as one of the leading
//           educational institutions committed to academic excellence, discipline,
//           and character development. Since its establishment, the school has
//           nurtured generations of students who combine intellectual achievement
//           with strong moral values.
//         </p>

//         <p className="text3 text-2xl! leading-relaxed">
//           The school provides a rigorous curriculum designed to prepare students
//           for higher education and competitive national examinations. With a
//           strong focus on science, mathematics, literature, and civic
//           responsibility, students are equipped not only with knowledge but with
//           purpose and direction.
//         </p>

//         <aside className="aside bg-gray-100 p-6 rounded-lg shadow-md text-foreground dark:bg-gray-900">
//           <h2 className="font-semibold mb-2">Quick Facts</h2>
//           <div className="space-y-10">
//             <ul className="space-y-2 text-sm border-b-10 pb-10 rounded-2xl border-dotted">
//               <li>
//                 <p>📍 Location: Al-Kadraa</p>
//               </li>
//               <li>
//                 <p>🎓 Level: Intermediate And High School Education</p>
//               </li>
//               <li>
//                 <p>🏆 Focus: Academic Excellence</p>
//               </li>
//               <li>
//                 <p>👥 Strong Leadership Culture</p>
//               </li>
//             </ul>
//             <div className="flex flex-col items-center gap-4">
//               <img
//                 src={Award}
//                 className="rounded-2xl"
//                 alt=""
//               />
//               <p className="whitespace-break-spaces">
//                 In 2024 , DHS Al-Kadraa's principle (Teacher Mushrik Al-Joubory)
//                 was awarded the "Iraq's Best" award for best educational
//                 performance .
//               </p>
//             </div>
//           </div>
//         </aside>

//         <p className="text4 text-1.5xl! leading-relaxed mt-10!">
//           Over the years, the school has produced outstanding graduates who have
//           continued their education at prestigious universities and contributed
//           meaningfully to society. Al-Kadraa Distinguished High School remains
//           dedicated to shaping future leaders grounded in excellence,
//           perseverance, and service.
//         </p>
//       </div>

//     </div>
//   );
// }
/// <reference types="vite-plugin-svgr/client" />
import Logo from "@/assets/svgs/Myschoolname.svg?react";
import bgc from "@/assets/images/ui/bgc.webp";
import dhs from "@/assets/images/ui/background.webp";
import mhs from "@/assets/images/ui/mhs.webp";

const schools = [
  {
    name: "Baghdad College",
    founded: "1932",
    description:
      "Baghdad College is one of Iraq’s most prestigious high schools. Originally founded and operated by American Jesuits, it became a symbol of academic excellence and discipline. The institution has produced influential leaders, intellectuals, and professionals across generations.",
    highlights: [
      "Founded by Jesuit educators",
      "Strong English-based curriculum",
      "Produced national leaders and global figures",
    ],
    image: bgc,
  },
  {
    name: "Distinguished High Schools (Al-Mutamayizeen)",
    founded: "1990s",
    description:
      "Distinguished High Schools in Iraq are elite government institutions designed for top-performing students. Admission is highly competitive and based on academic achievement. These schools emphasize science, mathematics, and advanced analytical thinking.",
    highlights: [
      "Selective admission process",
      "Focus on STEM excellence",
      "Highly competitive academic environment",
    ],
    image: dhs,
  },
  {
    name: "Al-Markaziyah High School",
    founded: "1918",
    description:
      "Al-Markaziyah High School is among the oldest educational institutions in Iraq. It played a central role in shaping early modern Iraqi education and has been attended by many prominent figures in the country’s history.",
    highlights: [
      "One of Iraq’s oldest schools",
      "Historic academic influence",
      "Educated key national figures",
    ],
    image: mhs,
  },
];

export default function IraqSchoolsInfo() {
  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-gray-100">
      {/* 🔹 HEADER */}
      <div className="py-12 flex items-center gap-10 justify-center flex-col border-b dark:border-white">
        {/* <h1 className="text-4xl font-bold mb-3">
          Iraq’s Distinguished High Schools
        </h1> */}
        <Logo />

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A historical and academic overview of Iraq’s most respected secondary
          institutions — where excellence is not optional, but expected.
        </p>
      </div>

      {/* 🔹 INTRO */}
      <div className="ali">
      </div>
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Iraq’s educational system has long recognized the importance of
          nurturing exceptional students. From historic institutions established
          in the early 20th century to modern elite schools, these centers of
          learning represent the intellectual backbone of the nation.
        </p>
      </section>

      {/* 🔹 SCHOOL BIO SECTIONS */}
      <section className="px-6 pb-20 space-y-20 max-w-6xl mx-auto">
        {schools.map((school, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <img
              src={school.image}
              alt={school.name}
              className="rounded-xl shadow-md dark:shadow-white w-full h-72 object-contain "
            />

            {/* Content */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{school.name}</h2>
              <p className="text-sm text-gray-500 mb-4">
                Founded: {school.founded}
              </p>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {school.description}
              </p>

              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                {school.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* 🔹 FOOTER */}
      <div className="py-6 text-center text-gray-500 dark:border-white text-sm border-t">
        Educational Archive — Iraq
      </div>
    </div>
  );
}
