import { NavLink, Outlet, Form, useRouteLoaderData } from "react-router-dom";
import { getUsers } from "./utilis/getUser";
import styles from "./RootLayout.module.css";
import logoutSvg from "./assets/logout.svg";

export function layoutLoader() {
    const user = getUsers();
    return user;
}

function Layout() {
    const user = useRouteLoaderData("parentRouteLoader");
    return (
        <>
            <header>
                <nav className={`${styles.nav} container`}>
                    <h1 className={styles.logo}>
                        <NavLink to="/">
                            <span className={styles.cod}>Cod</span>
                            <span className={styles.prog}>Prog</span>{" "}
                        </NavLink>
                    </h1>
                    <ul className={styles.navItems}>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {/* {user && (
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                        )} */}
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
                {user && (
                    <Form method="POST" action="logout">
                        <button className={styles.logoutButton}>
                            Logout{" "}
                            <img
                                src={logoutSvg}
                                alt="Logout SVG"
                                className={styles.logoutSvg}
                            />
                        </button>
                    </Form>
                )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
