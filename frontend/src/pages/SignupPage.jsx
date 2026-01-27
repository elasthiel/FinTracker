import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2, Check, X, ArrowLeft } from "lucide-react";
import useSignup from "../hooks/useSignup";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signupMutation, isPending, error } = useSignup();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordChecks = useMemo(() => {
    const password = formData.password;
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [formData.password]);

  const passwordStrength = useMemo(() => {
    const checks = Object.values(passwordChecks);
    const passed = checks.filter(Boolean).length;
    if (passed === 0) return { label: "", color: "", width: "0%" };
    if (passed === 1) return { label: "Weak", color: "bg-error", width: "25%" };
    if (passed === 2) return { label: "Fair", color: "bg-warning", width: "50%" };
    if (passed === 3) return { label: "Good", color: "bg-info", width: "75%" };
    return { label: "Strong", color: "bg-success", width: "100%" };
  }, [passwordChecks]);

  const passwordsMatch = confirmPassword === formData.password && confirmPassword !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      return;
    }
    signupMutation(formData);
  };

  const CheckItem = ({ passed, text }) => (
    <div className={`flex items-center gap-2 text-xs ${passed ? "text-success" : "text-base-content/50"}`}>
      {passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {text}
    </div>
  );

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
            <User className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Create account</h2>
          <p className="text-sm text-base-content/70">
            Start tracking your finances today
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="form-control">
            <label htmlFor="fullName" className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-5 h-5 text-base-content/40" />
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

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

            {formData.password && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-base-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <span className="text-xs font-medium min-w-[50px]">{passwordStrength.label}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <CheckItem passed={passwordChecks.minLength} text="8+ characters" />
                  <CheckItem passed={passwordChecks.hasUppercase} text="Uppercase" />
                  <CheckItem passed={passwordChecks.hasLowercase} text="Lowercase" />
                  <CheckItem passed={passwordChecks.hasNumber} text="Number" />
                </div>
              </div>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-base-content/40" />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
      
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input input-bordered w-full pl-10 pr-10 ${
                  confirmPassword && (passwordsMatch ? "input-success" : "input-error")
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/40 hover:text-base-content transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <label className="label">
                <span className="label-text-alt text-error">Passwords do not match</span>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || (confirmPassword && !passwordsMatch)}
            className="btn btn-primary w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
