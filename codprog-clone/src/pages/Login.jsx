import { Form, redirect, useActionData } from "react-router-dom";
import { LOGIN_URL, SUPABASE_API_KEY } from "../constant";
import axios from "axios";

//!==> "handleAction" is a function react automatically calls when the form is submitted, depending upon the path given in action attribute of form component. Than react will go to the Route containig that path and invoke the function present inside action attribute of that route. The action function gives us an object by default, which will store our formdata.
export async function handelAction({ request }) {
  // console.log("action called");
  // console.log(request.formData());
  const data = await request.formData(); //The formdata is stored inside "request.formData()" method which will return us promise, after resolving the promise we get the data. To access the data we need to use "get()" method, and inside get() method we need to inseert the "name" of the input which we gave in below jsx syntax, otherwise we wont be able to access the data.
  console.log(data);
  const credentials = {
    email: data.get("email"), //!==> Here "email" is the name of one of the input field.
    password: data.get("password"), //!==> Here "password" is the name of one of the input field.
  };
  // console.log(credentials);
  try {
    //!--> credentials is a javascript object, and by default axios converts this object into "string", so no need to us json.stringify() .
    const response = await axios.post(LOGIN_URL, credentials, {
      headers: {
        apikey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });
    //  console.log(response);
    const { access_token, expires_at, refresh_token } = response.data;
    // console.log(access_token);
    // console.log(expires_at);
    // console.log(refresh_token);
    const user = {access_token , expires_at , refresh_token};
    console.log(user);
    return redirect("/");
  } catch (error) {
    // console.log(error.message); //!==> this error message is provided by the "axios" .
    // console.log(error.response.data.error_description);//!==> if credentials is wrong, than this error is given by supabase itself
    // console.log(error.response.data.error);//!==> If url is invalid
    if(error.response.request.status===401)
      {
        console.log(error.response.data.message);
        return {error:error.response.data.message};
      }
    else if(error.response.request.status===400)
      {
        console.log(error.response.data.error_description)
        return {error:error.response.data.error_description};
      }
      else{
        console.log(error.message);
        return {error:error.message};
      }
  }
  // return null; //! ==> returning is compulsory while using "action attribute" in our Route.  But since we have returned other data above so no need to return null;
}

function Login() {
  const errorData = useActionData();
  console.log(errorData);
  return (
    //  "Form" component is provided by the react-router-dom, and by default this Form uses get request. The get request sends data in the url, where as the post request doesnt sends data in the url, so data is hidden.
    <Form method="POST" action="/login">
      {/* The action is triggered when we submit the form, in action we have give a path, so react will go to the "Route" and search for the path "login" , and inside that route react will automatically call the function present inside the "action" attribute */}
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          placeholder="email"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="off"
          placeholder="password"
        />
      </div>
      <input type="submit" value="Login" />
      {errorData && errorData.error && <p>{errorData.error}</p>}
    </Form>
  );
}

export default Login;
