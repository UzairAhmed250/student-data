import React, { useEffect, useState } from 'react'
import "./App.css"
import { Link, useNavigate } from 'react-router-dom'
import { db, collection, getDocs, auth } from './configuration';
import { onAuthStateChanged } from 'firebase/auth';

// type Student = {
//     id: Number;
//     name: String;
//     place: String;
//     email: String;
// };  

function StudentTable() {
    // const [student, setStudent] = useState<Student>({
    //     id: "",
    //     name: "",
    //     place: "",
    //     email: "",
    // })


    const [students, setStudents] = useState([])
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const studentsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    // console:(studentsList, "querySnapshot")
                }));
                setStudents(studentsList);
                console.log("doc id: ",studentsList)
                console.log("doc snapshot: ",querySnapshot)
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid;
                console.log(uid)
            } else {
                console.log("user is logged out")
            }
        })  
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
            <table 
                className='tableData'
            >
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Place</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {students.map((student) => (
                <tbody 
                    key={student.id}
                >
                    <tr>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.place}</td>
                    <td>{student.phone}</td>
                    <td className='actions'>
                        <button onClick={() => displayDetails(student.id)} className='btn btn-info'> View </button>
                        <button onClick={() => editStudentDetail(student.id)} className='btn btn-primary'> Edit</button>
                        <a href="" className='btn btn-danger'> Delete</a>
                                </td>
                    </tr>
                    {/* Add other student fields here */}
                </tbody>
            ))}
            </table>
        </div>
    </div>
    </>
  )
}

export default StudentTable