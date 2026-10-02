
export interface IData {
  type: string;
  splashColor?: string;
  mainColor? : string;
  subColor? : string; 
  bgColor? : string;
  fontColor? : string;
  mainFont? : string;
  splashMode? : string;
  font? : string;
  date : string;
  main: IMain;
  hostInfo: IHostInfo[];
  mapInfo: IMapInfo;
  videoSrc?: string;
}

export interface IMain {
  mainImg?: string;
  title: string;
  subtitle?: string;
  date: string;
  message: string;
  gallery: {
    message1: string;
    font1?: string;
    y1?: number;
    size1?: number;
    x1?: number;
    rotate1?: number;
    color1?: string;
    message2: string;
    font2?: string;
    y2?: number;
    size2?: number;
    x2?: number;
    rotate2?: number;
    color2?: string;
  },
  host: {
    groom: BrideAndGroom;
    bride: BrideAndGroom;
  };
  eventDetail: string;
}

export interface BrideAndGroom {
  name: string;
  relation: string;
  parents: Parent;
}

type Parent = { relation: string; isDeceased?: boolean; name: string }[];


export interface IMapInfo {
  address1: string;
  address2: string;
  naverMap: string;
  location: ILocationInfo[];
}

export interface ILocationInfo {
  title: string;
  desc: string;
}

// Account
export interface IHostInfo {
  host: string;
  accountInfo: { 
    name: string; 
    relation: string; 
    bank: string; 
    account: string;
    kakaopayAccount?:string;
    tossAccount?:string; }[];
}

