import useAppContext from "@/hooks/useAppContext";
import { Bell, Circle, Github, Home, Phone, School2 } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import TelegramSVG from "@/assets/svgs/telegram.svg?react";
export default function Footer() {
  const { user , school } = useAppContext();
    const grades = ["1st", "2nd", "3rd", "4th", "5th", "6th"] as const;
  type Grades = typeof grades[number];
  return (
    <footer className="w-full border-t bg-background text-foreground mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Left - Identity */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">
            School Management System{" "}
          </h2>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Built with precision. Designed with purpose. A system that values
            clarity over chaos.
          </p>

          {/* Creator */}
          <p className="text-xs text-muted-foreground">
            Creator & Designer:{" "}
            <a
              href="https://github.com/AliSamerSabah/"
              target="_blank"
              className="hover:text-primary italic text-foreground font-extrabold transition"
            >
              Ali Samer AL-Obaidi
            </a>
          </p>

          {/* Live Info */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[10px] px-2 py-1 rounded bg-muted">
              School: DHS AL-Kadraa
            </span>
            <span className="text-[10px] px-2 py-1 rounded bg-muted">
              User: {user.name ? user.name : "Guest"}
            </span>
            <span className="text-[10px] px-2 py-1 rounded bg-muted">
              Status: {user.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>

        {/* Middle - Navigation */}
        <div className="flex flex-col gap-3 text-sm">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1"
          >
            <Home size={16} />
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1">
                <School2 size={16} />
                Classes
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative right-10 bottom-6">
              <DropdownMenuGroup>
                {["1st", "2nd", "3rd", "4th", "5th", "6th"].map((grade) => (
                  <DropdownMenuSub key={grade}>
                    <DropdownMenuSubTrigger>{grade}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="flex flex-col ">
                        {Array.from({
                          length: school.CPG[grade as Grades],
                        }).map((_, j) => {
                          const className = String.fromCharCode(65 + j);
                          return (
                            <Link key={j} to={`/grades/${grade}/${className}`}>
                              <DropdownMenuItem>{className}</DropdownMenuItem>
                            </Link>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/announcements"
            className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1"
          >
            <Bell size={16} />
            Announcements
          </Link>
        </div>

        {/* Right - Socials + Status */}
        <div className="flex flex-col gap-3 text-sm">
          {/* Status */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Circle size={10} className="fill-green-500 text-green-500" />
            System Operational
          </div>

          <a
            href="https://github.com/AliSamerSabah"
            target="_blank"
            className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1"
          >
            <Github size={16} />
            AliSamerSabah
          </a>

          <a
            href="https://t.me/SerAlooshTheTall_2010"
            target="_blank"
            className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1"
          >
            <TelegramSVG className="size-4" />
            SerAlooshTheTall_2010
          </a>

          <a
            href="tel:+964 0782 650 7119"
            target="_blank"
            className="flex items-center gap-2 hover:text-primary transition hover:translate-x-1"
          >
            <Phone size={16} />
            +964 0782 650 7119
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t flex flex-col md:flex-row items-center justify-between text-xs py-4 px-6 text-muted-foreground gap-2">
        <span>
          © {new Date().getFullYear()} : School Management System (SMS) — Built
          with discipline.
        </span>

        {/* Extra info */}
        <div className="flex gap-4">
          <a
            href="https://github.com/AliSamerSabah/school_Managment_System"
            target="_blank"
            className="flex items-center gap-2 hover:text-primary transition hover:-translate-y-1"
          >
            <Github size={16} />
          </a>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
