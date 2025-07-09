import { useState, useEffect } from "react";
import axios from "axios";
import "./css/Admin.css";

function Admin() {
  const [mode, setMode] = useState("A"); // A = Users, B = Students

  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);

  const [newEntry, setNewEntry] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showAddPanel, setShowAddPanel] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchStudents();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch users error:", err));
  };

  const fetchStudents = () => {
    axios
      .get("http://localhost:8080/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Fetch students error:", err));
  };

  const handleCreate = () => {
    const endpoint =
      mode === "A"
        ? "http://localhost:8080/api/users/register"
        : "http://localhost:8080/api/students";

    let payload = newEntry;

    // Fix payload shape for students
    if (mode === "B") {
      payload = {
        name: newEntry.name,
        email: newEntry.email,
        studentNo: newEntry.studentNo, // must match entity field name
        course: {
          courseId: newEntry.courseId, // nested object
        },
      };
    }

    axios
      .post(endpoint, payload)
      .then(() => {
        mode === "A" ? fetchUsers() : fetchStudents();
        setNewEntry({});
        setShowAddPanel(false);
      })
      .catch((err) => console.error("Create error:", err));
  };

  const handleDelete = (id) => {
    const endpoint =
      mode === "A"
        ? `http://localhost:8080/api/users/${id}`
        : `http://localhost:8080/api/students/${id}`;
    axios
      .delete(endpoint)
      .then(() => {
        mode === "A" ? fetchUsers() : fetchStudents();
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleUpdate = (id) => {
    const endpoint =
      mode === "A"
        ? `http://localhost:8080/api/users/${id}`
        : `http://localhost:8080/api/students/${id}`;

    let payload = editedData;

    if (mode === "B") {
      payload = {
        name: editedData.name,
        email: editedData.email,
        studentNo: editedData.studentNo,
        course: {
          courseId: editedData.courseId,
        },
      };
    }

    axios
      .put(endpoint, payload)
      .then(() => {
        mode === "A" ? fetchUsers() : fetchStudents();
        setEditingId(null);
      })
      .catch((err) => console.error("Update error:", err));
  };

  const currentList = mode === "A" ? users : students;

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="top-left-filters">
          {mode === "B" && (
            <>
              <select className="filter-select">
                <option>Course</option>
                <option>BSCS</option>
                <option>BSIT</option>
                <option>BSIS</option>
              </select>
              <select className="filter-select">
                <option>Year Level</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
              <select className="filter-select">
                <option>Section</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </>
          )}
          {mode === "A" && (
            <>
              <select className="filter-select">
                <option>Department</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Engineering</option>
              </select>
              <select className="filter-select">
                <option>Rank</option>
                <option>Professor</option>
                <option>Associate Prof</option>
                <option>Assistant Prof</option>
                <option>Lecturer</option>
              </select>
            </>
          )}
        </div>

        <div className="list-view">
          <ul>
            {currentList.length === 0 ? (
              <li>No entries yet.</li>
            ) : (
              currentList.map((item) => (
                <li key={item.id}>
                  {editingId === item.id ? (
                    <>
                      {mode === "A" ? (
                        <>
                          <input
                            className="edit-input"
                            value={editedData.full_name || ""}
                            placeholder="Full Name"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                full_name: e.target.value,
                              })
                            }
                          />
                          <input
                            className="edit-input"
                            value={editedData.email || ""}
                            placeholder="Email"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                email: e.target.value,
                              })
                            }
                          />
                        </>
                      ) : (
                        <>
                          <input
                            className="edit-input"
                            value={editedData.name || ""}
                            placeholder="Name"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                name: e.target.value,
                              })
                            }
                          />
                          <input
                            className="edit-input"
                            value={editedData.email || ""}
                            placeholder="Email"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                email: e.target.value,
                              })
                            }
                          />
                          <input
                            className="edit-input"
                            value={editedData.studentNo || ""}
                            placeholder="Student Number"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                studentNo: e.target.value,
                              })
                            }
                          />
                          <input
                            className="edit-input"
                            value={editedData.courseId || ""}
                            placeholder="Course ID"
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                courseId: e.target.value,
                              })
                            }
                          />
                        </>
                      )}
                      <div className="action-buttons">
                        <button onClick={() => handleUpdate(item.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="item-info">
                        {mode === "A"
                          ? `${item.full_name} (${item.email})`
                          : `${item.name} | ${item.email} | ${item.studentNo} | ${item.course?.courseId || ""}`}
                      </span>
                      <div className="action-buttons">
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            if (mode === "B") {
                              setEditedData({
                                id: item.id,
                                name: item.name,
                                email: item.email,
                                studentNo: item.studentNo,
                                courseId: item.course?.courseId || "",
                              });
                            } else {
                              setEditedData(item);
                            }
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div className="right-panel">
        <div className="right-content">
          <div className="top-buttons">
            <div className="top-button-group">
              <span>Users</span>
              <button
                className={`small-round-btn ${mode === "A" ? "active" : ""}`}
                onClick={() => setMode("A")}
              />
            </div>
            <div className="top-button-group">
              <span>Students</span>
              <button
                className={`small-round-btn ${mode === "B" ? "active" : ""}`}
                onClick={() => setMode("B")}
              />
            </div>
          </div>

          <div className="side-buttons">
            <button className="big-btn" onClick={() => setShowAddPanel(true)}>
              Add
            </button>
          </div>

          {showAddPanel && (
            <div className="add-panel">
              <h3>Add {mode === "A" ? "User" : "Student"}</h3>
              {mode === "A" ? (
                <>
                  <input
                    className="entry-input"
                    placeholder="Full Name"
                    value={newEntry.full_name || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, full_name: e.target.value })
                    }
                  />
                  <input
                    className="entry-input"
                    placeholder="Email"
                    value={newEntry.email || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, email: e.target.value })
                    }
                  />
                  <input
                    className="entry-input"
                    placeholder="Password"
                    type="password"
                    value={newEntry.password || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, password: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <input
                    className="entry-input"
                    placeholder="Name"
                    value={newEntry.name || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, name: e.target.value })
                    }
                  />
                  <input
                    className="entry-input"
                    placeholder="Email"
                    value={newEntry.email || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, email: e.target.value })
                    }
                  />
                  <input
                    className="entry-input"
                    placeholder="Student Number"
                    value={newEntry.studentNo || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, studentNo: e.target.value })
                    }
                  />
                  <input
                    className="entry-input"
                    placeholder="Course ID"
                    value={newEntry.courseId || ""}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, courseId: e.target.value })
                    }
                  />
                </>
              )}
              <button onClick={handleCreate}>Save</button>
              <button onClick={() => setShowAddPanel(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;