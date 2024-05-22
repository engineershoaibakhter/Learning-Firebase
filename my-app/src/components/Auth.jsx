import React, { useState } from 'react';
import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, provider } from '../FirebaseConfig';

function Auth() {
    const [registerData, setRegisterData] = useState({ email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleRegisterInput = (event) => {
        const { name, value } = event.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleLoginInput = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterSubmit = () => {
        if (!registerData.email || !registerData.password) {
            alert("Please fill out both fields.");
            return;
        }
        createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    const handleLoginSubmit = () => {
        if (!loginData.email || !loginData.password) {
            alert("Please fill out both fields.");
            return;
        }
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    const handleWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                alert(`Logged in as: ${user.displayName}`);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <>
            <h1>Register</h1>
            <div>
                <input type="email" placeholder="Email" name="email" onChange={handleRegisterInput} />
                <input type="password" placeholder="Password" name="password" onChange={handleRegisterInput} />
            </div>
            <div>
                <button onClick={handleRegisterSubmit}>Register</button>
            </div>

            <br />
            <br />

            <h1>Login</h1>
            <div>
                <input type="email" placeholder="Email" name="email" onChange={handleLoginInput} />
                <input type="password" placeholder="Password" name="password" onChange={handleLoginInput} />
            </div>
            <div>
                <button onClick={handleLoginSubmit}>Login</button>
            </div>

            <br />
            <br />

            <button onClick={handleWithGoogle}>Login with Google</button>
        </>
    );
}

export default Auth;
