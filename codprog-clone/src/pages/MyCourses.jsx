import { redirect,} from "react-router-dom";
import { getUsers } from "../utilis/getUser";

export function myCoursesLoader({request}) {
  console.log(request);
  const redirectTo = new URL(request.url).pathname;
  console.log(redirectTo)
  const user = getUsers();
  if (user == null) {
    //!==> below is hard coded path.
    // return redirect("/login?redirectTo=/my-courses");
    return redirect(`/login?redirectTo=${redirectTo}`);
  } else {
    return null;
  }
}

function MyCourses() {
  console.log(location);
  return <div>MyCourses</div>;
}

export default MyCourses;
