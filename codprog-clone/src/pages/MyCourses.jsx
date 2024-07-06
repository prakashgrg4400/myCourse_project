import { Link, redirect, useLoaderData } from "react-router-dom";
import { getUsers } from "../utilis/getUser";
import { requireAuth } from "../utilis/requireAuth";
import { checkTokenExpired } from "../utilis/checkTokenExpired";
import { refreshToken } from "../utilis/refreshToken";
import { BASE_URL, SUPABASE_API_KEY } from "../constant";
import axios from "axios";

export async function myCoursesLoader({ request }) {
    const redirectTo = new URL(request.url).pathname;
    let { access_token, expires_at, user_id, refresh_token } = getUsers();
    requireAuth(redirectTo);
    if (checkTokenExpired(expires_at)) {
        access_token = refreshToken(refresh_token);
    }
    //https://jxmnwhshtaolodfctwgc.supabase.co/rest/v1/subscriptions?user_id=eq.898d6843-8710-4d7d-9bdc-b70aadd91d6c&select=*
    const subscriptionEndPoint = `${BASE_URL}rest/v1/subscriptions?user_id=eq.${user_id}&select=*`;
    const { data: subscriptions } = await axios.get(subscriptionEndPoint, {
        headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${access_token}`,
        },
    });
    const courseIds = subscriptions.map((subscription) => {
        return subscription.course_id;
    });

    const plainCourseIds = courseIds.map((courseId) => `${courseId}`).join();
    // console.log(plainCourseIds);

    //https://jxmnwhshtaolodfctwgc.supabase.co/rest/v1/courses?id=in.%28"1"%29
    const myCoursesEndPoint = `${BASE_URL}rest/v1/courses?id=in.%28${plainCourseIds}%29`;
    const { data: myCourses } = await axios.get(myCoursesEndPoint, {
        headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${access_token}`,
        },
    });
    // console.log(myCourses);
    return myCourses;
}

function MyCourses() {
    const myCourses = useLoaderData();
    console.log(myCourses);

    return (
        <div>
            <h2>My Courses</h2>
            {myCourses.map((myCourse) => {
                return (
                    <div key={myCourse.id}>
                        <Link to={myCourse.id.toString()}>{myCourse.name}</Link>
                    </div>
                );
            })}
        </div>
    );
}

export default MyCourses;
