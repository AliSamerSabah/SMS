import { Button } from '../ui/button';
import { Sun, Moon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import useAppContext from '@/hooks/useAppContext';
import { Link } from 'react-router-dom';
import  { DropdownMenu , DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent,  } from '../ui/dropdown-menu';
import Admin from '@/assets/svgs/admin.svg';
import logo from "@/assets/images/ui/iqedu.png";
import guest from "@/assets/images/users/guest.png";

export default function Header() {
  const { user, setUser, school } =
    useAppContext();
  const grades = ["1st", "2nd", "3rd", "4th", "5th", "6th"] as const;
  type Grades = typeof grades[number];
  return (
    <header className="grid grid-cols-[35%_40%_25%] grid-rows-1 bg-navbar h-15 w-screen text-forenavbar fixed z-100 top-0  ">
      <div className="flex pl-2.5 items-center gap-2">
        <img
          src={logo}
          alt="School Logo"
          className="rounded-full size-13"
        />
        <h5 className="hidden italic font-extrabold! text-primary w-full sm:block">
          {school.schoolName}
        </h5>
      </div>

      <nav className="flex items-center justify-center gap-2 transition-all">
        <Link to={'/'}>
          <Button variant={'Link'}>Home</Button>
        </Link>
        <Link to={'/grades'}>
          <Button variant={'Link'}>Classes</Button>
        </Link>
           <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant={'Link'}>Class</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-5'>
        <DropdownMenuGroup>
              {["1st", "2nd", "3rd" , "4th" , "5th" , "6th" ].map((grade) => (
                <DropdownMenuSub key={grade}>
                  <DropdownMenuSubTrigger>{ grade}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                    <DropdownMenuSubContent className="flex flex-col ">
                      {Array.from({ length: school.CPG[grade as Grades] }).map((_, j) => {
                        const className = String.fromCharCode(65 + j)
                        return (<Link key={j} to={`/grades/${grade}/${className}`}>
                          <DropdownMenuItem>{className}</DropdownMenuItem>
                        </Link>
                        )
                      })}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        {user.isAdmin && (<Link to={'/announcements'}>
          <Button variant={'Link'} className="w-35">Announcements</Button>
        </Link>)}
        {!user.isAdmin && (<Link to={'/signIn'}>
          <Button variant={'Link'}>Sign In</Button>
        </Link>)}
      </nav>

      <div className="flex pr-5 justify-end items-center gap-5">
        <Button
          className=""
          variant={'secondary'}
          onClick={() => {
            setUser({...user , theme: user.theme === 'dark' ? 'light' : 'dark'});
          }}
        >
          {user.theme === 'dark' ? <Sun /> : <Moon />}
        </Button>

        <span className="italic font-extrabold text-primary hidden sm:block">
          {user.name}
        </span>

        <Dialog>
          <DialogTrigger>
            <div className="flex group rounded-full">
              <img
                src={guest}
                alt="user avatar"
                className="rounded-full size-13 object-contain  order-2 z-1 border-2 translate-y-0 bg-center bg-no-repeat
                  cursor-pointer group-hover:scale-130 transition-all group-active:scale-90 group-hover:border-2 group-hover:translate-y-1 group-hover:border-white"
              />
              {user.isAdmin && (
                <img
                  src={Admin}
                  className="size-5 bg-white relative top-9 left-3 rounded-full order-1  z-2
                    cursor-pointer group-hover:scale-140 transition-all group-active:scale-90 group-hover:translate-y-1  "
                />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="-mt-10 duration-500 h-auto min-w-[50vw] box-effect ">
            <DialogHeader>
              <DialogTitle>Profile information</DialogTitle>
              <DialogDescription>
                This dialog shows your profile information such as your name ,
                username , password , profile picture ... etc.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-5">
              {/* <div>
                <img
                  src={`/api${user.imagePath}`}
                  alt="user avatar"
                  onError={(e) => {
                    console.warn(
                      "Failed to load the user's profile picture , loading the guest profile picture instead",
                    );
                    e.currentTarget.src = guest;
                  }}
                  className="rounded-full size-25 object-contain  border-2 bg-center bg-black bg-no-repeat"
                />
              </div> */}
              <div className="flex flex-col justify-around">
                <span className="flex gap-10">
                  <p>Username : {user.name}</p>
                  <p>Status : {user.isAdmin ? 'Admin' : 'user (not admin )'}</p>
                </span>
                <p>
                  Email :{' '}
                  {user.isAdmin
                    ? user.email ?? '(No email for user because you have logged in via security password)'
                    : '(No email for user because it is not an admin )'}
                </p>
                <p>
                  Password :{' '}
                  {user.isAdmin
                    ? user.password ?? '(No password for user because you have logged in via security password)'
                    : '(No password for user because it is not an admin )'}
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                {user.isAdmin ? (
                  <Button
                    variant={'destructive'}
                    onClick={() => {
                      const userData = {
                        name: 'guest',
                        email: null,
                        password: null,
                        isAdmin: false,
                        theme: user.theme,
                        madeUsers: true
                      };
                      setUser(userData);
                    }}
                  >
                    Log out
                  </Button>
                ) : (
                  <Link to={'/signIn'}>
                    <Button>Log in</Button>
                  </Link>
                )}
              </DialogClose>
              <DialogClose asChild>
                <Button variant={'secondary'} className="text-sm">
                  Close Dialog
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
