import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constant";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export async function courseDetailsLoader({params})
{
    const courseId = params.id ;
    const URL = `${BASE_URL}rest/v1/modules?course_id=eq.${courseId}&select=*` ;
    const {data:modules} = await axios.get(URL , {headers:{apikey:SUPABASE_API_KEY}});
    return {modules , courseId};
}
function CourseDetails() {
    const {modules , courseId} = useLoaderData();
    // console.log(modules);
    console.log(courseId);
  return (
    <div>
        {JSON.stringify(modules)}
        <br />
        <Link to={`/payment/${courseId}`}>Buy course</Link>
    </div>
  )
}

export default CourseDetails