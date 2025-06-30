import CustomAvatar from "./CustomAvatar";
import Avatars from "./ConfigAvatar";
import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";

const AvatarList = () => {
    const leftAvatar = Avatars[0];
    const rightAvatars = Avatars.slice(1);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#FFFDF6'}}>
            <Toolbar>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Box>
                        <CustomAvatar {...leftAvatar} />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
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
