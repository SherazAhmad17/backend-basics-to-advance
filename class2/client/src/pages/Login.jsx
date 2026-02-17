/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema.js";
import { useAuth } from "../hooks/useAuth.jsx";
import { AuthApi } from "../Api/AuthApi.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, setAccessToken, setUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

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
      toast.success("Login Successful! Redirecting...");
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] animate-blob delay-2000" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-primary-light/10 rounded-full blur-[100px] animate-blob delay-4000" />

      <ToastContainer
        position="top-right"
        theme="dark"
        toastClassName="!bg-surface-light !text-white !border !border-surface-lighter !rounded-xl"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30 animate-pulse-glow">
            <FiLogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-light/80 backdrop-blur-xl border border-surface-lighter/50 rounded-2xl p-8 shadow-2xl shadow-black/40 animate-fade-in-up delay-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="animate-slide-in-left delay-300">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <HiOutlineMail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
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
            <div className="animate-slide-in-left delay-400">
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-surface/80 border border-surface-lighter rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-danger flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-danger rounded-full" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 animate-fade-in-up delay-500 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiLogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

          {/* Register Link */}
          <p className="text-center text-sm text-gray-400 animate-fade-in delay-700">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary-light hover:text-accent-light font-medium transition-colors duration-200"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-6 gap-1.5 animate-fade-in delay-1000">
          <div className="w-8 h-1 bg-primary rounded-full" />
          <div className="w-2 h-1 bg-primary-light/50 rounded-full" />
          <div className="w-2 h-1 bg-accent/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Login;
