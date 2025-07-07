// src/CreateClass.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";

import BaseLayout from "./BaseLayout";
import CourseCard from "./CourseCard";
import { API_BASE_URL } from "./config";

const CreateClass = ({ courses, onCourseCreated, onSelectCourse }) => {
  const [newCourse, setNewCourse] = useState({ courseId: "", courseDesc: "", color: "#1976d2" }); // 🟢 Add color
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isCourseValid = (course) =>
    course.courseId.trim() !== "" && course.courseDesc.trim() !== "";

  const handleChange = (field) => (e) =>
    setNewCourse((prev) => ({ ...prev, [field]: e.target.value }));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCourse({ courseId: "", courseDesc: "", color: "#1976d2" }); // 🟢 Reset color too
  };

  const handleCreateCourse = async () => {
    if (!isCourseValid(newCourse)) {
      setFeedback({
        open: true,
        message: "Both fields are required.",
        severity: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error(await response.text());

      await response.json();
      onCourseCreated();
      setFeedback({
        open: true,
        message: "Course created successfully!",
        severity: "success",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error creating course:", error);
      setFeedback({
        open: true,
        message: error.message || "Error creating course.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(await response.text());

      onCourseCreated(); // Refresh course list
      setFeedback({
        open: true,
        message: "Course deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      setFeedback({
        open: true,
        message: error.message || "Error deleting course.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) window.scrollTo(0, 0);
  }, [isModalOpen]);

  return (
    <BaseLayout>
      <Container maxWidth="lg" className="create-class-container">
        <Box className="create-class-box">
          <Box className="create-class-layout">
            <Box className="course-card-container">
              {courses.map((course) => (
                <CourseCard
                  key={course.courseId}
                  course={course}
                  onSelect={onSelectCourse}
                  onDelete={handleDeleteCourse}
                />
              ))}
              <Box onClick={handleOpenModal} className="create-course-box">
                <Typography color="primary">+ Create Course</Typography>
              </Box>
            </Box>

            <Dialog
              open={isModalOpen}
              onClose={handleCloseModal}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>Create a New Course</DialogTitle>
              <DialogContent>
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateCourse();
                  }}
                >
                  <TextField
                    autoFocus
                    fullWidth
                    label="Course ID"
                    value={newCourse.courseId}
                    onChange={handleChange("courseId")}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Course Description"
                    value={newCourse.courseDesc}
                    onChange={handleChange("courseDesc")}
                    margin="dense"
                  />

                  {/* 🔵 Color Picker Field */}
                  <Box mt={2} mb={1}>
                    <label style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                      Choose Card Color:
                    </label>
                    <input
                      type="color"
                      value={newCourse.color}
                      onChange={handleChange("color")}
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal} disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCourse}
                  disabled={isLoading}
                  variant="contained"
                >
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
              open={feedback.open}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                severity={feedback.severity}
                onClose={handleCloseSnackbar}
                className="snackbar-alert"
              >
                {feedback.message}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </BaseLayout>
  );
};

export default CreateClass;
