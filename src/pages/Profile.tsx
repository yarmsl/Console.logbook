import {  TextField } from "@mui/material";
import { ReactElement } from "react";
import HelmetTitle from "../layouts/Helmet";

const Profile = (): ReactElement => {
  return (
    <>
      <HelmetTitle title="Profile" />
      <TextField type='file' />
    </>
  );
};

export default Profile;
