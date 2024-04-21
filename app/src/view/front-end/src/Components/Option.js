import React from 'react';
import './Option.css'
import { Link } from "react-router-dom";


function Option() {
    return (
        <div>
            <div className='All'><Link to ="/Results/Result1">Analyze all of your videos</Link></div>
            <div className='One'><Link to ="/Results/Result2">Analyze a specific video</Link></div>
        </div>
    )


}


export default Option

