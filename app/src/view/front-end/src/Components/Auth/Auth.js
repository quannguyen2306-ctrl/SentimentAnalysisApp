import styles from './Auth.module.css'
import Navbar from '../Navbar/Navbar'
import { useNavigate  } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export default function Auth({ setUser }) {
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            localStorage.setItem('user', JSON.stringify(codeResponse));
            setUser(codeResponse)
            navigate('/dashboard')
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className={styles.main}>
            <Navbar minimal={true} />
            <div className={styles.container}>
                <div className={styles.authContainer}>
                    <h1>Get ready!</h1>
                    <button onClick={login} className={styles.ctaButton}>Get authenticated 🚀</button>
                </div>
            </div>
        </div>
    )
}