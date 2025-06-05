import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutComponent from "./LayoutComponent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserProvider } from "@/context/UserContext";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelpModeProvider } from "@/lib/helpmodeContext";
import Providers from "./ProgressBarProvider";
import { ReadPaths } from "@/lib/ReadPaths";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";

const font = Raleway({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  return (
    <html lang="en" >

      <HelpModeProvider>
        <>
          <body className={font.className} suppressHydrationWarning={true}>
            <UserProvider kindeUser={user}>
              <>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <ConfigProvider theme={{ hashed: false }}>
                    <AntdRegistry>
                      <Providers>
                        <LayoutComponent
                          user={user}
                          children={children}
                        />
                        <ReadPaths />
                      </Providers>
                    </AntdRegistry>
                  </ConfigProvider>
                </ThemeProvider>
                <ThemeToggle/>
              </>

              <Toaster
                theme="light"
                closeButton
                richColors
                position="top-right"
              />
            </UserProvider>
          </body>
        </>
      </HelpModeProvider>
    </html>
  );
}
