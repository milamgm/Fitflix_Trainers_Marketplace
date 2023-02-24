import { useAppContext } from "../../application/context/AppContext";
import { useChatContext } from "../../application/context/ChatContext";
import ProfileMenu from "../../application/components/Header/ProfileMenu";
import AdCard from "../components/AdCard";
import Banner from "../components/Banner";
import Sidebar from "../components/Chat/components/Sidebar";
import Chat from "../components/Chat";
import CreateAd from "../components/CreateAd";
import Header from "../../application/components/Header";
import SearchBox from "../components/SearchBox";
import SignModal from "../components/SignModal";
import PhotoField from "../components/PhotoField";
import Map from "../components/Map";
import DeleteAccountModal from "../components/DeleteAccountModal";
import Footer from "../../application/components/Footer";
import MobileSearch from "../components/MobileSearch";
import { addToDB, setAdToAdsCollection } from "../../application/api/ManageDB";
import ReauthModal from "../components/ReauthModal";
import PersonalInfoWidget from "../components/PersonalInfoForm";
import Card from "../components/ItemCard/ItemCard";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { SlSocialTwitter } from "react-icons/sl";
import PlacesAutocomplete from "../components/PlacesAutocomplete";
import Dropdown from "../components/DropDown/Dropdown";
import { auth, db } from "../../application/api/firebaseConfig";
import MessageCard from "../components/MessageCard";
import useClickOutside from "../hooks/useOnClickOutside";
import useLocalStorage from "../hooks/useLocalStorage";
import useMapsApiLoader from "../hooks/useMapsApiLoader";
import useMultistepForm from "../hooks/useMultistepForm";
import defaultPhoto from "../../../public/user.svg";
import addIcon from "../../../public/add.svg";
import logo from "../../../public/logo.svg";
import spinnersvg from "../../../public/spinner.svg";
import sendImg from "../../../public/send.svg";
import addPhoto from "../../../public/addPhoto.png";
import { validateEmail, validateRegister } from "./formValidation";
import { handleSearch } from "../scripts/handleSearch";
import RegisterForm from "../components/SignModal/Forms/RegisterForm";
import LoginForm from "../components/SignModal/Forms/LoginForm";
import { registerAccount } from "../../application/api/ManageAccount";

export {
  registerAccount,
  addPhoto,
  validateRegister,
  LoginForm,
  RegisterForm,
  handleSearch,
  spinnersvg,
  validateEmail,
  auth,
  defaultPhoto,
  addToDB,
  ProfileMenu,
  sendImg,
  logo,
  addIcon,
  useLocalStorage,
  useMapsApiLoader,
  useMultistepForm,
  useClickOutside,
  MessageCard,
  db,
  Dropdown,
  PlacesAutocomplete,
  BsFillTelephoneFill,
  AiFillFacebook,
  AiFillInstagram,
  SlSocialTwitter,
  setAdToAdsCollection,
  Card,
  PersonalInfoWidget,
  ReauthModal,
  useChatContext,
  DeleteAccountModal,
  MobileSearch,
  Footer,
  Map,
  PhotoField,
  Sidebar,
  Chat,
  useAppContext,
  AdCard,
  Banner,
  CreateAd,
  Header,
  SearchBox,
  SignModal,
};
