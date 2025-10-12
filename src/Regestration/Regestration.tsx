
import { useState } from "react";
import type { FormEvent } from "react";
import "./Regestration.css"

interface Errors{
    username?: string;
    email?: string;
    password?: string;
}

interface RegestrationProps {
    setUid: (uid: string) => void;
}

function Regestration({ setUid }: RegestrationProps) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});
    

    const validate = () => {
        const newErrors: Errors = {};
        if (!username) {
            newErrors.username = "Username is required";
        }
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email) || /[A-Z]/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        else if (localStorage.getItem(email)) {
            newErrors.email = "Email is already registered";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        return newErrors;
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, proceed with submission (e.g., API call)
            console.log("Form submitted:", { username, email, password });
            alert("Registration successful!");
            const obj = {
                username: username,
                email: email,
                password: password
            }
            localStorage.setItem(email, JSON.stringify(obj));
            // Clear form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setErrors({});
            
        } else {
            // Set validation errors
            setErrors(validationErrors);
        }
    };
    return (
        <div className="regestration">
            <h2>Regestration Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Enter your user name" value={username} onChange={(e) => setUsername(e.target.value)} />
                {errors.username && <span className="error">{errors.username}</span>}
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errors.password && <span className="error">{errors.password}</span>}
                <button type="submit">Submit</button>
            </form>
             <p>Have you already registerd? <button onClick={()=>setUid("log")}>Login now</button> </p>
        </div>
    )
}

export default Regestration