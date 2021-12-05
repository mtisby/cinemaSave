import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegister] = useState(false);
    const [id, setID] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, email, password };

        fetch('http://localhost:3060/authentication/register/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((response) => {
            console.log('new user added');
            let req = response.json()
            return req
        }).then((req) => {
            if (req === 'success') {
                setRegister(true);
                setID(req);
            }
        })
    }
  
    if (registered === true && id !== " ")  {
        return <Navigate push to={{
            pathname: `/profile/${id}`
          }}
        />
    }

  return (
    <div className="register">
        <div class="welcome">
            <h1>Register</h1> 
        </div>
        <form onSubmit={handleSubmit}>
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
                <label class="form-label" for="email">Email</label>
                <input
                      class="form-control"
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
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
            <button class="btn btn-success">Register</button>
        </form>
    </div>
  );
}

export default Register;