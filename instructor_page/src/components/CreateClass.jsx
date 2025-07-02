import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateClass = ({ courses, onCourseCreated, onSelectCourse }) => {
  const [newCourse, setNewCourse] = useState({ courseId: '', courseDesc: '' });

  const handleCreateCourse = () => {
    if (!newCourse.courseId || !newCourse.courseDesc) return;

    fetch("http://localhost:8080/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    })
      .then((res) => res.json())
      .then(() => {
        onCourseCreated(); // refresh course list
        setNewCourse({ courseId: '', courseDesc: '' }); // reset form
      })
      .catch((err) => console.error("Error creating course:", err));
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} p={2}>
      
      {/* Existing Course Cards */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {courses.map((course) => (
          <Box
            key={course.courseId}
            onClick={() => onSelectCourse(course)}
            sx={{
              width: 240,
              height: 130,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: '#e3f2fd',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#bbdefb' },
            }}
          >
            <Typography variant="h6">{course.courseId}</Typography>
            <Typography variant="body2">{course.courseDesc}</Typography>
          </Box>
        ))}
      </Box>

      {/* Create New Course Form */}
      <Box
        sx={{
          width: 260,
          p: 2,
          border: '2px dashed #ccc',
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" mb={1}>Create a New Course</Typography>
        <TextField
          fullWidth
          label="Course ID"
          value={newCourse.courseId}
          onChange={(e) => setNewCourse({ ...newCourse, courseId: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Course Description"
          value={newCourse.courseDesc}
          onChange={(e) => setNewCourse({ ...newCourse, courseDesc: e.target.value })}
          margin="dense"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleCreateCourse}
          sx={{ mt: 1 }}
        >
          Create Course
        </Button>
      </Box>
    </Box>
  );
};

export default CreateClass;
