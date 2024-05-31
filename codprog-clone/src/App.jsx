import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import { About, Home, Login, Profile, MyCourses, Signup } from "./pages/Index";
import { handelAction, loginLoader } from "./pages/Login";
import { myCoursesLoader } from "./pages/MyCourses";
import { profileLoader } from "./pages/Profile";
import { signupAction, signupLoader } from "./pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} loader={profileLoader} />
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
        action={signupAction}
        loader={signupLoader}
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
