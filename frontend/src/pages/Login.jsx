import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } else {
      console.error(data.detail);
      setError(data.detail);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#F4F0FF] ">
        <div className="w-full max-w-md rounded-3xl bg-white shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-[#504e51]">
              Echo Script
            </h1>

            <p className="mt-3 text-[#6B7280]">Record. Transcribe. Focus.</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="mt-8 space-y-5">
            <input
              className="w-full px-4 py-3  rounded-xl border border-gray-300 bg-white text-[#413e42] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#d1ccd2cf] transition"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="w-full px-4 py-3  rounded-xl border border-gray-300 bg-white text-[#413e42] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#d1ccd2cf] transition"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="
w-full
rounded-xl
bg-[#b5b2b6de]
py-3
font-semibold
text-xl
text-white
transition
hover:bg-[#969196]
active:scale-[0.98]
cursor-pointer
shadow-md
"
              type="submit"
            >
              Login
            </button>

            <p className="text-sm text-center text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
