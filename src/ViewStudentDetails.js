import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db, doc, getDocs } from './configuration';


function ViewStudentDetails() {
  const {studentid} = useParams()
  const [studentDetails, setStudentDetails] = useState({});
  
  const handleStudentDetail = async() => {
    const docRef = doc(db, studentid);
    const docSnap = await getDocs(docRef);
    console.log(docSnap, "mm")

    if (docRef.exist()) {
      console.log("DD", docSnap.data());
    } else{
      console.log("no such document!")
    }


  }
  
  useEffect(() =>{
        // fetch("http://localhost:8000/students/"+studentid)
    // .then((res)=>res.json())
    // .then((data)=>setStudentDetails(data))
    // .catch((err)=>console.log(err.message))
    handleStudentDetail()
  },[handleStudentDetail()])

  console.log(studentDetails, "studentDetails" )

  return (
    <div className='container'>
        <div className='h2'>
            Student Details
        </div>                      
                      {studentDetails &&
                      <div className='details'>
                        <div><strong>Student ID:</strong> <span>{studentDetails.id}</span></div>
                        <div><strong>Student Name:</strong> <span>{studentDetails.name}</span></div>
                        <div><strong>Place:</strong> <span>{studentDetails.place}</span></div>
                        <div><strong>Phone:</strong> <span>{studentDetails.phone}</span></div>
                      </div>
                      }
    </div>
  )
}

export default ViewStudentDetails