import React, { useRef, useState } from "react";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import { v4 } from "uuid";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { addToDB } from "../api/ManageDB";
import { useAppContext } from "../context/AppContext";
import "./../styles/components/Card.scss";
import { TUpdateFields } from "../types/types";
import spinnersvg from "../../public/spinner.svg";

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
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [showPhoto, setShowPhoto] = useState(img);

//References an invisible file input
  const handlePhoto = () => {
    inputRef.current!.click();
  };

  const handleUploadPhoto = async (e: React.BaseSyntheticEvent) => {
    if (e.target.files[0] !== undefined) {
      const file = e.target.files[0];
      const splitFileName = file.name.split(".");
      //Verifies that it is an image file
      const extension = splitFileName[splitFileName.length - 1];
      const validExtention =
        (extension === "jpg" || extension === "png" || extension === "jpeg") &&
        file.size / 1000 <= 500;
      if (validExtention) {
        setShowPhoto("");
        //Sets image file in firestore
        const imgName = file.name + v4();
        const imgRef = ref(storage, `user__data/${user!.uid}/${imgName}`);
        await uploadBytes(imgRef, file);

        path = `${import.meta.env.VITE_REACT_APP_PATH_URL + user!.uid
          }%2F${imgName}?alt=media`;
        try {
          if (imgType === "userPic") {
            //if is a profile image, sets it in firebase auth as well as in "user_data" table
            updateProfile(user!, {
              photoURL: path,
            });
            addToDB("user_data", user!.uid, {
              ...userData,
              profilePic: path,
            });
          } else if (imgType === "userPersId") {
            //if is a certification, sets it in "user_data" table
            addToDB("user_data", user!.uid, {
              ...userData,
              userPersId: path,
            });
          } else if (imgType === "adPhoto") {
            //if is an ad image, creates a preview url and updates ad data state
            const imgFile = e.target.files[0];
            const localURL = URL.createObjectURL(imgFile);
            setPreviewPhoto(localURL);
            updateFields!({ photo: path });
          }
        } catch (err) {
          toast.error("Fehler! :( Bitte nochmal probieren");
        }
      } else {
        toast.error("Bitte nur .jpg, .jpeg, .png mit maximal 500kB hochladen.");
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
      {showPhoto && (
        <img
          className={imgType === "userPic" ? "avatar_photo" : "object_pic"}
          onClick={handlePhoto}
          src={previewPhoto !== "" ? previewPhoto : showPhoto}
        />
      )}
      {!showPhoto && <img className="spinner" src={spinnersvg} />}
    </>
  );
};

export default PhotoField;
