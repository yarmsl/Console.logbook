import { ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  makeStyles,
  TextField,
} from "@material-ui/core";
import HelmetLayout from "../layouts/HelmetLayout";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux.hooks";
import { publishPost } from "../state/actions/postsActions";

const useStyles = makeStyles(() => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
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
    margin: "8px 0",
  },
}));

const AddPost = (): ReactElement => {
  const { handleSubmit, control } = useForm<postProps>();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const token = useAppSelector((st) => st.auth.token);
  const isLoading = useAppSelector((st) => st.posts.isLoading);
  const onSubmit = (data: postProps) => {
    console.log(data);
    if (token) {
      dispatch(publishPost(data, token));
    }
  };

  return (
    <HelmetLayout title="AddLog">
      <Container maxWidth="sm">
        <Box
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          component="form">
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.title}
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
                className={classes.textfield}
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
          {isLoading && (
            <LinearProgress className={classes.loader} color="secondary" />
          )}
          <Button
            className={classes.submit}
            type="submit"
            variant="outlined"
            color="secondary"
            endIcon={<SendRoundedIcon />}>
            Publish
          </Button>
        </Box>
      </Container>
    </HelmetLayout>
  );
};

export default AddPost;
