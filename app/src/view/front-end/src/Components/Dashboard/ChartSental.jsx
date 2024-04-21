import Chart from "react-apexcharts"
import styles from './ChartSental.module.css'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
  
export default function ChartSental() {
    const videotitle = ['Video title 1', 'Video title 2', 'Video title 3']
    
    const { height, width } = useWindowDimensions();
    return (
        <div className={styles.container}>
            <Chart
                type='bar'
                width={width - 200}
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
                  
                    chart: {
                        stacked: true,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true
                        }
                    },
                    yaxis: {
                    },
                    xaxis: {
                        title: {
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
    )
}
