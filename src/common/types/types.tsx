import { User } from "firebase/auth";
import React from "react";
import { TFunction } from "i18next";

export interface IAppContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: IUserData | null;
  isLoaded: boolean;
  t: TFunction;
}
export interface IChatContext {
  partnertsData: IPartnertData[];
  userChats: IUserChat[];
  activeChat: IPartnertData;
  setActiveChat: React.Dispatch<React.SetStateAction<IPartnertData>>;
}
export interface IUserData {
  uid: string;
  name: string;
  email: string;
  phoneNumber: string;
  postedAds: { [key: string]: IAdData };
  profilePic: string;
  userPersId: string;
}

export interface IAdData {
  aid: string;
  uid: string;
  title: string;
  categories: string[];
  description: string;
  about: string;
  location: string;
  available: string[];
  price: number;
  phone: number;
  photo: string;
}

export type TUpdateFields = (fields: {
  [key: string]: string | number | string[];
}) => void;

export interface IPersonalInfoForm {
  input_name: string;
  input_phoneNumber: string;
}

export interface IPartnertData {
  partnerUid: string;
  partnerName: string;
  partnerPic: string;
}

export interface IUserChat {
  aid: string;
  chat_id: string;
  partner_uid: string;
}

export interface IMessage {
  id: string;
  date: any;
  message: string;
  sender_uid: string;
}
export interface IChat {
  messages: IMessage[];
}
