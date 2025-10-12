import { useState } from "react";
import type { FormEvent } from "react";
import "./Login.css";

interface LoginErrors {
  email?: string;
  password?: string;
}
interface LoginProps {
  setUid: (uid: string) => void;
}
function Login({ setUid }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<LoginErrors>({});

    const validate = () => {
            const newErrors: LoginErrors = {};
            if (!email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(email) || /[A-Z]/.test(email)) {
                newErrors.email = "Email is invalid";
            } else if (!localStorage.getItem(email)) {
                newErrors.email = "Email is not registered";
            }
            if (!password) {
                newErrors.password = "Password is required";
            } else if (password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            } else {
                const storedUser = localStorage.getItem(email);
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    if (user.password !== password) {
                        newErrors.password = "Incorrect password";
                    }
                }
            }
            return newErrors;
        };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const validationErrors = validate();
            if (Object.keys(validationErrors).length === 0) {
                
                // Clear form fields
                alert("Login successful!");
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
        Don't have an account? <button onClick={()=>setUid("reg")}>Register now</button>
      </p>
    </div>
  );
}

export default Login;
