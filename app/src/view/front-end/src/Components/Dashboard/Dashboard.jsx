import styles from './Dashboard.module.css'
import Navbar from '../Navbar/Navbar'
import { Audio } from 'react-loader-spinner'

import { useState } from 'react'
import axios from 'axios'
import ChartSental from './ChartSental'

export default function Dashboard() {
    const [value, setValue] = useState('')
    const [name, setName] = useState('')
    const [list, setList] = useState([])
    const [predictions, setPredictions] = useState([])
    const [loading, setLoading] = useState(false)

    async function add() {
        if (value.length !== 0) {
            try {
                const response = await axios.get(`http://localhost:8000/video?link=${value}`);
                const res = response.data
                setList(prev => [...prev, {
                    title: res.title,
                    author: res.author,
                    thumbnail: res.thumbnail,
                    link: value
                }])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setValue('')
        }
    }

    async function sental() {
        if (list.length !== 0) {
            setLoading(true)
            try {
                const fetchedResults = [];
                for (const item of list) {
                    const response = await axios.get(`http://localhost:8000/predict?link=${item.link}`);
                    fetchedResults.push({
                        predictions: response.data.predictions,
                        title: item.title,
                        author: item.author,
                        thumbnail: item.thumbnail,
                        link: item.link
                    });
                }
                setPredictions(fetchedResults)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return (
        <div className={styles.main}>
            <Navbar minimal={true} />
            <div className={styles.container}>
                <div className={styles.part1}>
                    <div>
                        <h1>Add your video/channel URL</h1>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder='Example: youtube.com'
                                onChange={e => setValue(e.target.value)}
                                value={value}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        add()
                                    }
                                }}
                            />
                            <button className={styles.search} onClick={add} style={value.length === 0 ? { opacity: 0.3 } : null}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                            </button>
                        </div>
                        <br />
                        <button onClick={sental} className={styles.ctaButton} style={list.length === 0 ? { opacity: 0.3 } : null}>Sental</button>
                    </div>
                    <div className={styles.displayList}>
                        <h1>A</h1>
                        {list.map((item, index) => (
                            <div
                                key={index}
                                className={styles.card}
                                onClick={() => setList(prev => prev.filter((_, utiIndex) => utiIndex !== index))}
                            >
                                <img src={item.thumbnail} alt={item.title} loading='lazy' />
                                <div>
                                    <p>{item.title}</p>
                                    <p>From - {item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.divider}></div>
                {predictions.length !== 0 ?
                    <>
                        <h1>Semantic analysis</h1>
                        <ChartSental predictions={predictions} />
                    </> :
                    null
                }
                {loading === true ? <div className={styles.center}>
                    <h1>Get ready to be sental wayyy</h1>
                    <Audio
                    height="50"
                    width="50"
                    radius="9"
                    color="#FFE01B"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                /></div> : null}
            </div>
        </div>
    )
}
