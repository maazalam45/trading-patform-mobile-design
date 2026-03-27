import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"google" | "security">("security");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password requested for:", { email, method });
    setSubmitted(true);
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-none">Forgot Your Password</h1>
            <p className="text-base text-muted-foreground">
              Enter your email and choose how you want to be verified.
            </p>
          </header>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-base font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2.5 bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 text-base">
                  <input
                    type="radio"
                    name="method"
                    checked={method === "google"}
                    onChange={() => setMethod("google")}
                    className="h-4 w-4 accent-primary"
                  />
                  Google Authenticator
                </label>
                <label className="flex items-center gap-3 text-base">
                  <input
                    type="radio"
                    name="method"
                    checked={method === "security"}
                    onChange={() => setMethod("security")}
                    className="h-4 w-4 accent-primary"
                  />
                  Security Questions
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex rounded-md border border-border bg-primary px-5 py-2.5 font-medium text-primary-foreground hover:bg-primary/90"
              >
                Verify
              </button>
            </form>
          ) : (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Verification request sent for <strong>{email}</strong> using{" "}
              <strong>{method === "google" ? "Google Authenticator" : "Security Questions"}</strong>.
            </div>
          )}

          <Link to="/login" className="inline-block text-accent font-semibold hover:underline">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
