import { Button } from "@mui/material";
import { useRef, ReactElement, useState } from "react";
import HelmetTitle from "../layouts/Helmet";

const Profile = (): ReactElement => {
  const [photo, setPhoto] = useState<Blob>();
  const [blobPhoto, setBlobPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: any) => {
    let box = null;
    if (inputRef.current && inputRef.current.files?.length === 1) {
      box = inputRef.current?.files[0];
    }

    if (box != null) {
      const reader = new FileReader();
      //loading start
      reader.readAsArrayBuffer(box);
      reader.onload = () => {
        if (reader.result != null && reader.result instanceof ArrayBuffer) {
          const res = reader.result;
          const ablob = new Blob([res]);
          setPhoto(ablob);
        }
      };
    }
  };

  const sendFile = () => {
    const sendData = new FormData();
    if (photo) {
      sendData.append("photo", photo);
      fetch("/1234567", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: sendData,
      });
    }
  };

  return (
    <>
      <HelmetTitle title="Profile" />
      <input
        ref={inputRef}
        onChange={handleUpload}
        type="file"
        accept="image/png, image/jpeg, image/webp"
      />
      <Button onClick={sendFile}>SEND</Button>
    </>
  );
};

export default Profile;
