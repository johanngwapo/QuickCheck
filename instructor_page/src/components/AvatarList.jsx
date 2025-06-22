import CustomAvatar from "./CustomAvatar";
import Avatars from "./ConfigAvatar";
import Box from "@mui/material/Box";

const AvatarList = () => {
    const leftAvatar = Avatars[0]
    const rightAvatars = Avatars.slice(1)

    return (
        <Box className="avatar_cont">
            <Box>
                <CustomAvatar {...leftAvatar} />
            </Box>

            <Box className="avatar_right_cont">
                {rightAvatars.map (({ id, src, alt, size}) => (<CustomAvatar key={id} src={src} alt={alt} size={size} />))}
            </Box>
        </Box>
    )
}

export default AvatarList