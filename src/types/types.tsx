import { User } from "firebase/auth";
import React from "react";

export interface IAppContext {
  user: User | null ;
  setUser: React.Dispatch<React.SetStateAction<User | null >>;
  userData: IUserData | null;
  isLoaded: boolean
}
export interface IUserData {
  name: string;
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

export type TUpdateFields = (fields: { [key: string]: string | number | string[] }) => void;

export interface IPersonalInfoForm {
  input_name: string;
  input_phoneNumber: string;
}