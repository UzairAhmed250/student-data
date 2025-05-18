import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { collection, db,   getDocs } from '../configuration';


function ViewStudentDetails() {
  const {studentid} = useParams()
  const [studentDetails, setStudentDetails] = useState({});
  const [loader, setLoader] = useState(false)
  
  const handleStudentDetail = async() => {
      try {
        setLoader(true)
          const querySnapshot = await getDocs(collection(db, "students",));
          const studentsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const matchedStudent = studentsList.find(student => student.id === studentid);
            setStudentDetails(matchedStudent);
      } catch (err) {
        } finally{
          setLoader(false)
        }
            
      }
          
  useEffect(() =>{
    handleStudentDetail()
  },[])

  return (
    <div className='container'> 
        <div className='h2'>
            Student Details
        </div>                      
      {studentDetails && loader ? (
        <div className='details'>
          <div className="spinner-border" role="status">
            <span className="ssr-only">loading... </span>
          </div>
        </div>
      ) 
      : 
      ( 
        <div className='details'>
          <div><strong>Student ID:</strong> <span>{studentDetails.id}</span></div>
          <div><strong>Student Name:</strong> <span>{studentDetails.name}</span></div>
          <div><strong>Place:</strong> <span>{studentDetails.place}</span></div>
          <div><strong>Phone:</strong> <span>{studentDetails.phone}</span></div>
        </div>
      )
      }      
    </div>
  )
}

export default ViewStudentDetails