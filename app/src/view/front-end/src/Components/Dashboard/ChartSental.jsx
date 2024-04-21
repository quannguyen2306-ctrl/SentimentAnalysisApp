import Chart from "react-apexcharts"
import styles from './ChartSental.module.css'
import useWindowDimensions from '../../Hooks/useWindowDimensions'
import { useEffect } from "react";

export default function ChartSental({ predictions }) {
    const videotitle = predictions.map(item => item.title)

    const { height, width } = useWindowDimensions();
    const seriesData = predictions.map(dataPoint => [
        dataPoint.predictions.POS,
        dataPoint.predictions.NEU,
        dataPoint.predictions.NEG
    ]);
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }, [])

    return (
        <div className={styles.container}>
            <Chart
                type='bar'
                width={width - 200}
                height={560}
                series={[
                    {
                        name: "Positive",
                        data: seriesData.map(data => data[0]),
                        color: "rgb(42, 185, 61)"
                    },
                    {
                        name: "Neutral",
                        data: seriesData.map(data => data[1]),
                        color: "rgb(214, 202, 27)",
                    },
                    {
                        name: "Negative",
                        data: seriesData.map(data => data[2]),
                        color: "rgb(197, 40, 40)",
                    },
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
