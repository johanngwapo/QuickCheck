// StudentLists.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import "./css/landingPage.css";

const StudentLists = ({ courseId }) => {
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

    const studentToCreate = {
      name: newStudent.name,
      email: newStudent.email,
      studentNo: newStudent.studentNo,
      course: {
        courseId: courseId, // ✅ passed from LandingPage → StudentLists
      },
    };

    console.log("Posting student data:", studentToCreate); // ✅ verify in console

    axios
      .post("http://localhost:8080/api/students", studentToCreate)
      .then(() => {
        fetchStudents();
        setNewStudent({ name: "", email: "", studentNo: "" });
      })
      .catch((err) => {
        console.error("Create error:", err.response?.data || err.message); // ✅ log full error
        alert("Failed to add student. See console for details.");
      });
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

  return (
    <>
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
                  <strong>{s.name}</strong> — {s.course.courseDesc}
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
    </>
  );
};

export default StudentLists;
