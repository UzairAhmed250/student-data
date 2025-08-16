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
import Button from "../components/customComponent/uiButtton/button";

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

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid);
  //     } else {
  //       console.log("user is logged out");
  //     }
  //   });
  // }, []);

  const router = useNavigate();

  const displayDetails = (rollNumber) => {
    router("/student/view/" + rollNumber);
  };

  const editStudentDetail = (rollNumber) => {
    router("/student/edit/" + rollNumber);
  };

  const deleteStudentDetail = async (uid) => {
    try {
      const studentDocRef = doc(db, "students", uid);
      await deleteDoc(studentDocRef);
      setStudents((prev) => prev.filter((student) => student.id !== uid));
      
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const addNewStudent = () => {
    router("/student/create")
  }

  return (
    <>
      <div className="container">
        <div className="h2">Student Records</div>
        <div className="table-container">
          <Button 
            onClick={addNewStudent}
            children={"Add New Student"}
          />
          <table className="tableData">
            <thead>
              <tr>
                <th>Student RollNumber</th>
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
                  <tr key={student.rollNumber}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.place}</td>
                    <td>{student.phone}</td>
                    <td className="actions">
                      <Button 
                        onClick={() => displayDetails(student.rollNumber)}
                        children={"View"}
                        style={{background: "blue",}}
                      />
                      <Button 
                        onClick={() => editStudentDetail(student.rollNumber)}
                        children={"Edit"}
                        style={{background: "green",}}

                      />
                      <Button 
                        onClick={() => editStudentDetail(student.rollNumber)}
                        children={"Delete"}
                        style={{background: "red",}}
                      />
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
