import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import useAppContext from "@/hooks/useAppContext";
import axios from "axios";

const BigSeparator = () => {
  return (
    <>
      <Separator />
      <Separator />
      <Separator />
      <Separator />
      <Separator />
    </>
  );
};

export default function Setup() {
  const {
    setUsers,
    setSchool,
    setUser,
    user
  } = useAppContext();

  type User = {
    name: string;
    email: string;
    password: string;
  };
  type scpg = {
    "1st": number;
    "2nd": number;
    "3rd": number;
    "4th": number;
    "5th": number;
    "6th": number;
  };
  type inputEl = ChangeEvent<HTMLInputElement>;

  const [Susers, setSusers] = useState<User[]>([
    { name: "", email: "", password: ""  },
  ]);
  const SsecurityPassword = useRef<string>("");
  const Sprinciple = useRef<string>("");
  const SCPG = useRef<scpg>({
    "1st": 0,
    "2nd": 0,
    "3rd": 0,
    "4th": 0,
    "5th": 0,
    "6th": 0,
  });
  const [SschoolAdmins, setSschoolAdmins] = useState<string[]>([""]);

  const form = useRef<HTMLFormElement | null>(null);
  const divClass = "flex flex-col gap-2 justify-center";
  const [showPassword, setShowPassword] = useState<boolean[]>([]);

useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setShowPassword(Susers.map(() => false));
}, [Susers]);

  
  const handleChange = (index: number, field: keyof User, value: string) => {
    setSusers((prevSusers) => {
      const updated = [...prevSusers];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addUser = () => {
    setSusers((prev) => [
      ...prev,
      { name: "", email: "", password: "", image: null },
    ]);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const req:{
        data: {
          message: string
        users: {
          name: string;
          email: string;
          password: string;
        }[]}
      } = await axios.post("/api/setup", {users : JSON.stringify(Susers) , CPG: JSON.stringify(SCPG.current)});
      setUsers(req.data.users)
      setSchool({
        CPG: SCPG.current,
        principle: Sprinciple.current,
        schoolAdmins: SschoolAdmins,
        securityPassword: SsecurityPassword.current 
      })
      setUser({
        ...user,
        madeUsers: true
      })
      toast.success("Setup successful !");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed , please read the notes and try again .");
    }
  };





  return (
    <div className="flex justify-center min-h-screen  ">
      <Card className="w-220 mb-50 mt-10 box-effect h-150 overflow-y-auto ">
        <CardHeader>
          <CardTitle>School Information</CardTitle>
          <CardDescription>
            <p>
              In this form you can add the users/admins which have exclusive
              features to add or edit about the school or students or add some
              of your schools information .
            </p>
            <p>Notes:</p>
            <ol>
              <li>1. You can add more than one users .</li>
              <li>
                2. You must add a username , an email , and a password foreach
                user .
              </li>
              <li>
                3. You can add 20 users and you can only add 5 school
                administrators .
              </li>
            </ol>
          </CardDescription>
        </CardHeader>
        <div><BigSeparator/></div>
        <form onSubmit={handleSubmit} ref={form} className="flex flex-col">
          <CardContent>
            {/* users */}
            <section className="p-2.5 mb-2.5 flex justify-center flex-col items-center gap-4 ">
              <h3>users</h3>
              {Susers.map((user, index) => (
                <div key={index}>
                  <div className="p-2.5 mb-2.5 flex justify-center items-center gap-4 inputType">
                    <div className={divClass}>
                      <Label>Name {index + 1}</Label>
                      <Input
                        type="text"
                        placeholder="Name"
                        required
                        value={user.name}
                        onChange={(e: inputEl) =>
                          handleChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className={divClass}>
                      <Label>Email {index + 1}</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        required
                        value={user.email}
                        onChange={(e: inputEl) =>
                          handleChange(index, "email", e.target.value)
                        }
                      />
                    </div>
                    <div className={divClass}>
                      <Label>Password {index + 1}</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          className="password"
                         type={showPassword[index] ? "text" : "password"}
                          placeholder="Password"
                          required
                          value={user.password}
                          onChange={(e: inputEl) =>
                            handleChange(index, "password", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {Susers.length !== 1 && (
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => {
                          setSusers(Susers.filter((_, i) => i !== index));
                        }}
                      >
                        remove
                      </Button>
                    )}
                  </div>
                  {index !== Susers.length - 1 && <Separator />}
                </div>
              ))}
            </section>
            <BigSeparator />

            <section className="p-2.5 mb-2.5 flex flex-col justify-center items-center gap-4  ">
              <h3>School Information </h3>
              <div className="flex justify-center items-center gap-4">
                <div className={divClass}>
                  <Label>Security Password</Label>
                  <Input
                    type="text"
                    placeholder="Security Password"
                    required
                    onChange={(e: inputEl) =>
                      (SsecurityPassword.current = e.currentTarget.value)
                    }
                  />
                </div>
                {/* <div className={divClass}>
                  <Label>School's Name</Label>
                  <Input
                    type="text"
                    placeholder="SschoolName"
                    required
                    onChange={(e: inputEl) =>
                      (SschoolName.current = e.currentTarget.value)
                    }
                  />
                </div> */}
                <div className={divClass}>
                  <Label>Principle's Name</Label>
                  <Input
                    type="text"
                    placeholder="principle's name"
                    required
                    onChange={(e: inputEl) =>
                      (Sprinciple.current = e.currentTarget.value)
                    }
                  />
                </div>


              </div>
            </section>
            <BigSeparator />

            <section className="p-2.5 mb-2.5 flex flex-col justify-center items-center gap-4 mn">
              <h3>Number Of Classes Per Grade </h3>
              <div className="flex justify-center items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>1st Grade</Label>
                  <Input
                    min={1}
                    max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["1st"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>2nd Grade</Label>
                  <Input
                    min={1}
                     max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["2nd"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>3rd Grade</Label>
                  <Input
                    min={1}
                     max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["3rd"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>4th Grade</Label>
                  <Input
                    min={1}
                     max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["4th"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>5th Grade</Label>
                  <Input
                    min={1}
                     max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["5th"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>6th Grade</Label>
                  <Input
                    min={1}
                    max={7}
                    className="w-26!"
                    type="number"
                    required
                    onChange={(e: inputEl) => {
                      SCPG.current["6th"] = parseInt(e.target.value);
                    }}
                  ></Input>
                </div>
              </div>
            </section>

            <BigSeparator />
            <section className="p-2.5 mb-2.5 flex flex-col justify-center items-center gap-4 ">
              <h3>School Administrators </h3>
              <div className="flex justify-center items-center gap-4">
                {SschoolAdmins.map((admin, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <Label>Admin {index + 1}</Label>
                    <Input
                      value={admin}
                      required
                      type="text"
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        setSschoolAdmins((prev) => {
                          const updated = [...prev];
                          updated[index] = value;
                          return updated;
                        });
                      }}
                    />
                    {SschoolAdmins.length !== 1 && (
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          setSschoolAdmins(
                            SschoolAdmins.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        Delete Administrator
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex flex-row-reverse gap-5 bg-slate-400/50 sticky bottom-0">
            <Button
              type="button"
              onClick={() => {
                if (form.current?.checkValidity) form.current.requestSubmit();
                else toast.info("please fill the form fields properly");
              }}
            >
              Submit Information
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                if (SschoolAdmins.length < 5)
                  setSschoolAdmins((prev) => [...prev, ""]);
                else
                  toast.warning(
                    "The maximum number of school administrators has been reached (5 administrators) ",
                  );
              }}
              disabled={SschoolAdmins.length >= 5}
            >
              Add Another school Administrator
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => {
                if (Susers.length < 20) addUser();
                else
                  toast.warning(
                    "The maximum number of Susers has been reached (20 Susers) ",
                  );
              }}
              disabled={Susers.length >= 20}
            >
              Add Another user
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
