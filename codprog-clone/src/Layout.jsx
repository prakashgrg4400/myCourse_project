import { NavLink , Outlet } from "react-router-dom"
function Layout() {
  return (
    <main>
        <nav>
            <h1>
                <NavLink>CodProg</NavLink>
            </h1>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/profile" >Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/my-courses" >My courses</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Signup</NavLink>
                </li>
                <li>
                    <NavLink to="/login" >Login</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </main>
  )
}

export default Layout