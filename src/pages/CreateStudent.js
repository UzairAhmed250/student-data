import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import  { addDoc, collection, db } from '../configuration';




function CreateStudent() {
    // const [docId, setDocId] = useState([]);
    const navigate = useNavigate();

    const [userValue,setUserValue] = useState({
        id:"",
        name:"",
        phone:"",
        place:""
    })
    const [validationError, setValidationError] = useState({
        id: false,
        name: false,
        place: false,
        phone: false
    });
    const validatoinErrorChange = (e) => {
        setValidationError({
            ...validationError,
            [e.target.name]: true
        })
    }

    
    const handleFormChange = (e)=>{
        setUserValue({
            ...userValue,
            [e.target.name]:e.target.value
        })
    }

        const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const addedstudent = await addDoc(collection(db, "students"), userValue);
            // setDocId(addedstudent.id)
            console.log(addedstudent)
            alert("Student Data Added Successfully to Firestore!");
            navigate('/studenttable');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

  return (


    <div className='container'>
        <div className='h2'>
            Add New Student
        </div>
        <div className='form-container'>
            <form onSubmit={handleSubmit} className="form-fields" >
            <div className='form-group'>
                    <label htmlFor="id">Id: </label>
                    <input type="text" name="id" id="id" value={userValue.id} onChange={(e) => handleFormChange(e)}  className='form-control' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Student Name: </label>
                    <input type="text" name="name" id="name" value={userValue.name} onChange={(e) => handleFormChange(e)}
                    onMouseDown={(e)=>validatoinErrorChange(e)}  className='form-control' required/>
                    {userValue.name.length === 0 && validationError.name && <span className='error'>* Name is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor="place">Place: </label>
                    <input type="text" name="place" id="place" value={userValue.place} onChange={(e) => handleFormChange(e)}  onMouseDown={(e)=>validatoinErrorChange(e)} className='form-control' required/>
                    {userValue.place.length === 0 && validationError.place && <span className='error'>* place is required</span>}

                </div>
                <div className='form-group'>
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" name="phone" id="phone" value={userValue.phone} onChange={(e) => handleFormChange(e)}  onMouseDown={(e)=>validatoinErrorChange(e)} className='form-control' required/>
                    {userValue.phone.length === 0 && validationError.phone && <span className='error'>* phone is required</span>}

                </div>
                <div className='form-group form-group-button'>
                    <button type="submit" className='btn btn-primary'>Add Student</button>
                    <Link to={"/"} className='btn btn-danger'>Back</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent