import { redirect,} from "react-router-dom";
import { getUsers } from "../utilis/getUser";

export function myCoursesLoader() {
  const user = getUsers();
  if (user == null) {
    return redirect("/login?redirectTo=/my-courses");
  } else {
    return null;
  }
}

function MyCourses() {
  console.log(location);
  return <div>MyCourses</div>;
}

export default MyCourses;
