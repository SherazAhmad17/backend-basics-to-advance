/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { AuthApi } from "../Api/AuthApi.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setAccessToken, setUser } = useAuth();
  
  useEffect(()=>{
    
    if(isAuthenticated){
    navigate("/dashboard")
  }
  },[isAuthenticated])
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });


  async function onSubmit(data) {
    toast.dismiss();
    try {
      const res = await AuthApi.login(data);
      console.log(res, "RESPONSE ");
      toast.success("Login Successful! Redirecting...");
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (error) {
      console.log(error?.message, "Server error");
      console.log(error, "rerroroo");
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }
  //  server - > {email , password}  =>  {email:"abc" ,  password:"123"}
  //register
  console.log("Errorsssss", errors);

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <input {...register("password")} type="password" />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <button>Login</button>
      </form>

      <h1>{isAuthenticated ? "YOu are logged in" : "You are not logged in"}</h1>
    </>
  );
}

export default Login;
