import React, { useEffect, useState, useRef } from "react";
import AvatarList from "./AvatarList";
import QRCode from "./QRCode";
import CreateClass from "./CreateClass";
import StudentTable from "./StudentTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
 
const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const fileInputRef = useRef(null);
  const studentTableRef = useRef(null);
 
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
 
  if (!selectedCourse)
    return (
      <CreateClass
        courses={courses}
        onCourseCreated={fetchCourses}
        onSelectCourse={setSelectedCourse}
      />
    );
 
  return (
    <>
      <AvatarList />
      <Box className="main_cont">
        <Box className="list_cont">
          <Box className="list_header">
            <Typography variant="h5" className="class-name">
              {selectedCourse.courseDesc}
            </Typography>
 
            <Box display="flex" gap={1} alignItems="center">
              <Tooltip title="Add Student">
                <IconButton
                  onClick={() => setAddModalOpen(true)}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
 
              {!showActions ? (
                <Tooltip title="Show Actions">
                  <IconButton
                    onClick={() => setShowActions(true)}
                    sx={{
                      bgcolor: "secondary.main",
                      color: "white",
                      "&:hover": { bgcolor: "secondary.dark" },
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Cancel Actions">
                  <IconButton
                    onClick={() => setShowActions(false)}
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              )}
 
              <input
                type="file"
                accept=".csv,.xlsx"
                ref={fileInputRef}
                onChange={(e) => studentTableRef.current.handleImport(e)}
                style={{ display: "none" }}
              />
 
              <Tooltip title="Import">
                <IconButton
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    bgcolor: "success.main",
                    color: "white",
                    "&:hover": { bgcolor: "success.dark" },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
 
              <Tooltip title="Export">
                <IconButton
                  onClick={() => studentTableRef.current.handleExport()}
                  sx={{
                    bgcolor: "info.main",
                    color: "white",
                    "&:hover": { bgcolor: "info.dark" },
                  }}
                >
                  <UploadIcon />
                </IconButton>
              </Tooltip>
 
              <Tooltip title="Back to Create Class">
                <IconButton
                  onClick={() => setSelectedCourse(null)}
                  sx={{
                    bgcolor: "warning.main",
                    color: "white",
                    "&:hover": { bgcolor: "warning.dark" },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
 
          <StudentTable
            ref={studentTableRef}
            courseId={selectedCourse.courseId}
            openAddModal={addModalOpen}
            closeAddModal={() => setAddModalOpen(false)}
            showActions={showActions}
            setShowActions={setShowActions}
          />
        </Box>
      </Box>
    </>
  );
};
 
export default LandingPage;