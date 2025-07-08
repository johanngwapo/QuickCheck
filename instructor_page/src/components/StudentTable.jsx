import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./css/landingPage.css";
import * as XLSX from "xlsx";

const StudentTable = forwardRef(
  (
    {
      courseId,
      openAddModal,
      closeAddModal,
      showActions,
      setShowActions,
      activeSession,
    },
    ref
  ) => {
    //for adding students
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
      name: "",
      email: "",
      studentNo: "",
    });

    //for editin students
    const [editingStudent, setEditingStudent] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const today = new Date().toISOString().split("T")[0]; // e.g., "2025-07-08"
    const courseName =
      students[0]?.course?.courseDesc?.replace(/[^a-z0-9]/gi, "_") || "Course";

    //exporting handles to landingpage.jsx
    useImperativeHandle(ref, () => ({
      handleImport,
      handleExport,
    }));

    useEffect(() => {
      fetchStudents();
    }, [courseId]);

    const fetchStudents = () => {
      axios
        .get(`http://localhost:8080/api/students?courseId=${courseId}`)
        .then((res) => setStudents(res.data))
        .catch((err) => console.error("Error fetching students:", err));
    };

    const handleCreate = () => {
      if (!newStudent.name || !newStudent.email || !newStudent.studentNo) {
        alert("All fields are required.");
        return;
      }

      axios
        .post("http://localhost:8080/api/students", {
          ...newStudent,
          course: { courseId },
        })
        .then(() => {
          fetchStudents();
          setNewStudent({ name: "", email: "", studentNo: "" });
          closeAddModal(); // Close modal on success
        })
        .catch((err) => {
          console.error("Create error:", err.response?.data || err.message);
          alert("Failed to add student. See console for details.");
        });
    };

    const handleUpdate = (id) =>
      axios
        .put(`http://localhost:8080/api/students/${id}`, editedData)
        .then(() => {
          fetchStudents();
          setEditingStudent(null);
          setShowActions(false);
        })
        .catch((err) => console.error("Update error:", err));

    const handleDelete = (id) =>
      axios
        .delete(`http://localhost:8080/api/students/${id}`)
        .then(() => {
          fetchStudents();
          setShowActions(false);
        })
        .catch((err) => console.error("Delete error:", err));

    const handleClose = () => {
      setNewStudent({ name: "", email: "", studentNo: "" });
      closeAddModal();
    };

    //handles import function
    const handleImport = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (!rows || rows.length === 0) {
        alert("No data found in file.");
        return;
      }

      let duplicates = [];
      let importedCount = 0;

      for (const row of rows) {
        const newStudentNo = row["Student No"];

        // Check for duplicate by student number
        const isDuplicate = students.some(
          (s) => s.studentNo.toString() === newStudentNo.toString()
        );

        if (isDuplicate) {
          duplicates.push(newStudentNo);
          continue;
        }

        const formatted = {
          name: row["Name"],
          email: row["Email"],
          studentNo: newStudentNo,
          course: { courseId },
        };

        try {
          await axios.post("http://localhost:8080/api/students", formatted);
          importedCount++;
        } catch (err) {
          console.error("Import error:", formatted, err);
        }
      }

      alert(
        `Import complete!\nImported: ${importedCount}\nSkipped duplicates: ${duplicates.length}`
      );

      fetchStudents(); // 🔁 Refresh table
    };

    //handles export function
    const handleExport = () => {
      if (!students.length) {
        alert("No students to export.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const courseName =
        students[0]?.course?.courseDesc?.replace(/[^a-z0-9]/gi, "_") ||
        "Course";

      const exportData = students.map((s) => ({
        Name: s.name,
        Email: s.email,
        "Student No": s.studentNo,
        Course: s.course.courseDesc,
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      XLSX.writeFile(workbook, `${courseName}_students_${today}.xlsx`);
    };

    return (
      <>
        {/* MUI Table */}
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="student table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  {activeSession ? (
                    <>
                      <TableCell>Status</TableCell>
                      <TableCell>Session Date</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>Email</TableCell>
                      <TableCell>Student No</TableCell>
                      <TableCell>Course</TableCell>
                    </>
                  )}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.name}</TableCell>
                      {activeSession ? (
                        <>
                          <TableCell>{s.attendance?.status || "N/A"}</TableCell>
                          <TableCell>{activeSession.sessionDate}</TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{s.email}</TableCell>
                          <TableCell>{s.studentNo}</TableCell>
                          <TableCell>{s.course.courseDesc}</TableCell>
                        </>
                      )}
                      <TableCell align="right">
                        {showActions && (
                          <>
                            <Button onClick={() => handleEdit(s)}>Edit</Button>
                            <Button onClick={() => handleDelete(s.id)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/*<TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, nv) => setPage(nv)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
        />*/}
        </Paper>

        {/* Modal for adding student */}
        <Dialog open={openAddModal} onClose={handleClose}>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogContent dividers>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              margin="dense"
              label="Student No"
              fullWidth
              value={newStudent.studentNo}
              onChange={(e) =>
                setNewStudent((prev) => ({
                  ...prev,
                  studentNo: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderRadius: 2, px: 1, py: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                backgroundColor: "#5A827E",
                borderRadius: 2,
                px: 1,
                py: 1,
                color: "white",
                "&:hover": {
                  backgroundColor: "#2F5249",
                },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default StudentTable;
