import { Button } from "@/components/ui/button";
import { subPerGrade } from "@/consts";
import { useTableContext } from "@/hooks/useTableContext";
import type {  Grades as g, Student } from "@/types";
import { useRef, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
// import axios from "axios";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import {saveAs} from "file-saver"

type InfoRef = {
  name: string;
  DOB: string;
  address: string;
  phone: string;
  notes: string;
};

export function AddStudentSheet() {
  const form = useRef<HTMLFormElement>(null);
  const tc = useTableContext();
  const {
    classRoom: {
      classRoom: { classes },
    },
    data: { setData },
    dirty: { setIsDirty },
  } = tc;

  const [info, setInfo] = useState<InfoRef>({
    name: "",
    DOB: "",
    address: "",
    phone: "",
    notes: "",
  });

  // const [imgFile, setImgFile] = useState<File | null>(null);

  const handleSubmit = () => {
    console.log("hi")
    form.current?.reset()
    const gr = tc.classRoom.classRoom.grades;
    // if (imgFile !== null) {
    //   const formData = new FormData();
    //   const f = saveAs(imgFile, `${info.name}.webp`)
    //   formData.append("image", f);
    //   axios.post(
    //     `/api/createImage/${gr}/${info.name}`, formData, {
    //       headers: {
    //       "Content-Type": "multipart/form-data",
    //       },
    //   })
    //   setImgFile(null)
    // }
    const myGrades = subPerGrade[gr];
    const subjects = myGrades.reduce(
      (prev: any, curr: any) => ({ ...prev, [curr]: {} }),
      {},
    );
    const grades = {
      subjects,
    } as g;
    const newStudent: Student = {
      personalInfo: {
        name: info.name,
        DOB: info.DOB,
        address: info.address,
        phone: info.phone,
        notes: info.notes,
      },
      academicInfo: {
        currentStage: gr,
        currentClass: classes,
      },
      totalAbsences: 0,
      grades,
    };
    setData((prev) => {
      const old = [...prev];
      return [...old, newStudent];
    });
    console.log(" created ahahahhahahahahahaah");
    setIsDirty(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>add new Student</Button>
      </SheetTrigger>
      <SheetContent className="pt-15 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Student</SheetTitle>
          <SheetDescription asChild>
            <p className="flex flex-col gap-2">
              <span>In here , you can add a new student to this class and please read the following instructions :</span>
              <span>
                <ol>
                  <li>
                    1. information in here can{" "}
                    <span className="text-red-500">NOT</span>
                    {" "} be chnaged so once entered, IT WILL BE THERE FOR EVER .
                  </li>
                  <li>
                    2. Enter the name of the student , father , grandfather and great grandfather receptively .
                  </li>
                  <li>
                    3. enter the address of the student in the following order : country , governorate , city , street, house .
                  </li>
                  <li> 
                    in the notes section you can write anything you want about the student including ay special needs or medical conditions .
                  </li>
                </ol>
              </span>
              <span>
              </span>
            </p>
          </SheetDescription>
        </SheetHeader>
        <form ref={form}>
          <div className="flex flex-col gap-3 px-3">
            {/* <div className="flex">
              <div className="flex justify-center flex-col gap-3">
                <Label>Student Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  alt="preview"
                  onChange={(e) => setImgFile(e.currentTarget.files![0])}
                />
              </div>
              {imgFile && (
                <div className="border-4 border-foreground rounded-2xl p-2 flex justify-center items-center flex-col gap-2">
                  <img
                    src={URL.createObjectURL(imgFile)}
                    className="w-30 object-cover rounded-md border mt-2"
                    alt="preview"
                  />
                  <Button
                    variant={"destructive"}
                    onClick={() => setImgFile(null)}
                  >
                    remove image
                  </Button>
                </div>
              )}
            </div> */}
            <div className="flex flex-col gap-2 justify-center-center">
              <Label>Name</Label>
              <Input
                required
                onChange={(e) => {
                  setInfo({ ...info, name: e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-2 justify-center-center">
              <Label>DOB (Date Of Birth)</Label>
              <Input
                type="date"
                required
                onChange={(e) => {
                  setInfo({ ...info, DOB: e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-2 justify-center-center">
              <Label>Adreess</Label>
              <Input
                required
                onChange={(e) => {
                  setInfo({ ...info, address: e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-2 justify-center-center">
              <Label>Guardian's Phone Number</Label>
              <Input
                required
                type="number"
                onChange={(e) => {
                  setInfo({ ...info, phone: e.currentTarget.value });
                }}
              />
            </div>
            <div className="flex flex-col gap-2 justify-center-center">
              <Label>Notes</Label>
              <Textarea
                onChange={(e) => {
                  setInfo({ ...info, notes: e.currentTarget.value });
                }}
              />
            </div>
          </div>
        </form>
        <SheetFooter>
            <Button
              disabled={!form.current?.checkValidity()}
            type="button"
          onClick={handleSubmit}>
              add
            </Button>
          <div className="flex w-full justify-between">
            <SheetClose asChild>
              <Button className="w-[45%]" type="button" variant={"secondary"}>
                exit
              </Button>
            </SheetClose>
            <Button className="w-[45%]" type="button" variant={"secondary"} onClick={()=>form.current?.reset()}>
                Reset Form
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
