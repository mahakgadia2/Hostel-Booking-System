import { useState } from "react";
import "/src/styles/auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "student" }),
      });
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      alert("Registration successful");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-brand">
          <div className="auth-brand-icon">🏠</div>
          <span className="auth-brand-name">HostelMS</span>
        </div>

        <div className="auth-heading">
          <h1>Create an account</h1>
          <p>Sign up to request a hostel room</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              className="auth-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn" type="submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <a href="/">Sign in</a>
        </div>

      </div>
    </div>
  );
}