import './App.css'
import {Route , createBrowserRouter , createRoutesFromElements , RouterProvider} from "react-router-dom";
import Layout from './Layout';
import {About , Home, Login , MyCourses , Signup} from './pages/Index';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/my-courses' element={<MyCourses/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
  </Route>
))

function App() {

  return (
  <>
    <RouterProvider router={router} />
  </>
  )
}

export default App
