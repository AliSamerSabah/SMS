/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import axios from "axios";
import type { Subjects } from "./types";

type cpg = {
  "1st": number;
  "2nd": number;
  "3rd": number;
  "4th": number;
  "5th": number;
  "6th": number;
};
type Users =
  | null
  | {
      name: string;
      email: string;
      password: string;
    }[];

type AppContextType = {
  user: {
    name: string;
    email: string | null;
    password: string | null;
    isAdmin: boolean;
    madeUsers: boolean;
    theme: "dark" | "light";
  };
  school: {
    principle: string;
    CPG: cpg;
    schoolAdmins: string[];
    securityPassword: string;
  }
    users: Users;
  table: {
    RPP: number;
    subject: Subjects
  }
};

type AppContextValue = AppContextType & {
  setUser: (user: AppContextType["user"]) => void;
  setSchool: (school: AppContextType["school"]) => void;
  setUsers: (usersDB: AppContextType["users"]) => void;
  setTable: (table: AppContextType["table"]) => void;
};
type ContextResponse = {
  user: {
    name: string
    email: string | null
    password: string | null
    isAdmin: boolean
    madeUsers: boolean
    theme: "dark" | "light"
  }

  school: {
    principle: string
    CPG: cpg
    schoolAdmins: string[] 
    securityPassword: string
  }

  table: {
    RPP: number
    subject: Subjects
  }
}

type SchoolResponse = {
  users: Users
}
export const AppContext = createContext<AppContextValue | null>(null);

async function fetchContext(): Promise<AppContextType> {
  const contextRes = await axios.get<ContextResponse>(
    "/api/JSON/metadata/context.json"
  )

  const schoolRes = await axios.get<SchoolResponse>(
    "/api/JSON/metadata/school.json"
  )

  const context = contextRes.data
  const school = schoolRes.data

  return {
    ...context,
    users: school.users
  }
}

export default function AppContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AppContextType["user"]>({
    name: "Guest",
    isAdmin: false,
    email: null,
    password: null,
    theme: "light",
    madeUsers: false,
  });
  const [school , setSchool] = useState<AppContextType["school"]>({
    CPG: {
      "1st": 0,
      "2nd": 0,
      "3rd": 0,
      "4th": 0,
      "5th": 0,
      "6th": 0,
    },
    principle: "",
    schoolAdmins: [],
    securityPassword: "",
  })
const [users, setUsers] = useState<AppContextType["users"]>([]);
const [table, setTable] = useState<AppContextType["table"]>({
  RPP: 10,
  subject: "Mathematics",
})
  // dark mode toggle

  useEffect(() => {
    document.body.classList.toggle("dark", user.theme === "dark");
  }, [user.theme]);

  const didLoad = useRef(false);
  const [loading, setLoading] = useState(true);

  // load context and users
  useEffect(() => {
    async function loadContext() {
      try {
        const data = await fetchContext();
        setUser(data.user);
        setSchool(data.school)
        setTable(data.table)
        setUsers(data.users)
      } catch (err) {
        console.warn("Failed to fetch context. Using default state.", err);
        axios.post("/api/createFile/metadata/context.json", {
          user,
          school,
          table,
          users
        });
        // Do nothing — defaults remain
      } finally {
        setLoading(false);
        didLoad.current = true;
      }
    }


    loadContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!didLoad.current) return;

    axios.post("/api/createFile/metadata/context.json", {
      user,
      table,
      school
    });
    axios.post("/api/createFile/metadata/school.json", {users})
  }, [
    user,
    school,
    table,
    users
  ]);

  if (loading) return "";

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        school,
        setSchool,
        table,
        setTable,
        users,
        setUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
}




