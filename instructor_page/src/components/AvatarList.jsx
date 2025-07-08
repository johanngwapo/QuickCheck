import React from "react";
import CustomAvatar from "./CustomAvatar";
import Avatars from "./ConfigAvatar";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
 
const AvatarList = () => {
    const navigate = useNavigate();
    const leftAvatar = Avatars[0];
    const rightAvatars = Avatars.slice(1);
 
    const handleLogout = () => {
        localStorage.removeItem("token"); // For JWT logout
        navigate("/login");
    };
 
    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#FFFDF6' }}>
            <Toolbar>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Box>
                        <CustomAvatar {...leftAvatar} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout} color="error">
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                        {rightAvatars.map(({ id, src, alt, size }) => (
                            <CustomAvatar key={id} src={src} alt={alt} size={size} />
                        ))}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
 
export default AvatarList;
 