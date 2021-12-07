import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

import {ReactSession} from 'react-client-session';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setLogin] = useState(false);
    const [id, setID] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };

        fetch('http://localhost:3060/authentication/login/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((response) => {
            console.log('logged in');
            let req = response.json()
            console.log(req)
            return req
        }).then((req) => {
            console.log(req)
            if (req !== 'success') {
                console.log('og im id', req.user_id)
                console.log('og im name', req.username)
                setID(req.user_id);
                setLogin(true);
                ReactSession.set("username", req.username);
                ReactSession.set("userid", req.user_id);
            }
        })
    }

    if (loggedin === true && id !== " ") {
        return <Navigate push to={{
            pathname: `/profile/${id}`
          }}
        />
    }
  
  return (
    <div className="login">
        <div class="welcome">
            <h1>Login</h1> 
        </div>
        <form onSubmit={handleSubmit.bind(this)}>
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input
                      class="form-control"
                      type="text"
                      id="username"
                      name="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                  />
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input
                      class="form-control"
                      type="password"
                      id="password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button class="btn btn-success">Login</button>
          </form>
    </div>
  );
}

export default Login;