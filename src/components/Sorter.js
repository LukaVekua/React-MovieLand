import '../styles/sorter.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showActions } from '../store/store'
import star from '../assets/star.png'
import useActivity from '../hooks/useActivity'
const years = []
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    .map(letter => letter.toUpperCase())
for (let i = 1999; i < 2015; i++) {
    years.push(i)
}

const Sorter = () => {
    const dispatch = useDispatch()
    const [ratingValue, setRatingValue] = useState(5.0)
    const { actives, dispatchActives } = useActivity()
    const { byLatest, byYear, byAlphabet } = actives
    function filterByLatest() {
        dispatchActives({ active: 'latest' })
        dispatch(showActions.filterShowsByLatest())
    }
    function filterByYear(e) {
        dispatchActives({ active: 'year' })
        dispatch(showActions.filterShowsByYear(e.target.value))
    }
    function filterByAlphabet(e) {
        dispatchActives({ active: 'alphabet' })
        dispatch(showActions.filterByAlphabet(e.target.value))
    }
    function filterByRating(e) {
        setRatingValue(e.target.value)
        dispatch(showActions.filterByRating(e.target.value))
    }
    return <div className='advanced-filter-container'>
        <div id='sorter-box'>
            <span id='header'>Sort by:</span>
            <button className={`filter-${!byLatest ? 'inactive' : 'active'}`} onClick={filterByLatest}>Latest</button>
            <select onChange={filterByYear} className={`year-select filter-${!byYear ? 'inactive' : 'active'}`}>
                <option value=''>Year</option>
                {years.map(year => <option value={year}>{year}</option>)}
            </select>
            <select onChange={filterByAlphabet} className={`alphabet-select filter-${!byAlphabet ? 'inactive' : 'active'}`}>
                <option value=''>A-Z</option>
                {alphabet.map(letter => <option value={letter}>{letter}</option>)}
            </select>
        </div>
        <div id='rate-box'>
            <img src={star} alt='star' />
            <input
                type='range'
                min='1'
                max='10'
                step='0.1'
                value={ratingValue}
                onChange={filterByRating}
            />
            <span style={{ color: 'white' }}>{ratingValue}</span>
        </div>
    </div >
}
export default Sorter