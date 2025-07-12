import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, db } from "../configuration";

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
  };
//   let num;

//   console.log(num)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const addedstudent = await addDoc(collection(db, "students"), userValue);
      setDocId(addedstudent.id);
      console.log(addedstudent.id);
      alert("Student Data Added Successfully to Firestore!");
    const num1 = {...userValue, rollNumber: userValue.rollNumber +1}
        // let num = num1
      navigate("/studenttable");
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoader(false);
    }
  };
//   userValue.map((user) => {
//     user.rollNumber
//   })
//    console.log(num) 



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
            <button type="submit" className="btn btn-primary">
              {loader ? "adding..." : "Add Student"}
            </button>
            <Link to={"/"} className="btn btn-danger">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
