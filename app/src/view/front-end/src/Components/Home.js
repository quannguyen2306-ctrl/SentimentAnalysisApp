import './Home.css';
import pictonamu from './Assets/pictonamu.jpg';
import { Link } from 'react-router-dom';

function Home() {
    
    
    return(
        <div classname='thisPage'>
            <div className='pictonamu'>
                <img src={pictonamu} alt="Paris"/>
            </div>
            <div className="InsText">
                <p>This website is designed to analyze the comments from your Youtube video and sort out the feelings of users towards your content overall.</p>
            </div>
            <div className='SignIn'><Link to="/Auth/Auth">Get Started</Link></div>
        </div>
    )



}


export default Home