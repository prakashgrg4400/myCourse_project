import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import { About, Home, Login, MyCourses, Signup } from "./pages/Index";
import { handelAction, loginLoader } from "./pages/Login";
import { myCoursesLoader } from "./pages/MyCourses";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/my-courses"
        element={<MyCourses />}
        loader={myCoursesLoader}
      />
      <Route
        path="/login"
        element={<Login />}
        action={handelAction}
        loader={loginLoader}
      />
      <Route
        path="/signup"
        element={<Signup />}
        // action={() => {
        //   console.log("inside sugnup");
        //   return null;
        // }}
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
