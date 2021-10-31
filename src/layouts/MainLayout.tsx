import { ReactElement } from "react";
import Header from "../components/Header";
import { Container } from "@mui/material";
import Footer from "../components/Footer";
// import Snack from "../UI/Snack";


const styles = {
  root: {
    width: "100%",
    height: "calc(100% - 126px)",
    overflow: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as const,
};

const MainLayout = ({ children }: Child): ReactElement => {
  // const snackBar = useAppSelector((state) => state.snackBar);
  return (
    <>
      <Header />
      <Container disableGutters sx={styles.root} maxWidth={false}>
        <>{children}</>
      </Container>
      {/* <Snack {...snackBar} /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
