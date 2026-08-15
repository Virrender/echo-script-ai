import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

const isGmail =
  email === "" || email.toLowerCase().endsWith("@gmail.com");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    const isPasswordValid =
      passwordRequirements.length &&
      passwordRequirements.uppercase &&
      passwordRequirements.lowercase &&
      passwordRequirements.digit &&
      passwordRequirements.special;

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
  setError("Please use a Gmail address.");
  return;
}

    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      navigate("/verify-email", {
        state: { email },
      });
    } else {
      console.error(data.detail);
      setError(data.detail);
    }
  }

  function requirementClass(isValid) {
    return isValid ? "text-green-600" : "text-gray-400";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0FF] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#504e51]">
            Echo Script
          </h1>

          <p className="mt-3 text-[#6B7280]">
            Create your account and get started.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-5">

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
    <input
      type="text"
      name="first_name"
      placeholder="First name"
      value={firstName}
      onChange={(e) => {
        const value = e.target.value;
        setFirstName(value);

        if (value && !/^[A-Za-z]+$/.test(value)) {
          setFirstNameError("Use letters only");
        } else {
          setFirstNameError("");
        }
      }}
      required
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-[#413e42]
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[#745383]
                focus:ring-2
                focus:ring-[#745383]/10
              "
            />
                {firstNameError && (
      <p className="mt-1 text-xs text-red-500">
        {firstNameError}
      </p>
    )}
  </div>

<div>
    <input
      type="text"
      name="last_name"
      placeholder="Last name"
      value={lastName}
      onChange={(e) => {
        const value = e.target.value;
        setLastName(value);

        if (value && !/^[A-Za-z]+$/.test(value)) {
          setLastNameError("Use letters only");
        } else {
          setLastNameError("");
        }
      }}
      required
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-[#413e42]
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[#745383]
                focus:ring-2
                focus:ring-[#745383]/10
              "
            />
                {lastNameError && (
      <p className="mt-1 text-xs text-red-500">
        {lastNameError}
      </p>
    )}
  </div>
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              rounded-xl
              border border-gray-300
              bg-white
              px-4 py-3
              text-[#413e42]
              placeholder:text-gray-400
              outline-none
              transition
              focus:border-[#745383]
              focus:ring-2
              focus:ring-[#745383]/10
            "
          />

          {email && !isGmail && (
            <p className="mt-2 text-xs text-red-500">
              Please use a Gmail address.
            </p>
          )}



          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                px-4 py-3
                text-[#413e42]
                placeholder:text-gray-400
                outline-none
                transition
                focus:border-[#745383]
                focus:ring-2
                focus:ring-[#745383]/10
              "
            />

            {/* Password requirements */}
            {password && (
              <div className="mt-3 rounded-xl bg-[#F8F6FA] px-4 py-3">
                <p className="mb-2 text-xs font-medium text-gray-500">
                  Password requirements
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <p className={requirementClass(passwordRequirements.length)}>
                    {passwordRequirements.length ? "✓" : "○"} 8+ characters
                  </p>

                  <p
                    className={requirementClass(
                      passwordRequirements.uppercase
                    )}
                  >
                    {passwordRequirements.uppercase ? "✓" : "○"} Uppercase
                  </p>

                  <p
                    className={requirementClass(
                      passwordRequirements.lowercase
                    )}
                  >
                    {passwordRequirements.lowercase ? "✓" : "○"} Lowercase
                  </p>

                  <p className={requirementClass(passwordRequirements.digit)}>
                    {passwordRequirements.digit ? "✓" : "○"} Number
                  </p>

                  <p
                    className={requirementClass(
                      passwordRequirements.special
                    )}
                  >
                    {passwordRequirements.special ? "✓" : "○"} Special character
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
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
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
          {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                  "
                />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              font-medium
              text-[#745383]
              hover:underline
              cursor-pointer
            "
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;