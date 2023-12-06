import '../styles/filterHeader.scss'
import shows from '../assets/movies.png'
import serials from '../assets/film.png'
import checked from '../assets/check.png'
import search from '../assets/search.png'
import { useDispatch } from 'react-redux'
import { showActions } from '../store/store'
const ShowsFilterHeader = () => {
    const dispatch = useDispatch()
    const onSearch = (e) => {
        const word = e.target.value
        dispatch(showActions.filterByName(word))
    }
    return <header id='shows_header'>
        <h2><img src={shows} alt='shows' />Shows</h2>
        <span><img src={serials} alt='serials' />Serials</span>
        <span><img src={checked} alt='checked' />Original Series</span>
        <span><img src={search} alt='search' /><input onChange={onSearch} placeholder='Search' type='text' /></span>
    </header>
}
export default ShowsFilterHeader