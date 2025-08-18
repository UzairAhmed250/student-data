import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  db,
  query,
  where,
  getDocs,
} from "../configuration";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/customComponent/uiButtton/button";
import { LoadingOutlined } from "@ant-design/icons";

function CreateStudent() {
  const [docId, setDocId] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [userValue, setUserValue] = useState({
    rollNumber: "",
    name: "",
    phone: "",
    place: "",
  });

  const [validationError, setValidationError] = useState({
    rollNumber: false,
    name: false,
    place: false,
    phone: false,
  });

  const [rollNumberExists, setRollNumberExists] = useState(false);

  const validatoinErrorChange = (e) => {
    setValidationError({
      ...validationError,
      [e.target.name]: true,
    });
  };

  const handleFormChange = (e) => {
    setUserValue({
      ...userValue,
      [e.target.name]: e.target.value,
    });

    // Clear roll number error when user starts typing
    if (e.target.name === "rollNumber") {
      setRollNumberExists(false);
    }
  };

  const checkRollNumberExists = async (rollNumber) => {
    try {
      const q = query(
        collection(db, "students"),
        where("rollNumber", "==", rollNumber)
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking roll number:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const rollExists = await checkRollNumberExists(userValue.rollNumber);

      if (rollExists) {
        setRollNumberExists(true);
        toast.error(
          "Roll number already exists! Please use a different roll number."
        );
        setLoader(false);
        return;
      }

      const addedstudent = await addDoc(collection(db, "students"), userValue);
      setDocId(addedstudent.id);
      toast.success("Student Data Added Successfully to Firestore!", {
        onClose: () => navigate("/studenttable"),
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add student. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const backButton = () => {
    navigate("/studenttable");
  };

  return (
    <div className="container">
      <div className="h2">Add New Student</div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number: </label>
            <input
              type="text"
              name="rollNumber"
              id="rollNumber"
              value={userValue.rollNumber}
              onChange={(e) => handleFormChange(e)}
              className="form-control"
              required
            />
            {rollNumberExists && (
              <span className="error">* Roll number already exists</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Student Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userValue.name}
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
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
              onChange={(e) => handleFormChange(e)}
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
              className="btn btn-primary "
              type="submit"
              style={{ background: "light-green" }}
              children={
                <>
                  {loader && <LoadingOutlined style={{ marginRight: 8 }} />} Add
                  Student
                </>
              }
            />
            <Button
              onClick={backButton}
              children={"Back"}
              style={{ background: "red" }}
            />
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
