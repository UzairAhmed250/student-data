import React, { useEffect, useState } from 'react'
import "./App.css"
import { Link, useNavigate } from 'react-router-dom'

function StudentTable() {
    const [students, setStudents] = useState("")
    useEffect(() => {
        fetch("http://localhost:8000/students")
        .then((res)=>res.json())
        .then((data)=>
            setStudents(data)).catch((err)=>
            console.log(err))
    }, [])
    const router = useNavigate()

    const displayDetails = (id) => {
        router("/student/view/"+id)
        // console.log("/student/view/"+id)
    } 

    const editStudentDetail = (id) => {
        router("/student/edit/"+id)
        // console.log("/student/view/"+id)
    }

  return (
    <>
    <div className='container'>
        <div className='h2'>
            Student Records
        </div>
        <div className='table-container'>
            <Link to="/student/create" className='btn btn-add'>Add New Student</Link>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Place</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            students && students.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.place}</td>
                                <td>{item.phone}</td>
                                <td className='actions'>
                                    <button onClick={() => displayDetails(item.id)} className='btn btn-info'> View </button>
                                    <button onClick={() => editStudentDetail(item.id)} className='btn btn-primary'> Edit</button>
                                    <a href="" className='btn btn-danger'> Delete</a>
                                </td>
                        </tr>
                            ))
                        }
                    </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default StudentTable