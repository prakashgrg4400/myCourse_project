import axios from "axios";
import { SIGNUP_URL, SUPABASE_API_KEY } from "../constant";
import { Form, useActionData } from "react-router-dom";
import { requireAuth } from "../utilis/requireAuth";

export async function signupLoader(loaderObject)
{
   console.log(loaderObject);
   const redirectTo = new URL(loaderObject.pathname);
   requireAuth(redirectTo);
   return null;
}

export async function signupAction({request}) {
    const user = await request.formData();
    const newUser = {
      email: user.get("email"),
      password:user.get("password"),
    }
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
      if(data.identities && data.identities.length===0)
        {
          return {error:"User already exists"};
        }
      return {message:"Confirm your email by opening your gmail account"};
    } catch (error) {
      return null;
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
        </Form>
    );
}

export default Signup;
