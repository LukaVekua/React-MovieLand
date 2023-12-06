import { NavLink, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import '../styles/showList.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showActions } from '../store/store'
import AllShow from './AllShowList'
const ShowsList = () => {
    let pageQty = []
    const dispatch = useDispatch()
    const { show, genres: genresState } = useSelector(state => state)
    const { filteredShows } = show
    for (let i = 1; i < Math.ceil(filteredShows.length / 25); i++) {
        pageQty.push(i)
    }
    const { genres } = genresState
    const { id, page: currentPage } = useParams()
    const navigate = useNavigate()
    const onPageSwitch = (page) => {
        window.scrollTo({
            top: 1420,
            behavior: 'smooth'
        })
        navigate(`/shows/${id}/${page}`)
    }
    const shows = useLoaderData()
    useEffect(() => {
        dispatch(showActions.fetchShows(shows))
    }, [shows])
    return <>
        <AllShow filteredShows={filteredShows} currentPage={currentPage} />
        <div className='page-navigations'>
            {pageQty.map(page => {
                const isActive = parseInt(page) === parseInt(currentPage)
                return <span onClick={onPageSwitch.bind(null, page)} className={isActive ? 'active' : 'inactive'} key={page} > {page}</span>
            })}

        </div>
    </>
}
export default ShowsList