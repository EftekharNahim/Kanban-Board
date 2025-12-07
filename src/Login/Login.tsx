import { useState } from "react";
import type { FormEvent } from "react";
import "./Login.css";
import { api } from "@/api";
import { Link, Navigate, redirect } from "react-router";
import { useNavigate } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
  message?: string;
}


function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors>({});
   const navigate = useNavigate();
  const validate = () => {
    const newErrors: LoginErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email) || /[A-Z]/.test(email)) {
      newErrors.email = "Email is invalid";
    } 

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Retrieve user from db and setUid with user's name

      const obj = {
        email: email,
        password: password,
      };

      try {
        const res = await api.post("/login", obj);
        alert("Login succesful");
        const username = res.data.username;
        localStorage.setItem('username', username)
        navigate('/');
      } catch (error) {
        alert(error);
      }
      // Clear form
      setEmail("");
      setPassword("");
      setErrors({});
      //alert("Login successful!");
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button type="submit">Submit</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to='/register'>Register Now</Link>
      </p>
    </div>
  );
}

export default Login;
