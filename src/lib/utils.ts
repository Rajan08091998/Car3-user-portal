import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Car3 - User portal",
  description = "",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ffalah_",
    },
    icons,
    metadataBase: new URL("https://coachbots.com"),
    // themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const convertDate = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};

export const convertDateWithTime = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};


export function capitalizeText(text: string) {
  if (typeof text !== "string" || text.length === 0) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

// api endpoints via subdomain match
export const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
export const devUrl = "https://car3one.com/api/v1";
export const prodUrl = "http://localhost:8001/api/v1";
export const baseURL = subdomain === "platform" ? prodUrl : devUrl;

export const basicAuth =
  "Basic ";



export const hideConsoleLogs = () => {
  if (baseURL.includes("prod")) {
    return (console.log = function () {});
  }
};

export const getUserAccount = (user: any) => {
  return {
    uid: "123",
    name: `${user.given_name} ${user.family_name ? user.family_name : ""}`,
    email: user.email,

  }
  return fetch(`${baseURL}/accounts/`, {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_context: {
        name: `${user.given_name} ${user.family_name ? user.family_name : ""}`,
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            name: `${user.given_name} ${
              user.family_name ? user.family_name : ""
            }`,
            username: `${user.given_name} ${
              user.family_name ? user.family_name : ""
            }`,
            email: user.email,
          },
        },
      },
      identity_context: {
        identity_type: "deepchat_unique_id",
        value: user.email,
      },
    }),
  });
};

export const getUserAccounts = async (
  user: any,
  retry: boolean = true
): Promise<any> => {
  const data = {
    uid: "123",
    name: `${user.given_name} ${user.family_name ? user.family_name : ""}`,
    email: user.email,

  }
  return Promise.resolve(data); // Return the object as a resolved promise

  try {
    const response = await fetch(`${baseURL}/accounts/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_context: {
          name: `${user.given_name} ${user.family_name || ""}`,
          role: "member",
          user_attributes: {
            tag: "deepchat_profile",
            attributes: {
              name: `${user.given_name} ${user.family_name || ""}`,
              username: `${user.given_name} ${user.family_name || ""}`,
              email: user.email,
            },
          },
        },
        identity_context: {
          identity_type: "deepchat_unique_id",
          value: user.email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<any>; // Typecast response to UserAccountResponse
  } catch (error) {
    if (retry) {
      console.warn("Request failed, retrying once...");
      return getUserAccounts(user, false);
    } else {
      console.error("Request failed after retrying:", error);
      throw error; // Rethrow the error after a failed retry
    }
  }
};



export function convertTextToCorrectFormat(text: string) {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(/\s+/)
    .map((word) =>
      word.replace(/(?:^|\s)([a-z])/g, (match, group) => group.toUpperCase())
    )
    .join(" ");
}

export const scrollToView = (id: string) => {
  const element = document.getElementById(id);

  element?.scrollIntoView({
    behavior: "smooth",
  });
};


export function replaceSpecialCharacters(inputString: string) {
  const specialCharsRegex = /[^a-zA-Z0-9\s-]/g;
  const cleanedString = inputString.replace(specialCharsRegex, "");
  console.log(cleanedString);
  return cleanedString;
}

export function isValidLinks(linksString: string): boolean {
  const links = linksString.split(",");
  const urlRegex = /^(http|https):\/\/[^ "]+\.[a-zA-Z]{2,}(\/[^ "]+)*$/;

  for (const link of links) {
    const trimmedLink = link.trim();
    if (!urlRegex.test(trimmedLink)) {
      return false;
    }
  }

  return true;
}

export function isValidYoutubeLinks(linksString: string): boolean {
  const links = linksString.split(",");
  const urlRegex = /^https?:\/\/(?:www\.)?(youtube\.com\/.+|youtu\.be\/.+)$/;

  for (const link of links) {
    const trimmedLink = link.trim();
    if (!urlRegex.test(trimmedLink)) {
      return false;
    }
  }

  return true;
}


export function makeTaggableName(name: string) {
  let taggableName = name.replace(/\s+/g, "").toLowerCase();
  return taggableName;
}


export function excludeSpecialCharacters(inputString: string) {
  const regex = /[^a-zA-Z0-9!.,? ]/g;
  const cleanedString = inputString.replace(regex, "");
  return cleanedString;
}

export const parseStringList = (str: any) => {
  return str
    ?.split(",")
    .map((str: string) => str.trim())
    .join(",");
};
