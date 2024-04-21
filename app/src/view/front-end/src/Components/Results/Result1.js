import React, {useState} from 'react';
import './Result1.css'
import Chart from "react-apexcharts"
import { Link } from 'react-router-dom';


function Result1()
{

    const [title, setTitle] = useState("Youtube title");
    const [PositiveValue2, setPositiveValue2] = useState(34);
    const [NeutralValue2, setNeutralValue2] = useState(33);
    const [NegativeValue2, setNegativeValue2] = useState(33); 

    function VideoAnalysis(thisUrl){
        /**Để phần set giá trị vô đây, call hàm này trong return bên dưới để nó update cái bảng */
        setTitle("title");
        setPositiveValue2(0);
        setNeutralValue2(0);
        setNegativeValue2(0); 
    };


    const videotitle = ['Video title 1', 'Video title 2', 'Video title 3']

    return(
        <div className='Container'>
                    <Chart
                        type='bar'
                        width={1600}
                        height={560}
                        series={[
                            {
                                name: "Negative",
                                data: [0.45, 0.4, 0.5],
                                color: "rgba(200,0,0)",
                            },
                            {
                                name: "Neutral",
                                data: [0.125, 0.178, 0.38],
                                color: "rgba(200,200,0)",
                            },
                            {
                                name: "Positive",
                                data: [0.4, 0.4, 0.11],
                                color: "rgba(50,200,0)"
                            }
                        ]}
                
                        options={{
                            title:{
                                text:"Youtube videos analysis",
                                style: {
                                    fontSize: "30px",
                                }
                            },
                            chart:{
                                stacked:true,
                            },
                            plotOptions:{
                                bar:{
                                    horizontal:true
                                }
                            },
                            yaxis:{
                                title:{
                                    text: "Youtube video titles",
                                    style:{
                                        fontSize: "15px",
                                    }
                                },
                            },
                            xaxis:{
                                title:{
                                    text: "Values",
                                    style: {
                                        fontSize: "15px",
                                    }
                                },
                                categories: videotitle,
                            },
                        }}
                    />
                </div>
        //     </React.Fragment>
        // </div>
    );
}




export default Result1



