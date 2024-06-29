import axios from "axios";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../constant";
import { getUsers } from "../utilis/getUser";
import { redirect } from "react-router-dom";
import { checkTokenExpired } from "../utilis/checkTokenExpired";
import { refreshToken } from "../utilis/refreshToken";

export async function loguoutAction() {
    let { access_token, expires_at, refresh_token } = getUsers();
    if (checkTokenExpired(expires_at)) {
        access_token = await refreshToken(refresh_token);
    }
    try {
        console.log(access_token);
        const response = await axios.post(LOGOUT_URL, null, {
            headers: {
                apikey: SUPABASE_API_KEY,
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    } finally {
        localStorage.removeItem("user");
    }
    return redirect("/");
}
