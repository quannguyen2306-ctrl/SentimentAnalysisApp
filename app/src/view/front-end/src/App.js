import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Auth from './Components/Auth/Auth'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard/Dashboard';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin, GoogleLoginButton  } from '@react-oauth/google';

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    }).then(res => {
                    }).catch(err => {
                        console.error('Failed to fetch profile:', err.statusText);
                        setUser(null)
                        localStorage.removeItem('user');
                    })
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        fetchProfile();
    }, [user]);

    return (


        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={user !== null ? <Dashboard /> : <Navigate to="/authentication" replace />} />
                {/* <Route path='/Results/Result1' element={<Result1 />} />
                <Route path='/Results/Result2' element={<Result2 />} /> */}
                <Route path='/authentication' element={user !== null ? <Navigate to="/" replace /> : <Auth setUser={setUser} />} />
                {/* <Route path='/Option' element={<Option />} /> */}
            </Routes>
        </Router>


    );
}


export default App;








