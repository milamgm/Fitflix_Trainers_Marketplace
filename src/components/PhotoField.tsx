import React, { useRef, useState } from "react";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import { v4 } from "uuid";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { addToDB } from "../api/DBqueries";
import { useAppContext } from "../context/AppContext";
import "./../styles/components/Card.scss";
import { TUpdateFields } from "../types/types";

interface IPhotoFieldProps {
  img: string;
  imgType: string;
  updateFields?: TUpdateFields;
}
const PhotoField = ({ img, imgType, updateFields }: IPhotoFieldProps) => {
  const { user, userData } = useAppContext();
  const storage = getStorage();
  let path = "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [prevPhoto, setPrevPhoto] = useState("");

  const handlePhoto = () => {
    inputRef.current!.click();
  };

  const handleUploadPhoto = async (e : React.BaseSyntheticEvent) => {
    if (e.target.files[0] !== undefined) {
      const file = e.target.files[0];
      const splitFileName = file.name.split(".");
      const extension = splitFileName[splitFileName.length - 1];
      console.log(extension);
      const validExtention =
        extension === "jpg" || extension === "png" || extension === "jpeg";
      if (validExtention) {
        const imgName = file.name + v4();
        const imgRef = ref(storage, `user__data/${user.email}/${imgName}`);
        console.log(file);
        uploadBytes(imgRef, file);

        path = `${
          import.meta.env.VITE_REACT_APP_PATH_URL + user.email
        }%2F${imgName}?alt=media`;
        try {
          if (imgType === "userPic") {
            updateProfile(user, {
              photoURL: path,
            });
            addToDB("user_data", user.email, {
              ...userData,
              profilePic: path,
            });
          } else if (imgType === "userPersId") {
            addToDB("user_data", user.email, {
              ...userData,
              userPersId: path,
            });
          } else if (imgType === "adPhoto") {
            const imgFile = e.target.files[0];
            const localURL = URL.createObjectURL(imgFile);
            setPrevPhoto(localURL);
            updateFields!({ photo: path });
          }
        } catch (err) {
          toast.error("Fehler! :( Bitte nochmal probieren");
        }
      } else {
        toast.error("Bitte nur .jpg, .jpeg, .png hochladen");
      }
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={(e) => handleUploadPhoto(e)}
      />
      <img
        className={imgType === "userPic" ? "avatar_photo" : "object_pic"}
        onClick={handlePhoto}
        src={prevPhoto !== "" ? prevPhoto : img}
      />
    </>
  );
};

export default PhotoField;
