import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (isSignup) {
      if (
        fullName.trim() === "" ||
        username.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
      ) {
        alert("Please fill all fields");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            fullName,
            username,
            email,
            password,
          }
        );

        alert(response.data.message);

        setIsSignup(false);
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");

      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Signup Failed"
        );
      }

    } else {

      if (username.trim() === "" || password.trim() === "") {
        alert("Please enter Username and Password");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            username,
            password,
          }
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        alert("Login Successful");

        onLogin();

      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Login Failed"
        );
      }
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    boxSizing: "border-box",
  };

    return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#1d4ed8,#06b6d4)",
      }}
    >
      <div
        style={{
          width: "430px",
          padding: "40px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(18px)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>⚡ LT Line Monitoring</h1>

        <h2>{isSignup ? "Create Account" : "Login"}</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={() => setShowPassword(!showPassword)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            background: "#00c853",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

                <p style={{ marginTop: "20px" }}>
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>

        <button
          onClick={() => {
            setIsSignup(!isSignup);

            setFullName("");
            setUsername("");
            setEmail("");
            setPassword("");
          }}
          style={{
            background: "none",
            border: "none",
            color: "#FFD54F",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isSignup ? "Login Here" : "Sign Up Here"}
        </button>

      </div>
    </div>
  );
}

export default Login;