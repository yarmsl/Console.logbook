import { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  IconButton,
  Link as MUILink,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { useHistory, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux.hooks";
import { signOut } from "../state/actions/authActions";

const styles = {
  header: {
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "secondary.contrastText",
    userSelect: "none",
    transform: "rotate(1deg)",
  } as const,
  avatar: {
    bgcolor: "secondary.light",
  },
  menuTitle: {
    ml: "8px",
  } as const,
};

const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const id = useAppSelector((state) => state.user.id);

  const router = useHistory();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar enableColorOnDark position="sticky">
      <Container sx={styles.header}>
        <MUILink component={Link} to={"/"}>
          <Typography variant="h5" component="h1" sx={styles.logo}>
            Console.logbook(&apos;123&apos;)
          </Typography>
        </MUILink>
        {isAuth && (
          <>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size="large">
              <Avatar sx={styles.avatar}></Avatar>
            </IconButton>
            <>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    router.push(`/profile/${id}`), handleClose();
                  }}>
                  <PersonIcon />
                  <Typography sx={styles.menuTitle}>Profile</Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    dispatch(signOut()), handleClose();
                  }}>
                  <ExitToAppRoundedIcon />
                  <Typography sx={styles.menuTitle}>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          </>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
