import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Slider,
  TextField,
} from "@mui/material";
import { useRef, ReactElement, useState, useCallback } from "react";
import HelmetTitle from "../layouts/Helmet";
import AvatarEditor from "react-avatar-editor";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const Profile = (): ReactElement => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const fileUpload = useCallback(() => {
    if (
      inputRef.current != null &&
      inputRef.current.files != null &&
      inputRef.current.files.length > 0
    ) {
      setPhoto(inputRef.current.files[0]);
    }
  }, [inputRef]);

  const clear = useCallback(() => {
    setPhoto(null);
    setScale(1);
    if (inputRef.current != null) {
      inputRef.current.files = null;
    }
  }, [inputRef, photo]);

  const save = useCallback(() => {
    const canvas = editorRef.current?.getImage();
    console.log(canvas);
  }, [editorRef]);

  return (
    <>
      <HelmetTitle title="Profile" />
      {console.log(editorRef)}
      <Container sx={style.root}>
        <Box sx={style.avatarWrapper}>
          {photo && (
            <AvatarEditor
              ref={editorRef}
              style={style.avatarEditor}
              width={250}
              height={250}
              border={0}
              image={photo || "nope"}
              borderRadius={125}
              color={[255, 255, 255, 1]}
              scale={scale}
            />
          )}
          <IconButton
            onClick={() => inputRef.current?.click()}
            sx={style.upload}
          >
            <Avatar sx={style.avatar}>{name ? <p>{name}</p> : null}</Avatar>
          </IconButton>
          {photo && (
            <IconButton onClick={clear} sx={style.clear}>
              <HighlightOffRoundedIcon color="error" />
            </IconButton>
          )}
          {photo && (
            <Slider
              color="secondary"
              sx={style.scale}
              orientation="vertical"
              value={scale}
              onChange={(_, s) => setScale(s as number)}
              aria-label="Scale"
              step={0.05}
              max={2}
              min={1}
            />
          )}
          <input
            ref={inputRef}
            style={{ display: "none" }}
            onChange={fileUpload}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
          />
        </Box>
        <TextField
          sx={style.name}
          variant="standard"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={save}
          variant="contained"
          color="secondary"
          endIcon={<SaveRoundedIcon />}
        >
          Save
        </Button>
      </Container>
    </>
  );
};

const style = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&>*:not(:last-child)": {
      mb: "8px",
    },
  } as const,
  avatarWrapper: {
    width: "250px",
    height: "250px",
    position: "relative",
  } as const,
  upload: {
    width: "250px",
    height: "250px",
    position: "absolute",
    zIndex: 1,
  } as const,
  avatar: {
    width: "250px",
    height: "250px",
    "&>p": {
      width: "100%",
      textAlign: "center",
      overflow: "hidden",
      wordBreak: "break-all",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    } as const,
  } as const,
  avatarEditor: {
    position: "absolute",
    zIndex: 2,
  } as const,
  clear: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
  } as const,
  name: {
    width: "250px",
  },
  scale: {
    position: "absolute",
    left: "260px",
  } as const,
};

export default Profile;
