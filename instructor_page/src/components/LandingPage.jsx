import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "./QRCode";
import AvatarList from "./AvatarList";
import Box from "@mui/material/Box";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileImport, FaFileExport } from "react-icons/fa";

import "./css/landingPage.css"; 

const LandingPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    studentNo: "",
  });

  const [editingStudent, setEditingStudent] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    course: "",
    studentNo: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:8080/api/students", newStudent)
      .then(() => {
        fetchStudents();
        setNewStudent({ name: "", email: "", course: "", studentNo: "" });
      })
      .catch((err) => console.error("Create error:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/students/${id}`)
      .then(fetchStudents)
      .catch((err) => console.error("Delete error:", err));
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:8080/api/students/${id}`, editedData)
      .then(() => {
        fetchStudents();
        setEditingStudent(null);
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleExportExcel = () => {
  const worksheetData = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Course: student.course,
    "Student No": student.studentNo,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(fileData, "students.xlsx");
};

const handleImport = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const newStudents = jsonData.map((row) => ({
      name: row["Name"] || "",
      email: row["Email"] || "",
      course: row["Course"] || "",
      studentNo: row["Student No"] || "",
    }));

    newStudents.forEach((student) => {
      axios
        .post("http://localhost:8080/api/students", student)
        .then(fetchStudents)
        .catch((err) => console.error("Import error:", err));
    });
  };

  reader.readAsArrayBuffer(file);
};
  return (
    <>
      <AvatarList />
      <Box className="main_cont">
        <Box className="list_cont">
          <Box className="class-header">
  <h2 className="class-name">Class List</h2>
  <div className="import-export-buttons">
    <label className="icon-button" title="Import Excel">
      <FaFileImport size={24} style={{ cursor: "pointer" }} />
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImport}
        style={{ display: "none" }}
      />
    </label>

    <FaFileExport
      size={24}
      title="Export to Excel"
      onClick={handleExportExcel}
      style={{ cursor: "pointer" }}
    />
  </div>
</Box>
          <Box className="icon_cont">
            {students.length === 0 ? (
              <p className="no_students">No students yet.</p>
            ) : (
              students.map((s) => (
                <div key={s.id} className="student-item">
                  {editingStudent === s.id ? (
                    <div className="edit_form">
                      <input
                        className="student-input"
                        value={editedData.name}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                        placeholder="Name"
                      />
                      <input
                        className="student-input"
                        value={editedData.email}
                        onChange={(e) =>
                          setEditedData({ ...editedData, email: e.target.value })
                        }
                        placeholder="Email"
                      />
                      <input
                        className="student-input"
                        value={editedData.course}
                        onChange={(e) =>
                          setEditedData({ ...editedData, course: e.target.value })
                        }
                        placeholder="Course"
                      />
                      <input
                        className="student-input"
                        value={editedData.studentNo}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            studentNo: e.target.value,
                          })
                        }
                        placeholder="Student No"
                      />
                      <button
                        className="student-button"
                        onClick={() => handleUpdate(s.id)}
                      >
                        Save
                      </button>
                      <button
                        className="student-button"
                        onClick={() => setEditingStudent(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="student-info">
                      <strong>{s.name}</strong> — {s.course}
                      <button
                        className="student-button"
                        onClick={() => {
                          setEditingStudent(s.id);
                          setEditedData(s);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="student-button"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </Box>

          <Box className="new_student-form">
            <h3>Add New Student</h3>
            <input
              className="student-input"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />
            <input
              className="student-input"
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({ ...newStudent, email: e.target.value })
              }
            />
            <input
              className="student-input"
              placeholder="Course"
              value={newStudent.course}
              onChange={(e) =>
                setNewStudent({ ...newStudent, course: e.target.value })
              }
            />
            <input
              className="student-input"
              placeholder="Student No"
              value={newStudent.studentNo}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentNo: e.target.value })
              }
            />
            <button className="student-button" onClick={handleCreate}>
              Add Student
            </button>
          </Box>
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
