import React, {useState} from 'react';
import './Result2.css'
import Chart from "react-apexcharts"
import { Link } from 'react-router-dom';


function Result2(){

    const [title, setTitle] = useState("Youtube title");
    const [PositiveValue2, setPositiveValue2] = useState(34);
    const [NeutralValue2, setNeutralValue2] = useState(33);
    const [NegativeValue2, setNegativeValue2] = useState(33); 
    const [urlInput, setUrlInput] = useState('');
    const [error, setError] = useState('');

    function VideoAnalysis(thisUrl){
        /**Để phần set giá trị vô đây, call hàm này trong return bên dưới để nó update cái bảng */
        setTitle("title");
        setPositiveValue2(0);
        setNeutralValue2(0);
        setNegativeValue2(0); 
    };

    const handleClick = () => {
        if (isValidUrl(urlInput)) {
            VideoAnalysis(10, 20, 30);
        } else {
            setError('Please enter a valid YouTube URL');
        }
    }

    const isValidUrl=(url) => {
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        return youtubeRegex.test(url);
    }

    const handleUrlInputChange = (e) => {
        const inputValue = e.target.value;
        setUrlInput(inputValue);
        if (isValidUrl(inputValue)) {
            setError('');
        } else {
            setError('Invalid YouTube URL');
        }
    };

    return(
        <div className='container-fluid'>

            <div className="ReturnBack2"><Link to ="/Option">Return to last page</Link></div>
            <div className="Status2">Status: Logged In</div>
            <Chart
                type='pie'
                width = {1000}
                height = {520}


                series={[PositiveValue2, NeutralValue2, NegativeValue2]}


                options={
                    {
                        title:{
                            text: title
                        },


                        labels:['Positive', 'Neutral', 'Negative']

                    }
                }
            >
            </Chart>
            <div className="input">   
                <input className='urlinput' type="url" placeholder="  Your Youtube URL" value={urlInput} onChange={handleUrlInputChange}/>  
                <button onClick={handleClick} className='submitbutton'> Analyze</button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )




}


export default Result2


