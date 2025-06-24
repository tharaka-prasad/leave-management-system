import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import queryClient from "../../state/queryClient";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/userApi";
import useCurrentUser from "../../utils/useCurrentUser";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { user } = useCurrentUser();
  if (user?.role == "admin") {
    navigate("/dashboard");
  } else if (user) {
    navigate("/home");
  }

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      localStorage.setItem("token", data?.access_token);
      enqueueSnackbar("Welcome Back!", { variant: "success" });
      if (data?.role === "admin") {
        navigate("/dashboard")
      } else if (data?.role === "employee") {
        navigate("/home")
      };
    },
    onError: () => {
      enqueueSnackbar(`Login Failed`, {
        variant: "error",
      });
    },
  });

  const onLoginSubmit = (data: { email: string; password: string }) => {
    loginMutation(data);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                disabled={isPending}
                onClick={() => console.log("Forgot password clicked")}
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-200 bg-transparent border-none cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-blue-600 hover:text-blue-500 transition duration-200 bg-transparent border-none cursor-pointer ml-1"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
