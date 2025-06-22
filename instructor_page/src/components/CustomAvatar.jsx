import Avatar from '@mui/material/Avatar';


const CustomAvatar = ({ src, alt = 'Avatar', size = 40, variant = 'circular', sx = {} }) => {
    return (
        <Avatar
            src={src}
            alt={alt}
            variant={variant}
            sx={{ width: size, height: size, ...sx}}
        >
            {!src && alt ? alt.charAt(0).toUpperCase() : null}
        </Avatar>
    )
}

export default CustomAvatar