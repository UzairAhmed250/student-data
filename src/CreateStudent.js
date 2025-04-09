import React, { useEffect, useState } from 'react';
import "./App.css";
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import db from './configuration';
import { addDoc, collection } from 'firebase/firestore';


function CreateStudent() {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({
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

    const [userValue,setUserValue] = useState({
        id: "",
        name:"",
        phone:"",
        place:""
    })

    // if( userValue.id==""){
    //     const id = userValue.id;
    //     ++id;
    // }
    
    const handleFormChane = (e)=>{
        
        setUserValue({
            ...userValue,
            [e.target.name]:e.target.value
        })

    }
    console.log(userValue);

    const handleSubmit = async(e) => {
        e.preventDefault();
    console.log(userValue);

    // const  fire = async()=>{

    //     const docRef = await addDoc(collection(db, "students"), {
    //       id: 1,
    //       name: "Tokyo",
    //       email: "abdd@gmail.com",
    //       city: "Japan",
    
    //     });
    //     console.log("Document written with parent: ", docRef.id);
    //   }
    //   fire();

    try {
        await addDoc(collection(db, "students"), 
        userValue); 
        alert("Student Data Added Successfully to Firestore!");
        navigate('/');
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    }

    // async function getData(){
    //     const url = "http://localhost:8000/students";
        
    //     console.log(url, "url'");
    //     try {
    //         const response = await fetch(url,{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({username: "name"}),

    //         });
            
    //         if(!response.ok){
    //             throw new Error(`response status: ${response.status}`);
    //         }
    //         const json = await response.json();
    //         console.log(json);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }


    //  const response = fetch('http://localhost:8000/students', 
    //      {
    //     method: 'POST',
    //     body: JSON.stringify(userValue),
    //     headers: {
    //         "Content-Type" : "application/json"
    //     }
    // });
    // console.log(response, "response11");
  return (


    <div className='container'>
        <div className='h2'>
            Add New Student
        </div>
        <div className='form-container'>
            <form onSubmit={handleSubmit} className="form-fields" >
            <div className='form-group'>
                    <label htmlFor="id">Id: </label>
                    <input type="text" name="id" id="id" value={userValue.id} onChange={handleFormChane} className='form-control' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor="name">Student Name: </label>
                    <input type="text" name="name" id="name" value={userValue.name} onChange={(e) =>handleFormChane(e)}
                    onMouseDown={(e)=>validatoinErrorChange(e)}  className='form-control' required/>
                    {userValue.name.length === 0 && validationError.name && <span className='error'>* Name is required</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor="place">Place: </label>
                    <input type="text" name="place" id="place" value={userValue.place} onChange={(e) => handleFormChane(e)}  onMouseDown={(e)=>validatoinErrorChange(e)} className='form-control' required/>
                    {userValue.place.length === 0 && validationError.place && <span className='error'>* place is required</span>}

                </div>
                <div className='form-group'>
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" name="phone" id="phone" value={userValue.phone} onChange={(e) => handleFormChane(e)}  onMouseDown={(e)=>validatoinErrorChange(e)} className='form-control' required/>
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