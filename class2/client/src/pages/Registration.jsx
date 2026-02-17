/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validations/registrationSchema.js";
import {UserApi} from "../Api/UserApi.jsx";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver : zodResolver(registrationSchema),
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues:{
            name: "",
            email: "",
            password: "",
            gender: "",
        }


    });

    async function onSubmit(data) {
        try {
            const res = await UserApi.register(data);
            console.log(res.data);
            navigate("/login")
        } catch (error) {
            const serverMessage = error.response?.data?.message;
            const serverErrors = error.response?.data?.errors;
            if (serverErrors) {
                Object.keys(serverErrors).forEach((key) => {
                    setError(key, { type: "server", message: serverErrors[key] });
                });
            } else if (serverMessage) {
                setError("general", { type: "server", message: serverMessage });
            } else {
                setError("general", { type: "server", message: "Failed to register" });
            }
        }
    }



    

    return (
        <>
        
        <form onSubmit={handleSubmit(onSubmit)}>


            <h1>Register the user</h1>

            <input type="text" {...register("name")  } placeholder="name" />
            {errors.name && <p>{errors.name.message}</p>}

            <input type="email" {...register("email")  } placeholder="email" />
            {errors.email && <p>{errors.email.message}</p>}

            <input type="password" {...register("password")  } placeholder="password" />
            {errors.password && <p>{errors.password.message}</p>}

            <input type="radio" name="gender"  value="male" {...register("gender")  } />male
            <input type="radio" name="gender"  value="female" {...register("gender")  } />female
            <input type="radio" name="gender"  value="others" {...register("gender")  } />others
            {errors.gender && <p>{errors.gender.message}</p>}


            <button>Submit</button>

            
        </form>

        {errors.general && <p>{errors.general.message}</p>}

        </>
    );
};

export default Registration;
