import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { BiBook } from 'react-icons/bi';
import { MdOutlineRemove } from "react-icons/md";

const CourseCard = ({ course, onSelect, onDelete }) => {
  const handleSelect = () => {
    if (onSelect) onSelect(course);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering course selection
    if (onDelete) onDelete(course.courseId);
  };

  // 🔵 New: Apply left border and icon color from course.color
  const cardStyle = {
    borderLeft: `10px solid ${course.color || "#1976d2"}`,
    backgroundColor: "#fafafa",
    cursor: "pointer",
  };

  return (
    <Card className="course-card" onClick={handleSelect} style={cardStyle}>
      <CardActions className="course-card-actions">
        <Button
          size="small"
          color="error"
          startIcon={<MdOutlineRemove />}
          onClick={handleDelete}
        />
      </CardActions>
      <CardContent>
        <Box className="course-card-header">
          <BiBook size={20} color={course.color || "#1976d2"} className="course-card-icon" />
          <Typography variant="h6" noWrap>
            {course.courseId}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {course.courseDesc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
