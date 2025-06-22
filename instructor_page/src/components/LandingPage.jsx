import QRCode from "./QRCode";
import AvatarList from "./AvatarList";
import Box from "@mui/material/Box";

const LandingPage = () => {
  return (
    <>
      <AvatarList />
      <Box className="main_cont">
        <Box className="list_cont">
          <h2 className="class_name">Class List</h2>
          <Box className="icon_cont"></Box>
        </Box>

        <Box className="qr_cont">
          <QRCode />
          <h2 className="qr_name">Class QR Code</h2>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage
