import React from "react";
import { getUsers } from "../utilis/getUser";
import { requireAuth } from "../utilis/requireAuth";
import { checkTokenExpired } from "../utilis/checkTokenExpired";
import { refreshToken } from "../utilis/refreshToken";
import { BASE_URL, SUPABASE_API_KEY } from "../constant";
import axios from "axios";
import styles from "./CourseVideos.module.css";
// import { ReactPlayer } from "react-player/vimeo";
import ReactPlayer from "react-player/vimeo";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function courseVideosLoader({ request, params }) {
    // // console.log(request);
    // // console.log(params);
    // const redirectTo = new URL(request.url).pathname;
    // let { access_token, expires_at, user_id, refresh_token } = getUsers();
    // await requireAuth(redirectTo);
    // if (checkTokenExpired(expires_at)) {
    //     access_token = refreshToken(refresh_token);
    // }

    // // ${BASE_URL}rest/v1/modules?course_id=eq.${courseId}&select=*`
    // const modulesURL = `${BASE_URL}rest/v1/modules?course_id=eq.${params.courseId}&select=*`;
    // const { data: modules } = await axios.get(modulesURL, {
    //     headers: {
    //         apikey: SUPABASE_API_KEY,
    //         // Authorization:`bearer ${access_token}`,
    //     },
    // });
    // console.log(modules[0].id);

    // const videosResponse = await Promise.all(
    //     modules.map((module) => {
    //         return axios.get(
    //             `${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`,
    //             {
    //                 headers: {
    //                     apikey: SUPABASE_API_KEY,
    //                     Authorization: `bearer ${access_token}`,
    //                 },
    //             }
    //         );
    //     })
    // );
    // console.log(videosResponse);
    // const videosData = videosResponse.map((video) => video.data);
    // console.log(videosData);
    // const flatVideo = [].concat(...videosData);
    // console.log(flatVideo);
    // return flatVideo;

    console.log(params);
    const { courseId } = params;
    const { access_token } = getUsers();

    const { data } = await axios.get(
        `${BASE_URL}rest/v1/modules?course_id=eq.${courseId}&select=*`,
        {
            headers: { apikey: SUPABASE_API_KEY },
        }
    );
    const modules = data.sort((a, b) => a.number - b.number);
    // [{name: ""}, {name: ""}]
    console.log("modules", modules);
    const videos = await Promise.all(
        modules.map((module) => {
            return axios.get(
                `${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`,
                {
                    headers: {
                        apikey: SUPABASE_API_KEY,
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
        })
    );

    // need data something like this

    console.log("videos", videos);
    const moduleVideos = videos.map((item) =>
        item.data.sort((a, b) => a.number - b.number)
    );

    // const dummy = [{module_number: 1, videos : []}, {module_number: 2, videos: []}]

    const videosData = moduleVideos.map((videos, index) => {
        return { module_name: modules[index].name, videos };
    });
    console.log("videosData", videosData);
    // const videosArray = [].concat(...videosData);
    // console.log("videosArray", videosArray);
    return videosData;
}

function CourseVideos() {
    // const videos = useLoaderData();
    // console.log("video ", videos);
    // return (
    //     <div>
    //         <h1>Video Below</h1>
    //         {videos.map((video) => {
    //             console.log(video.vimeo_url);
    //             return video?.vimeo_url ? (
    //                 <div key={video.id}>
    //                     <ReactPlayer url={video.vimeo_url} controls />
    //                     <h3>{video.name}</h3>
    //                 </div>
    //             ) : null;
    //             // return <ReactPlayer/>
    //         })}
    //     </div>
    // );
    const videosData = useLoaderData();
    console.log(videosData);
    if (videosData.length === 0) {
        return <h1>No videos found</h1>;
    }
    let firstVideo;
    for (let module of videosData) {
        if (module.videos.length > 0) {
            firstVideo = module.videos[0].vimeo_url;
        }
    }
    console.log("firstVideo", firstVideo);
    if (!firstVideo) {
        return <h1>No videos found</h1>;
    }
    const [videoUrl, setVideoUrl] = useState(firstVideo);
    return (
        <div className={`${styles.myCourseSection}`}>
            <div className={styles.playlist}>
                {videosData.map((module) => {
                    return (
                        <div key={module.id}>
                            <h3>{module.module_name}</h3>
                            <ul>
                                {module.videos.map((video, index) => (
                                    <li
                                        key={video.vimeo_url}
                                        onClick={() =>
                                            setVideoUrl(video.vimeo_url)
                                        }
                                    >
                                        {index + 1}. {video.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <div className={styles.videoContainer}>
                <ReactPlayer
                    url={videoUrl}
                    controls
                    className={styles.video}
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}

export default CourseVideos;
