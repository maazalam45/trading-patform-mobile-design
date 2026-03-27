import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = (location.state as { from?: { pathname?: string } })?.from
    ?.pathname || "/accounts";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    // Step 1: Credentials accepted. Step 2 will verify OTP via Google Authenticator.
    navigate("/otp-verification", {
      replace: true,
      state: {
        pendingEmail: email.trim(),
        from: redirectTo,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/90 px-4 py-8 sm:py-10 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-xl mb-3">
            <span className="text-2xl font-bold text-accent">4X</span>
          </div>
          <h1 className="text-3xl font-bold text-white">4xbrokers</h1>
        </div>

        <div className="rounded-xl border border-border bg-white shadow-lg p-5 sm:p-8 space-y-6">
          <header className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">Sign In</h1>
            <p className="text-base text-muted-foreground">
              Access 4xbrokers using your email and password
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2.5 pr-11 bg-background"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex rounded-md border border-border bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </button>
          </form>

          <div className="space-y-4 text-[15px]">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-accent font-semibold hover:underline">
                Register here
              </Link>
            </p>

            <p>
              Forgot your password?{" "}
              <Link to="/forgot-password" className="text-accent font-semibold hover:underline">
                Reset password
              </Link>
            </p>

            <p>
              Need to re-scan your Google Authenticator QR code?{" "}
              <Link to="/forgot-password" className="text-accent font-semibold hover:underline">
                Click here
              </Link>
            </p>
          </div>

          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Registered users: please make sure your email address and phone number are up to date.
            If you lose access to your account, recovery may not be possible without them.
          </div>
        </div>
      </div>
    </div>
  );
}
