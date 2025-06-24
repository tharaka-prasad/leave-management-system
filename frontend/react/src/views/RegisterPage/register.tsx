import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import queryClient from "../../state/queryClient";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../../api/userApi";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      employee_id: "",
      password: "",
      password_confirmation: "",
    },
  });
  const navigate = useNavigate();

  const { mutate: registerMutation } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      enqueueSnackbar("Account created!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigate("/");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Registration failed";
      enqueueSnackbar(message, { variant: "error" });
    },
  });

  const onSubmit = (data: any) => {
    registerMutation(data);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-60 rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name", { required: "First name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email" } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              {...register("employee_id", { required: "Employee ID is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.employee_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employee_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min length is 6" } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("password_confirmation", { required: "Confirm your password" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              {isSubmitting ? "Registering..." : "Sign Up"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline ml-4"
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
