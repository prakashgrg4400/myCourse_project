import { redirect } from "react-router-dom";
import { getUsers } from "./getUser";

export function requireAuth({redirectTo})
{
    // console.log(redirectTo);
     let users = getUsers();
     if(users===null)
        {
            throw redirect(`/login?redirectTo=${redirectTo}`);
        }
}