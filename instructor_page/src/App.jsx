  import Logo from "./components/Logo";
  import Kyuare from "./components/Kyuare";
  import Box from "@mui/material/Box";

  export default function App() {
    return (
      <>
        <Box className="logo_cont">
          <Logo />
        </Box>

        <Box className="main_cont">
          <Box className="list_cont">
            <h2 className="class_name">Class List</h2>
            <Box className="icon_cont"></Box>
          </Box>

          <Box className="qr_cont">
            <Kyuare/>
            <h2 className="qr_name">Class QR Code</h2>
            </Box>
        </Box>
      </>
    );
  }
