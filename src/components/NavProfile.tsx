"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ExternalLink, Globe, LogOut, User, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavProfile = ({ user }: any) => {
  const pathname = usePathname();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible !z-[999]">
            <div className=" p-[4px]">
              <UserCircle2 className="h-6 w-6 text-zinc-700 z-[999] hover:cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[999] max-sm:text-xs ">
            <div className="flex items-center justify-center gap-2 p-2">
              <div className="flex flex-col space-x-0.5 leading-none">
                {user.given_name && (
                  <p className="font-medium text-sm  text-black">
                    {`${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`}
                  </p>
                )}
                {user.email && (
                  <p className="w-[200px] truncate text-xs text-slate-700">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="max-sm:text-xs ">
              <Link href={"/profile"} className="w-full">
                <User className="h-4 w-4 mr-2" /> My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="max-sm:text-xs ">
              <LogoutLink>
                {" "}
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"default"} className={cn("text-xs h-8 px-4 z-50")}>
          <RegisterLink postLoginRedirectURL={pathname}>Log in</RegisterLink>
        </Button>
      )}
    </>
  );
};

export const NavProfileWoProfile = ({ user }: any) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible !z-[999]">
            <div className=" p-[4px]">
              <UserCircle2 className="h-6 w-6 text-zinc-700 z-[999] hover:cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[999]">
            <div className="flex items-center justify-center gap-2 p-2">
              <div className="flex flex-col space-x-0.5 leading-none">
                {user.given_name && (
                  <p className="font-medium text-sm text-black">
                    {`${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`}
                  </p>
                )}
                {user.email && (
                  <p className="w-[200px] truncate text-xs text-slate-700">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink postLogoutRedirectURL={pathname}>
                {" "}
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {pathname.includes("/knowledge") ||
            pathname.includes("/feedback") ||
            (pathname.includes("/engagement-survey") && (
              <Button
                variant={"default"}
                className={cn("text-xs h-8 px-4 z-50")}
              >
                <LoginLink postLoginRedirectURL={pathname}>
                  Log in
                </LoginLink>
              </Button>
            ))}
        </>
      )}
    </>
  );
};

export default NavProfile;
