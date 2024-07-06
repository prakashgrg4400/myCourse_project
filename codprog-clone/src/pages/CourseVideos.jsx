import React from "react";
import { getUsers } from "../utilis/getUser";
import { requireAuth } from "../utilis/requireAuth";
import { checkTokenExpired } from "../utilis/checkTokenExpired";
import { refreshToken } from "../utilis/refreshToken";
import { BASE_URL, SUPABASE_API_KEY } from "../constant";
import axios from "axios";
// import { ReactPlayer } from "react-player/vimeo";
import ReactPlayer from "react-player/vimeo";
import { useLoaderData } from "react-router-dom";

export async function courseVideosLoader({ request, params }) {
    // console.log(request);
    // console.log(params);
    const redirectTo = new URL(request.url).pathname;
    let { access_token, expires_at, user_id, refresh_token } = getUsers();
    await requireAuth(redirectTo);
    if (checkTokenExpired(expires_at)) {
        access_token = refreshToken(refresh_token);
    }

    // ${BASE_URL}rest/v1/modules?course_id=eq.${courseId}&select=*`
    const modulesURL = `${BASE_URL}rest/v1/modules?course_id=eq.${params.courseId}&select=*`;
    const { data: modules } = await axios.get(modulesURL, {
        headers: {
            apikey: SUPABASE_API_KEY,
            // Authorization:`bearer ${access_token}`,
        },
    });
    console.log(modules[0].id);

    const videosResponse = await Promise.all(
        modules.map((module) => {
            return axios.get(
                `${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`,
                {
                    headers: {
                        apikey: SUPABASE_API_KEY,
                        Authorization: `bearer ${access_token}`,
                    },
                }
            );
        })
    );
    console.log(videosResponse);
    const videosData = videosResponse.map((video) => video.data);
    console.log(videosData);
    const flatVideo = [].concat(...videosData);
    console.log(flatVideo);
    return flatVideo;
}

function CourseVideos() {
    const videos = useLoaderData();
    console.log("video ", videos);
    return (
        <div>
            <h1>Video Below</h1>
            {videos.map((video) => {
                console.log(video.vimeo_url);
                return video?.vimeo_url ? (
                    <div key={video.id}>
                        <ReactPlayer url={video.vimeo_url} controls />
                        <h3>{video.name}</h3>
                    </div>
                ) : null;
                // return <ReactPlayer/>
            })}
        </div>
    );
}

export default CourseVideos;
