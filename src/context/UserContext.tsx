"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { KindeUser as KindeUserType } from "@kinde-oss/kinde-auth-nextjs";
import { getUserAccounts, hideConsoleLogs } from "@/lib/utils";
import { Raleway } from "next/font/google";
import { usePathname } from "next/navigation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useRouter } from "next/navigation";

const font = Raleway({ subsets: ["latin"] });

interface UserContextType {
  userId: string;
  userRole: string;
  userName: string;
  userInfo: any;
  loadingState: boolean;
  }

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  kindeUser,
}: {
  children: ReactNode;
  kindeUser: KindeUserType | null;
}) => {
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState<any>({});
  const pathname = usePathname();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const fetchUserData = async (
    userEmail: string | null | undefined,
    user: KindeUserType | null,
    revalidate?: boolean
  ) => {
    if (!userEmail || !user) {
      setLoadingState(false);
      return;
    }

    if (!revalidate) {
      setLoadingState(true);
    }

    try {
      const data = await getUserAccounts(user);
      console.log(data);
      setUserId(data.uid);
      setUserRole(data.role);
      setUserName(data.name);
      
      const userInfo = data
      console.log("userInfo", userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingState(false);
    }
  };
  
  let called = false;

  const excludedPages = [
    "/coach",
    "/feedback",
    "/knowledge-bot",
    "/engagement-survey",
  ];
  const isExcluded = excludedPages.some((page) => pathname.includes(page));

  const basicUserConfigs = async (user: KindeUserType | null) => {
    const userAccount = await getUserAccounts(user);
    const data = userAccount;
    setUserId(data.uid);
    setUserRole(data.role);
    setUserName(data.name);
    console.log("getAllUserData", data);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (kindeUser) {
      intervalId = setInterval(() => {
        fetchUserData(kindeUser.email, kindeUser, true);
      }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    hideConsoleLogs();

    if (window.location.href.includes("dev-bot")) {
      basicUserConfigs(kindeUser);
      setLoadingState(false);
    } else {
      if (kindeUser) {
        
          if (!called) {
            fetchUserData(kindeUser.email, kindeUser);
            called = true;
          }
      } else {
        setLoadingState(false);
      }
    }
  }, []);



  const contextValue = useMemo(
    () => ({
      userId,
      userRole,
      userName,
      userInfo,
      loadingState,
      }),
    [
      userId,
      userRole,
      userName,
      userInfo,
      loadingState,
      ]
  );

  return isExcluded ? (
    <>{children}</>
  ) : (
    <UserContext.Provider value={contextValue}>
      {loadingState ? (
        <MultiStepLoader
          loadingStates={[
            { text: "Personalizing coaching with Avatars" },
            { text: "Updating simulations" },
            { text: "Updating AI models" },
            { text: "Updating NLP pipelines" },
            { text: "Updating interaction history" },
            { text: "Creating feedback loops" },
            { text: "Refreshing training data" },
          ]}
          loading={loadingState}
          duration={1500}
        />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
  
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
