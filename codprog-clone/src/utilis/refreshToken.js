import axios from "axios";
import { BASE_URL } from "../constant";
import { SUPABASE_API_KEY } from "../constant";

export async function refreshToken(refresh_token_of_user) {
    const tokenURL = `${BASE_URL}auth/v1/token?grant_type=refresh_token`;
    const {data} = await axios.post(
        tokenURL,
        { refresh_token: refresh_token_of_user },
        {
            headers: {
                apikey: SUPABASE_API_KEY,
            },
        }
    );
    const {access_token , expires_at , refresh_token , user:{id:user_id}  } = data ;
    localStorage.setItem("user" , JSON.stringify({access_token , expires_at , refresh_token , user_id})) ;
    return access_token;
}
