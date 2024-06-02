import { NavLink, Outlet, Form, useRouteLoaderData } from "react-router-dom";
import { getUsers } from "./utilis/getUser";

export function layoutLoader() {
    const user = getUsers();
   return user ;
}

function Layout() {
    const user = useRouteLoaderData("parentRouteLoader");
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
                    {user && (
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to="/my-courses">My courses</NavLink>
                        </li>
                    )}

                    {!user && (
                        <li>
                            <NavLink to="/signup">Signup</NavLink>
                        </li>
                    )}

                    {!user && (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            {user && (
                <Form method="POST" action="logout">
                    <button>Logout</button>
                </Form>
            )}
            <Outlet />
        </main>
    );
}

export default Layout;
