import React, { createContext, useContext } from "react";
import rawData from "data.json";

import { IData } from "@/types/data";

const db = rawData as Record<string, any>;

interface UserDataContextType {
  id: string;
  data: IData;
  mainColor: string;
  subColor: string;
  splashColor: string;
  bgColor: string;
  fontColor: string;
  font: string;
}

const defaultUserData: IData = {
  type: "simple",
  mainColor: "#f78828",
  subColor: "#ccc",
  bgColor: "#fff",
  fontColor: "#000",
  font: "",
  splashColor: "#000",
  date: "",
  videoSrc: "",
  main: {
    title: "",
    message: "",
    date: "",
    eventDetail: "",
    gallery: {
      message1: "",
      message2: "",
    },
    host: {
      groom: { name: "", relation: "", parents: [] },
      bride: { name: "", relation: "", parents: [] },
    },
  },
  mapInfo: {
    address1: "",
    address2: "",
    naverMap: "",
    location: [],
  },
  hostInfo: [],
};

export const UserDataContext = createContext<UserDataContextType>({
  id: "",
  data: defaultUserData,
  mainColor: "#f78828",
  subColor: "#ccc",
  splashColor: "#000",
  bgColor: "#fff",
  fontColor: "#000",
  font: "",
});

export const UserDataProvider: React.FC<{ id: string, children: React.ReactNode }> = ({ id, children }) => {
  const data = (db[id] || defaultUserData) as IData;
  const mainColor = db[id]?.mainColor || "#f78828";
  const subColor = db[id]?.subColor || "#ccc";
  const splashColor = db[id]?.splashColor || mainColor;
  const bgColor = db[id]?.bgColor || "#fff";
  const fontColor = db[id]?.fontColor || "#000";
  const font = db[id]?.font || "#000";

  return (
    <UserDataContext.Provider value={{ id, data, mainColor, subColor, splashColor, bgColor, fontColor, font }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);