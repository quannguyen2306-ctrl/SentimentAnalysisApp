import styles from './Navbar.module.css'
import { Link } from "react-router-dom";

export default function Navbar({minimal}) {
    if (minimal) {
        return (
            <div className={styles.container}>
                <Link to="/">Logo</Link>
                <div className={styles.navbarChildren}>
                    <Link to="/">Docs</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <Link to="/">Logo</Link>
                <div className={styles.navbarChildren}>
                    <Link to="/">About us</Link>
                    <Link to="/">Docs</Link>
                    <Link to="/">Contact us</Link>
                    <Link to="/dashboard" className={styles.ctaButton}>Try now</Link>
                </div>
            </div>
        )
    }
}
