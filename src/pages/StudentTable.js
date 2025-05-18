import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import {
  db,
  collection,
  getDocs,
  auth,
  doc,
  deleteDoc,
} from "../configuration";
import { onAuthStateChanged } from "../configuration";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchStudents = async () => {
      setLoader(true);
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsList);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const router = useNavigate();

  const displayDetails = (id) => {
    router("/student/view/" + id);
  };

  const editStudentDetail = (id) => {
    router("/student/edit/" + id);
  };

  const deleteStudentDetail = async (id) => {
    try {
      const studentDocRef = doc(db, "students", id);
      await deleteDoc(studentDocRef);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="h2">Student Records</div>
        <div className="table-container">
          <Link to="/student/create" className="btn btn-add">
            Add New Student
          </Link>
          <table className="tableData">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Place</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <tr>
                  <td colSpan={5}
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    loading...
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.place}</td>
                    <td>{student.phone}</td>
                    <td className="actions">
                      <button
                        onClick={() => displayDetails(student.id)}
                        className="btn btn-info"
                      >
                        {" "}
                        View{" "}
                      </button>
                      <button
                        onClick={() => editStudentDetail(student.id)}
                        className="btn btn-primary"
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudentDetail(student.id)}
                        className="btn btn-danger"
                      >
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentTable;
