/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../validations/registrationSchema.js";
import { UserApi } from "../Api/UserApi.jsx";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { FiUserPlus } from "react-icons/fi";

const Registration = () => {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
    },
  });

  async function onSubmit(data) {
    toast.dismiss();
    try {
      const res = await UserApi.register(data);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const serverErrors = error.response?.data?.errors;
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          setError(key, { type: "server", message: serverErrors[key] });
        });
        toast.error("Please fix the errors below");
      } else if (serverMessage) {
        setError("general", { type: "server", message: serverMessage });
        toast.error(serverMessage);
      } else {
        setError("general", {
          type: "server",
          message: "Failed to register",
        });
        toast.error("Something went wrong");
      }
    }
  }

  const genderOptions = [
    { value: "male", label: "Male", emoji: "👨" },
    { value: "female", label: "Female", emoji: "👩" },
    { value: "others", label: "Others", emoji: "🧑" },
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] animate-blob delay-2000" />
      <div className="absolute top-[50%] right-[40%] w-[250px] h-[250px] bg-success/10 rounded-full blur-[100px] animate-blob delay-4000" />

      <ToastContainer
        position="top-right"
        theme="dark"
        toastClassName="!bg-surface-light !text-white !border !border-surface-lighter !rounded-xl"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/30 animate-pulse-glow">
            <FiUserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">
            Join us and start your journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-8 shadow-2xl shadow-black/40 animate-fade-in-up delay-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="animate-slide-in-right delay-300">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <HiOutlineUser className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full" />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="animate-slide-in-right delay-400">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <HiOutlineMail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="animate-slide-in-right delay-500">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="animate-slide-in-right delay-700">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map((option) => (
                  <label
                    key={option.value}
                    className="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register("gender")}
                      className="peer sr-only"
                    />
                    <div className="flex flex-col items-center gap-1.5 p-3 bg-surface/80 border border-surface-lighter rounded-xl text-gray-400 transition-all duration-300 peer-checked:border-accent peer-checked:bg-accent/10 peer-checked:text-accent-light hover:border-surface-lighter/80 hover:bg-surface/60">
                      <span className="text-xl">{option.emoji}</span>
                      <span className="text-xs font-medium">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full" />
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-danger/10 border border-danger/30 rounded-xl animate-scale-in">
                <p className="text-sm text-danger text-center">
                  {errors.general.message}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-accent to-primary text-white font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    <FiUserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-surface-lighter" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-surface-lighter" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 animate-fade-in delay-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent-light hover:text-primary-light font-medium transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 gap-1.5 animate-fade-in delay-1000">
          <div className="w-2 h-1 bg-accent/30 rounded-full" />
          <div className="w-2 h-1 bg-primary-light/50 rounded-full" />
          <div className="w-8 h-1 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Registration;
