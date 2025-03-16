import React, { useEffect, useState } from 'react';
import "./App.css";
import { Link } from 'react-router-dom';

function CreateStudent() {
    const [userValue,setUserValue] = useState({
        id:"",
        name:"",
        phone:"",
        place:""
    })
    
    const handleFormChane = (e)=>{
        
        setUserValue({
            ...userValue,
            [e.target.name]:e.target.value
        })

    }
    console.log(userValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(id, name, place, phone);
        console.log(userValue);
        
        // const id = e.target.id.value;
        // const name = e.target.name.value;
        // const place = e.target.place.value;
        // const phone = e.target.phone.value;
        // const student = { id, name, place, phone };
        // fetch('http://localhost:8000/students', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(student)
        // }).then(() => {
        //     console.log('new student added');
        // })
    }

     const response = fetch('http://localhost:8000/students', 
         {
        method: 'POST',
        body: JSON.stringify(userValue),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    console.log(response, "response11");
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
                    className='form-control' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor="place">Place: </label>
                    <input type="text" name="place" id="place" value={userValue.place} onChange={(e) => handleFormChane(e)} className='form-control' required/>
                </div>
                <div className='form-group'>
                    <label htmlFor="phone">Phone: </label>
                    <input type="text" name="phone" id="phone" value={userValue.phone} onChange={(e) => handleFormChane(e)} className='form-control' required/>
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