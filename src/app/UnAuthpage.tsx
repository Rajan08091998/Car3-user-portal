"use client";

import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  BarChartIcon,
  ClipboardListIcon,
  LightbulbIcon,
  Loader,
  LogIn,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";


import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const LoginWall = () => {
  const pathname = usePathname();


  const items = [
    {
      title: "Join The Network",
      description:
        "Join the network as a coach or coachee. The coaches create their avatars for interim sessions or initial matches. Users can request their subject matter bots.",
      header: <h3 className="text-xl font-bold text-gray-500">01</h3>,
      icon: <UserIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Exchange Notes & Exercises",
      description:
        "Exchange notes based on your live sessions or just communicate. The notes are augmented with simulations for the users to practice in context to the notes.",
      header: <h3 className="text-xl font-bold text-gray-500">02</h3>,
      icon: <ClipboardListIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Develop Learning Plan",
      description:
        "Just want to get some feedback? Create your feedback page and collect valuable feedback from your extended network. Use the same to create your own development plan with recommendations.",
      header: <h3 className="text-xl font-bold text-gray-500">03</h3>,
      icon: <LightbulbIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Explore & Practice Simulations",
      description:
        "Explore simulations for any use case for your team, Use the library, create your own or use simulations based on existing learning resources.",
      header: <h3 className="text-xl font-bold text-gray-500">04</h3>,
      icon: <SearchIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Track Your Progress",
      description:
        "Track your skill scores based on simulations or interactions with coaches. Display your feedback wall and also improve based on critical feedback.",
      header: <h3 className="text-xl  font-bold text-gray-500">05</h3>,
      icon: <BarChartIcon className=" text-3xl mb-4" />,
    },
  ];

  const LoginUI = () => {
    return (
      <div className="bg-white mt-4 max-sm:mt-16 min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
          <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
            <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
              Car3
            </span>
            One
          </h1>
          <p className="mt-4 text-3xl">
            AI First Coaching Based Engagement Platform
          </p>
          <div className="p-4 max-sm:px-6">
            <h2 className="text-2xl font-bold text-center text-[#034078] mb-4">
              How it works?
            </h2>
            <BentoGrid className="w-[100%] mx-auto">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  icon={item.icon}
                  className={`${i === 1 || i === 6 ? "md:col-span-2" : ""}`}
                />
              ))}
            </BentoGrid>
          </div>
          <div className="my-4 max-sm:mb-12">
            <LoginLink postLoginRedirectURL={pathname}>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className="space-y-2">
                    <Button
                      variant={"secondary"}
                      className="border border-gray-200 text-gray-600 font-bold text-xl hover:cursor-pointer w-fit"
                    >
                      Login <LogIn className="ml-2 h-4 w-4 inline" />
                    </Button>
                  </div>
                </div>
              </div>
            </LoginLink>
          </div>
        </MaxWidthWrapper>{" "}
      </div>
    );
  };

  return (
        <LoginUI />
  );
};

export const LoadingComponent = () => {
  return (
    <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center">
          <Loader className="animate-spin h-4 w-4 inline mr-2" />{" "}
          <span>loading...</span>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};
