import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "./QRCode";
import AvatarList from "./AvatarList";
import Box from "@mui/material/Box";

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
    axios.get("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  const handleCreate = () => {
    axios.post("http://localhost:8080/api/students", newStudent)
      .then(() => {
        fetchStudents(); // refresh list
        setNewStudent({ name: "", email: "", course: "", studentNo: "" }); // clear form
      })
      .catch((err) => console.error("Create error:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/students/${id}`)
      .then(fetchStudents)
      .catch((err) => console.error("Delete error:", err));
  };

  const handleUpdate = (id) => {
  axios.put(`http://localhost:8080/api/students/${id}`, editedData)
    .then(() => {
      fetchStudents(); // refresh the list
      setEditingStudent(null); // close edit form
    })
    .catch((err) => console.error("Update error:", err));
};

  return (
    <>
      <AvatarList />
      <Box className="main_cont">
        <Box className="list_cont">
          <h2 className="class_name">Class List</h2>
          <Box className="icon_cont">
            {students.length === 0 ? (
              <p>No students yet.</p>
            ) : (
              students.map((s) => (
  <div key={s.id}>
    {editingStudent === s.id ? (
      <>
        <input
          value={editedData.name}
          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={editedData.email}
          onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
          placeholder="Email"
        />
        <input
          value={editedData.course}
          onChange={(e) => setEditedData({ ...editedData, course: e.target.value })}
          placeholder="Course"
        />
        <input
          value={editedData.studentNo}
          onChange={(e) => setEditedData({ ...editedData, studentNo: e.target.value })}
          placeholder="Student No"
        />
        <button onClick={() => handleUpdate(s.id)}>Save</button>
        <button onClick={() => setEditingStudent(null)}>Cancel</button>
      </>
    ) : (
      <>
        <strong>{s.name}</strong> — {s.course}
        <button onClick={() => {
          setEditingStudent(s.id);
          setEditedData(s); // preload current data
        }}>Edit</button>
        <button onClick={() => handleDelete(s.id)}>Delete</button>
      </>
    )}
  </div>
))

            )}
          </Box>

          {/* New Student Form */}
          <Box>
            <input
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              placeholder="Email"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <input
              placeholder="Course"
              value={newStudent.course}
              onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
            />
            <input
              placeholder="Student No"
              value={newStudent.studentNo}
              onChange={(e) => setNewStudent({ ...newStudent, studentNo: e.target.value })}
            />
            <button onClick={handleCreate}>Add Student</button>
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
