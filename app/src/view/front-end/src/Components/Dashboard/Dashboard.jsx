import styles from './Dashboard.module.css'
import Navbar from '../Navbar/Navbar'

import { useState } from 'react'
import ChartSental from './ChartSental'

export default function Dashboard() {
    const [value, setValue] = useState('')
    const [name, setName] = useState('')

    const [list, setList] = useState([])

    function add() {
        console.log(value)
        if (value.length !== 0) {
            // get title, author and thumbnail and setList
            setList(prev => [...prev, {
                title: value,
                author: 'Mr.Beast',
                thumbnail: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'
            }])
            setValue('')
        }
    }

    function sental() {
        if (list.length !== 0) {
            // send analysis
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
                                    <p>{item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.divider}></div>
                {name.length !== 0 ?
                    <>
                        <h1>Semantic analysis for {name}</h1>
                        <ChartSental />
                    </> : null
                }
            </div>
        </div>
    )
}
