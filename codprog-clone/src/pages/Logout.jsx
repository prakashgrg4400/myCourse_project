import axios from "axios";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../constant";
import { getUsers } from "../utilis/getUser";
import { redirect } from "react-router-dom";

export async function loguoutAction()
{
    const user = getUsers();
    console.log(user.access_token);
    const response = await axios.post(LOGOUT_URL , null , {
        headers:{
            "apikey":SUPABASE_API_KEY,
            "Authorization":`Bearer ${user.access_token}`,
            "Content-Type":"application/json",
        }
    })
    console.log(response);
    localStorage.removeItem("user");
    return redirect("/") ;
}