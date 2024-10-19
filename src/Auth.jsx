
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import AdminDashboard from './sections/AdminDashboard';

// // const API_URL = 'http://localhost:8000/api/auth';

// // const Auth = () => {
// //   const [token, setToken] = useState(localStorage.getItem('token') || '');
// //   const [storedEmail, setStoredEmail] = useState(localStorage.getItem('email') || '')
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [registeredEmail, setRegisteredEmail] = useState('');
// //   const [currentView, setCurrentView] = useState('signin');
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [newPassword, setNewPassword] = useState('');

// //   useEffect(() => {
// //     const verifyToken = async () => {
// //       if (token) {
// //         try {
// //           await axios.post(`${API_URL}/protected`, { token });
// //           setIsAuthenticated(true);
// //           setCurrentView('hello');
// //         } catch (error) {
// //           console.error('Token verification failed:', error);
// //           setIsAuthenticated(false);
// //           localStorage.removeItem('token');
// //           setToken('');
// //         }
// //       }
// //     };

// //     verifyToken();
// //   }, [token]);

// //   const handleRegister = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${API_URL}/signup`, { name, email, password });
// //       setRegisteredEmail(email);
// //       setCurrentView('verify');
// //     } catch (error) {
// //       alert(error.response?.data?.msg || 'Registration failed');
// //     }
// //   };

// //   const handleVerify = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${API_URL}/verify-email`, { email: registeredEmail, otp });
// //       setCurrentView('signin');
// //     } catch (error) {
// //       alert(error.response?.data?.msg || 'Verification failed');
// //     }
// //   };

// //   const handleSignIn = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(`${API_URL}/signin`, { email, password });
// //       const newToken = response.data.token;
// //       localStorage.setItem('token', newToken);
// //       localStorage.setItem('email' , email)
// //       setToken(newToken);
// //       setIsAuthenticated(true);
// //       setCurrentView('hello');
// //     } catch (error) {
// //       alert(error.response?.data?.msg || 'Sign in failed');
// //     }
// //   };

// //   const handleSignOut = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('email')

// //     setToken('');
// //     setStoredEmail('')
// //     setIsAuthenticated(false);
// //     setCurrentView('signin');
// //   };

// //   const handleForgotPassword = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${API_URL}/forgot-password`, { email });
// //       setCurrentView('resetPassword');
// //     } catch (error) {
// //       alert(error.response?.data?.msg || 'Failed to send reset OTP');
// //     }
// //   };

// //   const handleResetPassword = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
// //       alert('Password reset successful. Please sign in with your new password.');
// //       setCurrentView('signin');
// //     } catch (error) {
// //       alert(error.response?.data?.msg || 'Password reset failed');
// //     }
// //   };

// //   const renderView = () => {
// //     switch (currentView) {
// //       case 'register':
// //         return (
// //           <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
// //             <h2 style={{ textAlign: 'center' }}>Register</h2>
// //             <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
// //               <input
// //                 type="text"
// //                 placeholder="Name"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'black', border: 'none' }}>
// //                 Register
// //               </button>
// //             </form>
// //             <button onClick={() => setCurrentView('signin')} style={{ marginTop: '10px', padding: '5px', backgroundColor: '#28a745', color: 'black', border: 'none' }}>
// //               Back to Sign In
// //             </button>
// //           </div>
// //         );
// //       case 'verify':
// //         return (
// //           <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
// //             <h2 style={{ textAlign: 'center' }}>Verify Email</h2>
// //             <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column' }}>
// //               <input
// //                 type="text"
// //                 placeholder="Enter OTP"
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'black', border: 'none' }}>
// //                 Verify
// //               </button>
// //             </form>
// //           </div>
// //         );
// //       case 'signin':
// //         return (
// //           <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
// //             <h2 style={{ textAlign: 'center' }}>Sign In</h2>
// //             <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column' }}>
// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'black', border: 'none' }}>
// //                 Sign In
// //               </button>
// //             </form>
// //             <button onClick={() => setCurrentView('register')} style={{ margin: '15px', padding: '5px', backgroundColor: '#28a745', color: 'black', border: 'none' }}>
// //               Register
// //             </button>
// //             <button onClick={() => setCurrentView('forgotPassword')} style={{ margin: '10px', padding: '5px', backgroundColor: '#dc3545', color: 'black', border: 'none' }}>
// //               Forgot Password
// //             </button>
// //           </div>
// //         );
// //       case 'hello':
// //         return (
// //         //   <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
// //         //     <h2>Hello, User!</h2>
// //         //     <p>You are now signed in.</p>
// //         //     <button 
// //         //       onClick={handleSignOut}
// //         //       style={{ margin: '10px 0', padding: '5px', backgroundColor: '#dc3545', color: 'black', border: 'none' }}
// //         //     >
// //         //       Sign Out
// //         //     </button>
// //         //   </div>
// //         <AdminDashboard></AdminDashboard>
// //         );
// //       case 'forgotPassword':
// //         return (
// //           <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
// //             <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>
// //             <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column' }}>
// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'black', border: 'none' }}>
// //                 Send Reset OTP
// //               </button>
// //             </form>
// //             <button onClick={() => setCurrentView('signin')} style={{ marginTop: '10px', padding: '5px', backgroundColor: '#28a745', color: 'black', border: 'none' }}>
// //               Back to Sign In
// //             </button>
// //           </div>
// //         );
// //       case 'resetPassword':
// //         return (
// //           <div style={{ maxWidth: '300px', margin: '0 auto', padding: '20px' }}>
// //             <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
// //             <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column' }}>
// //               <input
// //                 type="text"
// //                 placeholder="Enter OTP"
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <input
// //                 type="password"
// //                 placeholder="New Password"
// //                 value={newPassword}
// //                 onChange={(e) => setNewPassword(e.target.value)}
// //                 style={{ margin: '10px 0', padding: '5px' }}
// //               />
// //               <button type="submit" style={{ margin: '10px 0', padding: '5px', backgroundColor: '#007bff', color: 'black', border: 'none' }}>
// //                 Reset Password
// //               </button>
// //             </form>
// //           </div>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div style={{ fontFamily: 'Arial, sans-serif' }}>
// //       {renderView()}
// //     </div>
// //   );
// // };

// // export default Auth;


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Label } from "@/components/ui/label"
// import { UserPlus, LogIn, KeyRound, Mail, Lock, User, Send } from 'lucide-react'
// import {  useNavigate } from 'react-router-dom'

// const API_URL = 'http://localhost:8000/api/auth'

// export default function Auth() {
//   const [token, setToken] = useState(localStorage.getItem('token') || '')
//   const [storedEmail, setStoredEmail] = useState(localStorage.getItem('email') || '')
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [registeredEmail, setRegisteredEmail] = useState('')
//   const [currentView, setCurrentView] = useState('signin')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [otp, setOtp] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const navigate = useNavigate();
//   useEffect(() => {
//     const verifyToken = async () => {
//       if (token) {
//         try {
//           await axios.post(`${API_URL}/protected`, { token })
//           setIsAuthenticated(true)
//           setCurrentView('hello')
//         } catch (error) {
//           console.error('Token verification failed:', error)
//           setIsAuthenticated(false)
//           localStorage.removeItem('token')
//           setToken('')
//         }
//       }
//     }

//     verifyToken()
//   }, [token])

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     try {
//       await axios.post(`${API_URL}/signup`, { name, email, password })
//       setRegisteredEmail(email)
//       setCurrentView('verify')
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Registration failed')
//     }
//   }

//   const handleVerify = async (e) => {
//     e.preventDefault()
//     try {
//       await axios.post(`${API_URL}/verify-email`, { email: registeredEmail, otp })
//       setCurrentView('signin')
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Verification failed')
//     }
//   }

//   const handleSignIn = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post(`${API_URL}/signin`, { email, password })
//       const newToken = response.data.token
//       localStorage.setItem('token', newToken)
//       localStorage.setItem('email', email)
//       setToken(newToken)
//       setIsAuthenticated(true)
//       setCurrentView('hello')
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Sign in failed')
//     }
//   }

//   const handleSignOut = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('email')
//     setToken('')
//     setStoredEmail('')
//     setIsAuthenticated(false)
//     setCurrentView('signin')
//   }

//   const handleForgotPassword = async (e) => {
//     e.preventDefault()
//     try {
//       await axios.post(`${API_URL}/forgot-password`, { email })
//       setCurrentView('resetPassword')
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Failed to send reset OTP')
//     }
//   }

//   const handleResetPassword = async (e) => {
//     e.preventDefault()
//     try {
//       await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword })
//       alert('Password reset successful. Please sign in with your new password.')
//       setCurrentView('signin')
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Password reset failed')
//     }
//   }

//   const renderView = () => {
//     switch (currentView) {
//       case 'register':
//         return (
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Register</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleRegister} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input id="name" type="text" icon={<User className="w-4 h-4" />} value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" icon={<Mail className="w-4 h-4" />} value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input id="password" type="password" icon={<Lock className="w-4 h-4" />} value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <Button type="submit" className="w-full">Register</Button>
//               </form>
//               <Button variant="link" onClick={() => setCurrentView('signin')} className="mt-4 w-full">Back to Sign In</Button>
//             </CardContent>
//           </Card>
//         )
//       case 'verify':
//         return (
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Verify Email</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleVerify} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="otp">Enter OTP</Label>
//                   <Input id="otp" type="text" icon={<KeyRound className="w-4 h-4" />} value={otp} onChange={(e) => setOtp(e.target.value)} />
//                 </div>
//                 <Button type="submit" className="w-full">Verify</Button>
//               </form>
//             </CardContent>
//           </Card>
//         )
//       case 'signin':
//         return (
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Sign In</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSignIn} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" icon={<Mail className="w-4 h-4" />} value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input id="password" type="password" icon={<Lock className="w-4 h-4" />} value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <Button type="submit" className="w-full">Sign In</Button>
//               </form>
//               <div className="flex justify-between mt-4">
//                 <Button variant="link" onClick={() => setCurrentView('register')}>Register</Button>
//                 <Button variant="link" onClick={() => setCurrentView('forgotPassword')}>Forgot Password</Button>
//               </div>
//             </CardContent>
//           </Card>
//         )
//       case 'hello':
//        navigate('/dashboard')
//       case 'forgotPassword':
//         return (
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Forgot Password</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleForgotPassword} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" icon={<Mail className="w-4 h-4" />} value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <Button type="submit" className="w-full">Send Reset OTP</Button>
//               </form>
//               <Button variant="link" onClick={() => setCurrentView('signin')} className="mt-4 w-full">Back to Sign In</Button>
//             </CardContent>
//           </Card>
//         )
//       case 'resetPassword':
//         return (
//           <Card className="w-[350px]">
//             <CardHeader>
//               <CardTitle>Reset Password</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleResetPassword} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" icon={<Mail className="w-4 h-4" />} value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="otp">Enter OTP</Label>
//                   <Input id="otp" type="text" icon={<KeyRound className="w-4 h-4" />} value={otp} onChange={(e) => setOtp(e.target.value)} />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newPassword">New Password</Label>
//                   <Input id="newPassword" type="password" icon={<Lock className="w-4 h-4" />} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                 </div>
//                 <Button type="submit" className="w-full">Reset Password</Button>
//               </form>
//               <Button variant="link" onClick={() => setCurrentView('signin')} className="mt-4 w-full">Back to Sign In</Button>
//             </CardContent>
//           </Card>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-black dark:bg-black">
//       <div className="w-full max-w-sm p-4">
//         <Card className="white shadow-xl ring-1 ring-black/10">
//           <CardHeader>
//             <CardTitle className="text-black">Sign In</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {renderView()}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/auth';

export default function Auth() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [storedEmail, setStoredEmail] = useState(localStorage.getItem('email') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [currentView, setCurrentView] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

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
      localStorage.setItem('email', email);
      setToken(newToken);
      setIsAuthenticated(true);
      setCurrentView('hello');
    } catch (error) {
      alert(error.response?.data?.msg || 'Sign in failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken('');
    setStoredEmail('');
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
          <Card className="bg-gray-200 shadow-xl ring-1 ring-black/10">
            <CardHeader>
              <CardTitle className="text-black">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    icon={<User className="w-4 h-4" />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <Button type="submit" className="w-full">Register</Button>
              </form>
              <Button variant="link" onClick={() => setCurrentView('signin')} className="mt-4 w-full">Back to Sign In</Button>
            </CardContent>
          </Card>
        );
      case 'verify':
        return (
          <Card className="bg-gray-200 shadow-xl ring-1 ring-black/10">
            <CardHeader>
              <CardTitle className="text-black">Verify Email</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-black">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    icon={<KeyRound className="w-4 h-4" />}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <Button type="submit" className="w-full">Verify</Button>
              </form>
            </CardContent>
          </Card>
        );
      case 'signin':
        return (
          <Card className="bg-gray-200 shadow-xl ring-1 ring-black/0">
            <CardHeader>
              <CardTitle className="text-black">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-black">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
              <div className="flex justify-between mt-4">
                <Button variant="link" onClick={() => setCurrentView('register')}>Register</Button>
                <Button variant="link" onClick={() => setCurrentView('forgotPassword')}>Forgot Password</Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'hello':
        navigate('/websitedashboard');
        return null; // Prevent rendering the card in this case
      case 'forgotPassword':
        return (
          <Card className="bg-gray-200 shadow-xl ring-1 ring-black/10">
            <CardHeader>
              <CardTitle className="text-black">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <Button type="submit" className="w-full">Send OTP</Button>
              </form>
              <Button variant="link" onClick={() => setCurrentView('signin')} className="mt-4 w-full">Back to Sign In</Button>
            </CardContent>
          </Card>
        );
      case 'resetPassword':
        return (
          <Card className="bg-gray-200 shadow-xl ring-1 ring-black/10">
            <CardHeader>
              <CardTitle className="text-black">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-black">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    icon={<KeyRound className="w-4 h-4" />}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-black">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    icon={<Lock className="w-4 h-4" />}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="white text-black"
                  />
                </div>
                <Button type="submit" className="w-full">Reset Password</Button>
              </form>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-4">
        {renderView()}
      </div>
    </div>
  );
}
