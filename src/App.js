import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import ViewStudentDetails from './ViewStudentDetails';
import { collection, addDoc } from "firebase/firestore"; 
import db from "./configuration"


function App() {


  return (
    <>
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<StudentTable />} />
            <Route path="/student/create" element={<CreateStudent />} />
            <Route path="/student/edit/:studentid" element={<EditStudent />} />
            <Route path="/student/view/:studentid" element={<ViewStudentDetails />} />


          </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
