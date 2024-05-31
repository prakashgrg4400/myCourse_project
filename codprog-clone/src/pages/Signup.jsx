import axios from "axios";
import { SIGNUP_URL, SUPABASE_API_KEY } from "../constant";
import { Form, redirect, useActionData } from "react-router-dom";
import { getUsers } from "../utilis/getUser";

export async function signupLoader()
{
  const users = getUsers();
  if(users===null)
    {
       return null ;
    }
  else{
    return  redirect("/");
  }
}

export async function signupAction({request}) {
    const user = await request.formData();
    const newUser = {
      email: user.get("email"),
      password:user.get("password"),
    }
    console.log(newUser);
    const confirmPassword = user.get("confirm-password");
    if(newUser.password!==confirmPassword)
      {
        return {errorMessage:"Password is not matching"};
      }
    try {
      const response = await axios.post(SIGNUP_URL , newUser , {
        headers:{
          apikey:SUPABASE_API_KEY,
          "Content-Type":"application/json",
        }
      })
      const data = response.data ;
      console.log(data);
      if(data.identities && data.identities.length===0)
        {
          return {error:"User already exists"};
        }
      return {message:"Confirm your email by opening your gmail account"};
      // return redirect("/");
    } catch (error) {
      console.log(error);
       if(error?.response?.data?.msg)
        {
          return {error:error.response.data.msg};
        }
      return {error};
    }
}

function Signup() {
  const error = useActionData();
  
    return (
        <Form action="/signup" method="POST">
            <h2>Signup</h2>
            <div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                />
            </div>
            <div>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="confirm-password"
                />
            </div>
            <div>
                <input type="submit" value="signup" />
            </div>
            {error && error?.errorMessage?<p>{error.errorMessage}</p>:""}
            {error && error?.error?<p>{error.error}</p>:""}
        </Form>
    );
}

export default Signup;
