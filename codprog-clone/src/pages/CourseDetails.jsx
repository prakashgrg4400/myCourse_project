import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constant";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./CourseDetails.module.css";
import { useSearchParams } from "react-router-dom";
import coding from "../assets/coding.svg";

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
    const [searchParams] = useSearchParams();
  const courseName = searchParams.get("name");
  return (
    // <div>
    //     {JSON.stringify(modules)}
    //     <br />
    //     <Link to={`/payment/${courseId}`}>Buy course</Link>
    // </div>
    <div className="container">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.courseName}>{courseName} Course</h1>
          <div className={styles.headerButtonContainer}>
            <Link to={`/payment/${courseId}`} className={styles.btn}>
              Buy Now
            </Link>

            <a className={styles.btn} href="#curriculum">
              View More
            </a>
          </div>
        </div>

        <img
          src={coding}
          alt="Illustration of person doing coding"
          className={styles.headerImg}
        />
      </header>
      <section id="curriculum" className={styles.curriculumSection}>
        <h2 className={styles.curriculumHeading}>Curriculum</h2>
        {modules
          .sort((a, b) => a.number - b.number)
          .map((module) => {
            const { id, number, name, description } = module;
            return (
              <div key={id} className={styles.module}>
                <h3 className={styles.chapterNumber}>Chapter {number}</h3>
                <h2>{name}</h2>
                {description}
              </div>
            );
          })}
        <br />
        <Link to={`/payment/${courseId}`} className={styles.btn}>
          Buy Now
        </Link>
      </section>
    </div>
  )
}

export default CourseDetails