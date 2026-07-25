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
      <div className="p-3">
        <h1>Welcome Back to Echo Script</h1>
        <h2>Instant Voice to Transcript</h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="p-2 m-4 ">
            {/* <label htmlFor="username">Enter Username </label> */}
            <input
              className="border rounded p-2"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="p-2 m-4">
            {/* <label htmlFor="password">Enter Password </label> */}
            <input
              className="border rounded p-2"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" m-4 ">
            <button
              className="border rounded px-5 py-2 cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </div>
          <h2>{error}</h2>
        </form>
      </div>
    </>
  );
}

export default Login;
