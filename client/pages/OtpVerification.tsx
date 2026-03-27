import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

type OtpLocationState = {
  pendingEmail?: string;
  from?: string;
};

export default function OtpVerification() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as OtpLocationState) || {};

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [error, setError] = useState("");

  const pendingEmail = state.pendingEmail || "";
  const redirectTo = state.from || "/";

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/login", { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingEmail, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP code.");
      return;
    }

    // Demo verification step; replace with backend OTP API validation when available.
    login(pendingEmail);
    navigate(redirectTo, { replace: true });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">Google Authenticator</h1>
            <p className="text-base text-muted-foreground">
              Use Google Authenticator and enter the six-digit OTP to complete sign in.
            </p>
            <p className="text-sm text-muted-foreground">Signing in as: {pendingEmail}</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-base font-medium text-foreground">One-Time Passcode (OTP)</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full rounded-md border border-border px-3 py-2.5 bg-background tracking-[0.2em] text-lg"
                placeholder="123456"
                required
              />
            </div>

            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="text-sm text-muted-foreground">
              Code expires in {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>

            <button
              type="submit"
              className="inline-flex rounded-md border border-border bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Verify OTP
            </button>
          </form>

          <div className="text-sm">
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
