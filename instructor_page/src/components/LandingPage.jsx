// LandingPage.jsx
import React, { useEffect, useState } from "react";
import AvatarList from "./AvatarList";
import QRCode from "./QRCode";
import IconList from "./IconList";
import CreateClass from "./CreateClass";
import StudentLists from "./StudentLists";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    fetch("http://localhost:8080/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoadingCourses(false);
      })
      .catch((err) => console.error("Error fetching courses:", err));
  };

  if (loadingCourses) return <p>Loading...</p>;

  if (!selectedCourse) {
    return <CreateClass courses={courses} onCourseCreated={fetchCourses} onSelectCourse={setSelectedCourse} />;
  }

  return (
    <>
      <AvatarList />
      <Box className="main_cont">
        <Box className="list_cont">
          <Box className="list_header">
            <Typography variant="h5" className="class-name">
              {selectedCourse.courseDesc}
            </Typography>
            <IconList />
          </Box>
          <StudentLists courseId={selectedCourse.courseId} />
        </Box>
        <Box className="qr_cont">
          <QRCode />
          <h2 className="qr_name">Class QR Code</h2>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
