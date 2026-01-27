import { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loginMutation, isPending, error } = useLogin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-xl bg-base-100">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-base-content/60 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome back</h2>
          <p className="text-sm text-base-content/70">
            Sign in to continue to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text font-medium">Email address</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-base-content/40" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-base-content/40" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/40 hover:text-base-content transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
