import { useState } from "react";
import { Auth } from "../auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ nickname: "", name: "", email: "", password: "" });
  const [mode, setMode] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/login" : "/api/signup";
    const data = mode === "login" ? form : signupForm;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);

      if (mode === "login") {
        Auth.login(result.user);
        window.location.href = "/dashboard"; // redirect to dashboard
      } else {
        setMode("login"); // switch back to login form
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <input placeholder="Nickname" onChange={(e) => setSignupForm({ ...signupForm, nickname: e.target.value })} />
            <input placeholder="Full Name" onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} />
          </>
        )}
        <input
          placeholder="Email"
          onChange={(e) => {
            if (mode === "login") setForm({ ...form, email: e.target.value });
            else setSignupForm({ ...signupForm, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            if (mode === "login") setForm({ ...form, password: e.target.value });
            else setSignupForm({ ...signupForm, password: e.target.value });
          }}
        />
        <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
      </form>
      <button className="toggle-btn" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        Switch to {mode === "login" ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}
