/// <reference types="vite-plugin-svgr/client" />
import Logo from "@/assets/svgs/SchoolName.svg?react"
import Award from "@/assets/images/ui/award.png"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-20 items-center  pt-10 gridBoy">
      <div className="ali">
        <Logo />
      </div>
      <div className="girdBoy grid max-w-6xl mx-auto p-25 box-effect rounded-3xl">
        <h1 className="text1 text-4xl font-bold mb-10">
          Al-Kadraa Distinguished High School
        </h1>

        <p className="text2 text-2xl! leading-relaxed">
          Al-Kadraa Distinguished High School stands as one of the leading
          educational institutions committed to academic excellence, discipline,
          and character development. Since its establishment, the school has
          nurtured generations of students who combine intellectual achievement
          with strong moral values.
        </p>

        <p className="text3 text-2xl! leading-relaxed">
          The school provides a rigorous curriculum designed to prepare students
          for higher education and competitive national examinations. With a
          strong focus on science, mathematics, literature, and civic
          responsibility, students are equipped not only with knowledge but with
          purpose and direction.
        </p>

        <aside className="aside bg-gray-100 p-6 rounded-lg shadow-md text-foreground dark:bg-gray-900">
          <h2 className="font-semibold mb-2">Quick Facts</h2>
          <div className="space-y-10">
            <ul className="space-y-2 text-sm border-b-10 pb-10 rounded-2xl border-dotted">
              <li>
                <p>📍 Location: Al-Kadraa</p>
              </li>
              <li>
                <p>🎓 Level: Intermediate And High School Education</p>
              </li>
              <li>
                <p>🏆 Focus: Academic Excellence</p>
              </li>
              <li>
                <p>👥 Strong Leadership Culture</p>
              </li>
            </ul>
            <div className="flex flex-col items-center gap-4">
              <img
                src={Award}
                className="rounded-2xl"
                alt=""
              />
              <p className="whitespace-break-spaces">
                In 2024 , DHS Al-Kadraa's principle (Teacher Mushrik Al-Joubory)
                was awarded the "Iraq's Best" award for best educational
                performance .
              </p>
            </div>
          </div>
        </aside>

        <p className="text4 text-1.5xl! leading-relaxed mt-10!">
          Over the years, the school has produced outstanding graduates who have
          continued their education at prestigious universities and contributed
          meaningfully to society. Al-Kadraa Distinguished High School remains
          dedicated to shaping future leaders grounded in excellence,
          perseverance, and service.
        </p>
      </div>

    </div>
  );
}
