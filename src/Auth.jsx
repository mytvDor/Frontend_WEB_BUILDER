
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from './sections/AdminDashboard';

const API_URL = 'http://localhost:8000/api/auth';

const Auth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [storedEmail, setStoredEmail] = useState(localStorage.getItem('email') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [currentView, setCurrentView] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          await axios.post(`${API_URL}/protected`, { token });
          setIsAuthenticated(true);
          setCurrentView('hello');
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          setToken('');
        }
      }
    };

    verifyToken();
  }, [token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/signup`, { name, email, password });
      setRegisteredEmail(email);
      setCurrentView('verify');
    } catch (error) {
      alert(error.response?.data?.msg || 'Registration failed');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/verify-email`, { email: registeredEmail, otp });
      setCurrentView('signin');
    } catch (error) {
      alert(error.response?.data?.msg || 'Verification failed');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signin`, { email, password });
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      localStorage.setItem('email' , email)
      setToken(newToken);
      setIsAuthenticated(true);
      setCurrentView('hello');
    } catch (error) {
      alert(error.response?.data?.msg || 'Sign in failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email')

    setToken('');
    setStoredEmail('')
    setIsAuthenticated(false);
    setCurrentView('signin');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/forgot-password`, { email });
      setCurrentView('resetPassword');
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to send reset OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
      alert('Password reset successful. Please sign in with your new password.');
      setCurrentView('signin');
    } catch (error) {
      alert(error.response?.data?.msg || 'Password reset failed');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'register':
        return (
          <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Register</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Register
              </button>
            </form>
            <button onClick={() => setCurrentView('signin')} style={{ marginTop: '10px', padding: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              Back to Sign In
            </button>
          </div>
        );
      case 'verify':
        return (
          <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Verify Email</h2>
            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Verify
              </button>
            </form>
          </div>
        );
      case 'signin':
        return (
          <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Sign In</h2>
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Sign In
              </button>
            </form>
            <button onClick={() => setCurrentView('register')} style={{ margin: '15px', padding: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              Register
            </button>
            <button onClick={() => setCurrentView('forgotPassword')} style={{ margin: '10px', padding: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
              Forgot Password
            </button>
          </div>
        );
      case 'hello':
        return (
        //   <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        //     <h2>Hello, User!</h2>
        //     <p>You are now signed in.</p>
        //     <button 
        //       onClick={handleSignOut}
        //       style={{ margin: '10px 0', padding: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
        //     >
        //       Sign Out
        //     </button>
        //   </div>
        <AdminDashboard></AdminDashboard>
        );
      case 'forgotPassword':
        return (
          <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
            <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Send Reset OTP
              </button>
            </form>
            <button onClick={() => setCurrentView('signin')} style={{ marginTop: '10px', padding: '5px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              Back to Sign In
            </button>
          </div>
        );
      case 'resetPassword':
        return (
          <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
            <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ margin: '10px 0', padding: '5px' }}
              />
              <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                Reset Password
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {renderView()}
    </div>
  );
};

export default Auth;