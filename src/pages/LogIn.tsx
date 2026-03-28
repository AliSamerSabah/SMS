import { Button } from "@/components/ui/button";
import { Card ,CardContent ,CardDescription , CardHeader , CardFooter , CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog , DialogContent , DialogDescription , DialogFooter , DialogHeader , DialogTitle , DialogClose , DialogTrigger } from "@/components/ui/dialog";
import useAppContext from "@/hooks/useAppContext";
import { useRef, useState, type SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { User } from "lucide-react";
export default function LogIn() {
  const form = useRef<HTMLFormElement | null>(null)
  const link = useRef<HTMLButtonElement | null>(null)
  const { users,  setUser, user , school } = useAppContext();
  const [email , setEmail] = useState("") 
  const [pasword , setPassword] = useState("") 
  const [SP , setSP] = useState("") 
  const [type, setType] = useState(true) 
  const [typeSP, setTypeSP] = useState(true) 
  const HandleSP = () => {
        if (SP) {
      if (SP === school.securityPassword) {
        const newUser = { ...user }
        newUser.isAdmin = true
        setUser(newUser)
        link.current?.click()
        toast.success("You have logged in successfully ")
      }
    }
  }
  const HandleSubmit = (f:SubmitEvent<HTMLFormElement>) => {
    f.preventDefault()

    if(!users) return ""
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userInfo: any = {... users.find((user) => user.email === email && user.password === pasword )}
    if (!userInfo) return ""
    userInfo.isAdmin = true
      setUser(userInfo)
        link.current?.click()
        toast.success(`Welcome back ${User.name} ,  You have logged in successfully `)

  }
  return (
    <main className="min-h-screen flex justify-center items-center  ">
        <Link to="/">
      <button ref={link}></button>
        </Link>
      <Card className="w-150 mb-50 mt-10 box-effect   ">
        <CardHeader>
          <CardTitle>
      LOG IN
          </CardTitle>
          <CardDescription>
            Log into your account to access special admin features such as deleting users , change school information , add , change or delete students and much more . 
          </CardDescription>
        </CardHeader>

        <form onSubmit={HandleSubmit} ref={form}>
          <CardContent className="pb-10">
            <div className="flex flex-col gap-5">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex gap-2 items-center">
                  <Input type={type === true ? "password" : "text"} required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <Input type="checkbox" onChange={()=>{setType(!type)}} className="size-5" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row-reverse gap-5">
            <Button type="button" onClick={() => {
              if (form.current?.checkValidity()) form.current.requestSubmit()
                 toast.warning("Please fill the form properly and correctly")
            }}>Log in</Button>
            <Link to="/"><Button type="button" variant="destructive">exit</Button></Link>
            <Dialog>
              <DialogTrigger asChild>
            <Button variant={"outline"}>
              Log in by another way  
            </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Security Password</DialogTitle>
                  <DialogDescription>You can enter your security password to log in without a name , an email or a password</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Label>Security Password</Label>
                  <div className="flex gap-4 items-center">
                    <Input type={typeSP === true ? "password" : "text"}
                      placeholder="Security Password" onChange={(e) => setSP(e.target.value)} />
                    <Input  type="checkbox" onChange={()=>{setTypeSP(!typeSP)}} className="size-5" />
                  </div>
                </div>
                <DialogFooter className="flex flex-row-reverse">
                    <DialogClose asChild>
                      <Button variant="destructive">Exit</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={HandleSP}>Log in</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}