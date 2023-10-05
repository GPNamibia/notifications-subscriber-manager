import React from 'react';
import './Login.css';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useLogin, useNotify } from 'react-admin'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const notify = useNotify();

  const login = useLogin();

  const handleLogin = () => {
    if (username && password) {
      const request = new Request('http://localhost:8000/authenticate', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });

      fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error('Invalid credentials');
          }
          return response.json();
        })
        .then(({ token }) => {
          localStorage.setItem('token', token);
          //navigating
          navigate('/user');
          return Promise.resolve();
        })
        .catch(error => {
          notify('Login failed. Please check your credentials.');
        });
    } else {
      notify('Username and password are required.');
    }
  };

  return (
    <div className="login">
      <div className="form">
        <div className="account-icon">
          <h1>EBS ODK Admin Panel</h1>
        </div>
        <div className="form-control">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="sub" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
