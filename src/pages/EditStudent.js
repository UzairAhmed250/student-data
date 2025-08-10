import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { collection, db, doc, getDocs, updateDoc } from "../configuration";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/customComponent/uiButtton/button";
import { LoadingOutlined } from "@ant-design/icons";

function EditStudent() {
  const { studentid } = useParams();

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [validationError, setValidationError] = useState({
    name: false,
    place: false,
    phone: false,
  });

  const [userValue, setUserValue] = useState({
    rollNumber: "",
    name: "",
    phone: "",
    place: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoader(true);
        const querySnapShot = await getDocs(collection(db, "students"));
        const studentList = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const matchStudent = studentList.find(
          (student) => student.rollNumber === studentid
        );
        if (matchStudent) {
          setUserValue({
            rollNumber: matchStudent?.rollNumber,
            name: matchStudent?.name,
            phone: matchStudent?.phone,
            place: matchStudent?.place,
          });
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoader(false);
      }
    };

    if (studentid) {
      fetchStudent();
    }
  }, [studentid]);

  const validatoinErrorChange = (e) => {
    setValidationError({
      ...validationError,
      [e.target.name]: true,
    });
  };

  const handleFormChane = (e) => {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const querySnapShot = await getDocs(collection(db, "students"));
      const studentList = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const matchedStudent = studentList.find(
        (student) => student.rollNumber === studentid
      );
      if (matchedStudent) {
        const studentDocRef = doc(db, "students", matchedStudent.id);
        await updateDoc(studentDocRef, {
          name: userValue.name,
          phone: userValue.phone,
          place: userValue.place,
        });
        toast.success("Student Update Successfully");
        navigate("/studentTable");
      } else {
        toast.error("Student Not Found");
      }
    } catch (error) {
      console.error("Error while updating", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container">
      <div className="h2">Edit Student</div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-group">
            <label htmlFor="id">Roll Number: </label>
            <input
              type="text"
              name="rollNumber"
              id="rollNumber"
              value={userValue.rollNumber}
              onChange={handleFormChane}
              className="form-control"
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Student Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userValue.name}
              onChange={(e) => handleFormChane(e)}
              onMouseDown={(e) => validatoinErrorChange(e)}
              className="form-control"
              required
            />
            {userValue.name.length === 0 && validationError.name && (
              <span className="error">* Name is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="place">Place: </label>
            <input
              type="text"
              name="place"
              id="place"
              value={userValue.place}
              onChange={(e) => handleFormChane(e)}
              onMouseDown={(e) => validatoinErrorChange(e)}
              className="form-control"
              required
            />
            {userValue.place.length === 0 && validationError.place && (
              <span className="error">* place is required</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={userValue.phone}
              onChange={(e) => handleFormChane(e)}
              onMouseDown={(e) => validatoinErrorChange(e)}
              className="form-control"
              required
            />
            {userValue.phone.length === 0 && validationError.phone && (
              <span className="error">* phone is required</span>
            )}
          </div>
          <div className="form-group form-group-button">
            <Button
              children={
                <>
                  {loader && <LoadingOutlined style={{ marginRight: 8 }} />}{" "}
                  Save
                </>
              }
              type="submit"
            />

            <Link to={"/studentTable"}>
              <Button children="Back" type="submit" />
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default EditStudent;
