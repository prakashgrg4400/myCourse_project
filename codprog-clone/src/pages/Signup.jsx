import axios from "axios";
import { SIGNUP_URL, SUPABASE_API_KEY } from "../constant";
import { Form, redirect, useActionData } from "react-router-dom";
import { getUsers } from "../utilis/getUser";
import styles from "./LoginAndSignup.module.css";

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
  const errorData = useActionData();
  
    return (
    //     <Form action="/signup" method="POST">
    //         <h2>Signup</h2>
    //         <div>
    //             <input
    //                 type="email"
    //                 name="email"
    //                 id="email"
    //                 placeholder="email"
    //             />
    //         </div>
    //         <div>
    //             <input
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 placeholder="password"
    //             />
    //         </div>
    //         <div>
    //             <input
    //                 type="password"
    //                 name="confirm-password"
    //                 id="confirm-password"
    //                 placeholder="confirm-password"
    //             />
    //         </div>
    //         <div>
    //             <input type="submit" value="signup" />
    //         </div>
    //         {error && error?.errorMessage?<p>{error.errorMessage}</p>:""}
    //         {error && error?.error?<p>{error.error}</p>:""}
    //         {error && error?.message?<p>{error.message}</p>:""}
    //     </Form>

    <div className="container">
    <h2 className={styles.pageHeading}>
      Create your account and start learning
    </h2>
    <Form action="/signup" method="POST" className={styles.form}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoComplete="off" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <label htmlFor="confirm password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
        />
      </div>
      <div>
        <input type="submit" value="Signup" />
        {errorData?.error && <p>{errorData.error}</p>}
        {errorData?.message && <p>{errorData.message}</p>}
      </div>
    </Form>{" "}
  </div>

    );
}

export default Signup;
