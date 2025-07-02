// IconList.jsx
import React from "react";
import Icons from "./Icons";
import Box from "@mui/material/Box";
import { CiImport, CiExport, CiCirclePlus, CiEdit } from "react-icons/ci";

const iconList = [
  { id: 1, icon: <CiCirclePlus />, name: "Add", size: 20 },
  { id: 2, icon: <CiEdit />, name: "Edit", size: 20 },
  { id: 3, icon: <CiImport />, name: "Import", size: 20 },
  { id: 4, icon: <CiExport />, name: "Export", size: 20 },
];

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

export default IconList;
