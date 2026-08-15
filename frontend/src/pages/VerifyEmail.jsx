import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  async function handleVerify(e) {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/auth/verify-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } else {
      setError(data.detail);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0FF] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#504e51]">
            Echo Script
          </h1>

          <p className="mt-3 text-[#6B7280]">
            Verify your email to continue.
          </p>
        </div>

        {/* Email */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500">
            We sent a 6-digit code to
          </p>

          <p className="mt-1 font-medium text-[#504e51]">
            {email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-5">

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            className="
              w-full
              rounded-xl
              border border-gray-300
              bg-white
              px-4 py-3
              text-center
              text-lg
              tracking-[0.4em]
              text-[#413e42]
              placeholder:text-gray-400
              placeholder:tracking-normal
              outline-none
              transition
              focus:border-[#745383]
              focus:ring-2
              focus:ring-[#745383]/10
            "
          />

          {error && (
            <p className="text-center text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="
              w-full
              rounded-xl
              bg-[#b5b2b6de]
              py-3
              text-lg
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-[#969196]
              active:scale-[0.98]
              cursor-pointer
            "
          >
            Verify email
          </button>
        </form>

        {/* Back */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Wrong email?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="
              font-medium
              text-[#745383]
              hover:underline
              cursor-pointer
            "
          >
            Go back
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;