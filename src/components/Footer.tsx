import { Box, Container, IconButton, Typography } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";

const styles = {
  footer: {
    height: '58px',
    backgroundColor: "secondary.light",
    color: "#fff",
    userSelect: "none",
  } as const,
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    width: "132px",
  },
  logo: {
    transform: "rotate(1deg)",
  },
  right: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
  } as const,
};

const Footer = (): JSX.Element => {
  return (
    <Box sx={styles.footer} component="footer">
      <Container sx={styles.wrapper}>
        <Box sx={styles.left}>
          <Typography sx={styles.logo} variant="body2">
            Console.logbook(&#39;Data&#39;)
          </Typography>
        </Box>
        <Typography variant="body2">© 2021</Typography>
        <Box sx={styles.right}>
          <IconButton sx={styles.icon} href="https://t.me/Yaroslavmsl" size="large">
            <TelegramIcon />
          </IconButton>
          <Typography>Yaroslav M.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
