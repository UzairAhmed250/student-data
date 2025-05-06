import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentTable from './StudentTable';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import ViewStudentDetails from './ViewStudentDetails';
import Login from './(auth)/pages/login';
import Signup from './(auth)/pages/signup';
import ForgetPassword from "./components/auth/pages/forgetpassword"
// import ForgetPasswordComponent from './components/auth/pages/forgetpassword';


function App() {


  return (
    <>
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/studenttable" element={<StudentTable />} />
            <Route path="/forgetpassword " element={<ForgetPassword />} />
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
