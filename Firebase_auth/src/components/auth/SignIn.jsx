import React, { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignIp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [error, setError] = useState("");

    function login(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.log(error);
                setError("Sorry, couldn't find your account");
            })
    }


    return (
        <div>
            <form>
                <h2>Login</h2>
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
                <button onClick={login}>Login</button>
                {error ? <p style={{ color: "red" }}>{error}</p> : ""}
            </form>
        </div>
    );
};

export default SignIp;