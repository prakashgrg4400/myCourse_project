import axios from "axios"
import { ALL_COURSES, SUPABASE_API_KEY } from "../constant"
import { Link, useLoaderData } from "react-router-dom";

export async function homeLoader()
{
  const response  = await axios.get(ALL_COURSES , {
    headers:{
      apikey:SUPABASE_API_KEY
    }
  })
  return response.data ;
}

function Home() {
  const myCourses = useLoaderData();
  // console.log(myCourses);
  return (
    <div>
      <h1>Home</h1>
      {myCourses.map((course)=>{
        return (
            <div key={course.id} style={{ border: "5px solid black",margin:"1rem",padding:"1rem" }}>
                <p>Name : {course.name}</p>
                <p>
                    Price : {course.amount} {course.currency}
                </p>
                <p>Description : {course.description}</p>
                <Link to={`course-details/${course.id}`}>View Course</Link>
            </div>
        );
      })}
    </div>
  )
}

export default Home
