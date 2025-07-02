import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import { CiHome } from "react-icons/ci";

const iconAppBar = [
     { id: 1, icon: <CiCirclePlus />, name: "Add", size: 20 },
]

const IconList = () => {
  return (
    <Box display="flex" gap={2}>
      {iconList.map(({ id, icon, size }) => (
        <Icons key={id} size={size} color="#686D76">
          {icon}
        </Icons>
      ))}
    </Box>
  );
};

export default iconAppBar