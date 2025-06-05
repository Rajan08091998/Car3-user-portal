"use client";

import { useEffect } from "react";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getUserAccounts, hideConsoleLogs } from "@/lib/utils";
import { LoginWall } from "./UnAuthpage";
import NetworkNav from "@/components/NetworkNav";
// import LogRocket from "logrocket";
// import setupLogRocketReact from "logrocket-react";
// import * as Sentry from "@sentry/nextjs";

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}
declare let window: CustomWindow;

const LayoutComponent = ({
  user,
  children
}: {
  user: KindeUser | null;
  children: React.ReactNode;
}) => {
  hideConsoleLogs();
  useEffect(() => {
    if (user) {
      let userId = ''
      getUserAccounts(user).then((data: any) => {
        console.log("layouted component : ", data);
        userId = data.uid;
        window.userIdFromWebApp = data.uid;
      });

      window.user = user;
    }
  }, []);

  return (
    <>
      {!user ? (

        <LoginWall />

      ) : (
        <div className="h-full min-h-[120vh] bg-white pb-16 max-sm:h-full max-sm:min-h-screen">
          <div className="z-[999]">
            <NetworkNav
              restrictedPages={""}
              user={user}
            />
          </div>
          <div className="z-[999]">{children}</div>
        </div>


      )}
    </>
  );
};

export default LayoutComponent;
