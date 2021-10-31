import { ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
} from "@mui/material";
import HelmetTitle from "../layouts/Helmet";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useAppDispatch } from "../store";
import { addPost, useAddPostMutation } from "../store/Posts";

const styles = {
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const,
  title: {
    height: "80px",
  },
  textfield: {
    minHeight: "250px",
    ["& fieldset"]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  loader: {
    width: "100%",
  },
  submit: {
    alignSelf: "flex-end",
    m: "8px 0",
  },
};

const AddPost = (): ReactElement => {
  const { handleSubmit, control } = useForm<postProps>();
  const dispatch = useAppDispatch();
  const [sendPost, {isLoading}] = useAddPostMutation();

  const onSubmit = async (data: postProps) => {
    try {
      const post = await sendPost(data).unwrap()
      dispatch(addPost(post));
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <>
      <HelmetTitle title="AddLog" />
      <Container maxWidth="sm">
        <Box
          onSubmit={handleSubmit(onSubmit)}
          sx={styles.form}
          component="form"
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                sx={styles.title}
                variant="filled"
                color="secondary"
                autoFocus
                tabIndex={1}
                label="Title"
                fullWidth
                type="text"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Enter Title",
              minLength: {
                value: 5,
                message: "min password length 5",
              },
            }}
          />
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                color="secondary"
                multiline
                minRows={10}
                maxRows={20}
                tabIndex={2}
                sx={styles.textfield}
                label="Log"
                fullWidth
                type="text"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Enter log",
              minLength: {
                value: 10,
                message: "min log length 10",
              },
            }}
          />
          {isLoading && <LinearProgress sx={styles.loader} color="secondary" />}
          <Button
            sx={styles.submit}
            type="submit"
            variant="outlined"
            color="secondary"
            endIcon={<SendRoundedIcon />}
          >
            Publish
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AddPost;
