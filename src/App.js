import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import StudentTable from "./pages/StudentTable";
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import ViewStudentDetails from "./pages/ViewStudentDetails";
import Login from "./(auth)/pages/login";
import Signup from "./(auth)/pages/signup";
import ForgetPassword from "./components/auth/pages/forgetpassword";
import AuthLayout from "./components/layout/AuthLayout";
// import ForgetPasswordComponent from './components/auth/pages/forgetpassword';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },

        {
          path: "/signup",
          element: <Signup />,
        },

        {
          path: "/studenttable",
          element: <StudentTable />,
        },

        {
          path: "/forgetPassword",
          element: <ForgetPassword />,
        },

        {
          path: "/student/create",
          element: <CreateStudent />,
        },

        {
          path: "/student/edit/:studentid",
          element: <EditStudent />,
        },

        {
          path: "/student/view/:studentid",
          element: <ViewStudentDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
