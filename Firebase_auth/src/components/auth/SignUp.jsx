import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");

    const [error, setError] = useState("");

    function register(e) {
        e.preventDefault();

        if (password !== copyPassword) {
            setError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setPassword("");
                setCopyPassword("");
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div>
            <form onSubmit={register}>
                <h2>Create Account</h2>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={copyPassword}
                    onChange={e => setCopyPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button>Create</button>
                {error ? <p style={{ color: "red" }}>{error}</p> : ""}
            </form>
        </div>
    );
};

export default SignUp;