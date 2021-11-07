import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Slider,
  TextField,
} from "@mui/material";
import { useRef, ReactElement, useState, useCallback, useMemo } from "react";
import HelmetTitle from "../layouts/Helmet";
import AvatarEditor from "react-avatar-editor";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  useSendUserDataMutation,
  useSendNameMutation,
  setUserName,
  setUserAvatar,
} from "../store/User";
import { imgNameTypeCrop } from "../lib/imgNameTypeCrop";
import { canvas2webp } from "../lib/imageOptimaze";
import { useAppDispatch, useAppSelector } from "../store";
import { SERVER_URL } from "../lib/constants";
import { batch } from "react-redux";

const Profile = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { avatar: avatarRX, name: nameRX } = useAppSelector((st) => st.user);
  const [photo, setPhoto] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const [loadImg, setLoadImg] = useState(false);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<AvatarEditor>(null);
  const [sendData, { isLoading: sendDataLoad }] = useSendUserDataMutation();
  const [sendName, { isLoading: sendNameLoad }] = useSendNameMutation();
  const loading = useMemo(
    () => loadImg || sendDataLoad || sendNameLoad,
    [loadImg, sendDataLoad, sendNameLoad]
  );

  const fileUpload = useCallback(() => {
    setLoadImg(true);
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

  const save = useCallback(async () => {
    const canvas = editorRef.current?.getImageScaledToCanvas();
    try {
      if (canvas != null) {
        setLoadImg(true);
        const res = await canvas2webp(canvas);
        const data = new FormData();
        data.append("avatar", res, photo ? imgNameTypeCrop(photo.name) : "");
        if (name) {
          data.append("name", name);
        }
        const { avatar, name: newName } = await sendData(data).unwrap();
        if (newName == null) {
          dispatch(setUserAvatar(avatar));
        } else {
          batch(() => {
            dispatch(setUserAvatar(avatar));
            dispatch(setUserName(newName));
          });
        }
      } else {
        if (name) {
          const { name: newName } = await sendName({ name: name }).unwrap();
          dispatch(setUserName(newName));
        }
      }
      setLoadImg(false);
    } catch (e) {
      console.error(e);
      setLoadImg(false);
    }
  }, [editorRef, name, photo]);

  return (
    <>
      <HelmetTitle title="Profile" />
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
              onImageReady={() => setLoadImg(false)}
            />
          )}
          <IconButton
            onClick={() => inputRef.current?.click()}
            sx={style.upload}
          >
            <Avatar
              sx={style.avatar}
              src={avatarRX ? `${SERVER_URL}/${avatarRX}` : undefined}
            >
              {name || nameRX ? <p>{name || nameRX}</p> : null}
            </Avatar>
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
              step={0.01}
              max={5}
              min={1}
            />
          )}
          {!photo && (
            <input
              ref={inputRef}
              style={{ display: "none" }}
              onChange={fileUpload}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
            />
          )}
        </Box>
        <TextField
          sx={style.name}
          variant="standard"
          label="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={style.loader}>
          {loading && <LinearProgress color="secondary" />}
        </Box>
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
    bottom: "230px",
    right: "240px",
    zIndex: 3,
  } as const,
  name: {
    width: "250px",
  },
  scale: {
    position: "absolute",
    left: "260px",
  } as const,
  loader: {
    width: "250px",
    height: "4px",
  },
};

export default Profile;
