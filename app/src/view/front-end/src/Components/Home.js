import styles from './Home.module.css';
import pictonamu from './Assets/pictonamu.jpg';
import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

function Home() {


    return (
        <div className={styles.main}>
            <Navbar minimal={false} />
            <div className={styles.flexDivider}>
                <div className={styles.container}>
                    <h1>Sentiment Analysis<br />Made Simple!</h1>
                    <h4>Yoo cool slogan here</h4>
                    <br />
                    <Link to="/dashboard" className={styles.ctaButton}>Get started</Link>
                </div>
                {/* <img src={pictonamu} alt="cool" className={styles.pictonamu}/> */}
            </div>
        </div>
    )



}


export default Home