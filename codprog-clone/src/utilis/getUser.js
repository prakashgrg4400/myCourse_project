
export function getUsers()
{
    if("user" in localStorage)
        {
            let user = JSON.parse(localStorage.getItem("user"));
            if("access_token" in user && "expires_at" in user && "refresh_token" in user && "user_id" in user)
                {
                    return user ;
                }
        }
    return null ;
}