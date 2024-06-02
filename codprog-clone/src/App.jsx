import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout, { layoutLoader } from "./Layout";
import { About, Home, Login, Profile, MyCourses, Signup } from "./pages/Index";
import { handelAction, loginLoader } from "./pages/Login";
import { myCoursesLoader } from "./pages/MyCourses";
import { profileLoader } from "./pages/Profile";
import { signupAction, signupLoader } from "./pages/Signup";
import { loguoutAction } from "./pages/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={layoutLoader} id="parentRouteLoader"> 
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
      <Route path="/logout" action={loguoutAction} />
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
