import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currency: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "Contains number", met: /\d/.test(formData.password) },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/90 px-4 py-8 sm:py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-3">
            <span className="text-2xl font-bold text-accent">4X</span>
          </div>
          <h1 className="text-3xl font-bold text-white">4xbrokers</h1>
        </div>

        <div className="rounded-xl border border-border bg-white shadow-lg p-5 sm:p-8 space-y-6">
          <header className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">Register</h1>
            <p className="text-base text-muted-foreground">
              Please enter the following information to start your account
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-base font-medium text-foreground">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-foreground">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, currency: e.target.value }))
                }
                className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                required
              >
                <option value="">Select a currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border px-3 py-2.5 pr-11 bg-background"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="mt-2 space-y-1">
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        req.met ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {req.met && <Check className="w-3 h-3 text-green-600" />}
                    </div>
                    <span
                      className={req.met ? "text-green-700" : "text-muted-foreground"}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border px-3 py-2.5 pr-11 bg-background"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex rounded-md border border-border bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Register
            </button>
          </form>

          <p className="text-[15px] text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-accent font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
