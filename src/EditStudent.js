import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditStudent() {
  const navigate = useNavigate();
  const {studentid} = useParams()
  const [validationError, setValidationError] = useState({
          name: false,
          place: false,
          phone: false
      });

   const [userValue,setUserValue] = useState({
          id: "",
          name:"",
          phone:"",
          place:""
      })
      const validatoinErrorChange = (e) => {
        setValidationError({
            ...validationError,
            [e.target.name]: true
        })
    }

    const handleFormChane = (e)=>{
      setUserValue({
          ...userValue,
          [e.target.name]:e.target.value
      })

  }

  useEffect(() =>{
    fetch("http://localhost:8000/students/"+studentid)
    .then((res)=>res.json())
    .then((data)=>{
      setUserValue({
        id: data.id,
        name: data.name,
        place: data.place,
        phone: data.phone
      })
      // console.log(data.id);
      
    })
    .catch((err)=>console.log(err.message))
  },[studentid])

const handleSubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:8000/students/"+studentid,{
      method: 'PUT',
      headers: 
      { 
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userValue)
  })
  .then((res) => {
      if (!res.ok) {
          throw new Error("Failed to update data");
      }
          return res.json();
    })
  .then(() => {
          alert("Student Data Edited Successfully!");
          navigate('/');
          })
  .catch((err)=>console.log(err))
}



  return (
    <div className='container'>
        <div className='h2'>
            Edit Student
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
                    <button type="submit" className='btn btn-primary'>Save</button>
                    <Link to={"/"} className='btn btn-danger'>Back</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditStudent