import { ReactElement, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Container,
  TextField,
  makeStyles,
  ButtonGroup,
  Button,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import HelmetLayout from "../layouts/HelmetLayout";
import { signIn, signUp } from "../state/actions/authActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../lib/hooks/redux.hooks";
import { OPEN_SNACKBAR } from "../lib/constants";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginBottom: 15,
    transform: "rotate(1deg)",
    userSelect: "none",
  },
  form: {
    height: "280px",
    "&>*": {
      marginBottom: 15,
    },
  },
  input: {
    height: "70px",
  },
}));

const Auth = (): ReactElement => {
  const { handleSubmit, control, setError, clearErrors } = useForm<formLogin>();
  const dispatch = useDispatch();
  const { isLoading, error } = useAppSelector((st) => st.auth);
  const classes = useStyles();

  const snackAlert = useCallback(
    (err: string) => {
      dispatch({
        type: OPEN_SNACKBAR,
        snackBar: { type: "alert", message: err },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (error != null) {
      switch (error) {
        case "incorrect email":
          return setError("email", { type: "validate", message: error });
        case "user exists":
          return setError("email", { type: "validate", message: error });
        case "enter correct email":
          return setError("email", { type: "validate", message: error });
        case "user not found":
          return setError("email", { type: "validate", message: error });
        case "enter pass":
          return setError("password", { type: "required", message: error });
        case "min password length 6":
          return setError("password", { type: "validate", message: error });
        case "password is incorrect":
          return setError("password", { type: "validate", message: error });
        case "Failed to fetch":
          return snackAlert("server is not available");
        default:
          return snackAlert(error);
      }
    }
    return () => {
      clearErrors();
    };
  }, [error]);

  return (
    <HelmetLayout title="Sign">
      <Container className={classes.root} maxWidth="xs">
        <Box className={classes.title}>
          <Typography>Welcome to&nbsp;</Typography>
          <Typography color="secondary">Console.logbook&nbsp;</Typography>
          <Typography>- a simple notebook</Typography>
        </Box>
        <Box className={classes.form} component="form">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                tabIndex={1}
                className={classes.input}
                label="Email"
                fullWidth
                type="text"
                autoComplete="email"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Enter your email",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Incorrect email",
              },
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                tabIndex={2}
                className={classes.input}
                label="Password"
                fullWidth
                type="password"
                autoComplete="current-password"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Enter password",
              minLength: {
                value: 6,
                message: "min password length 6",
              },
            }}
          />
          <ButtonGroup
            fullWidth
            variant="contained"
            color="secondary"
            disabled={isLoading}>
            <Button onClick={handleSubmit((data) => dispatch(signUp(data)))}>
              Sign up
            </Button>
            <Button onClick={handleSubmit((data) => dispatch(signIn(data)))}>
              Sign in
            </Button>
          </ButtonGroup>
          {isLoading && <LinearProgress color="secondary" />}
        </Box>
      </Container>
    </HelmetLayout>
  );
};

export default Auth;
