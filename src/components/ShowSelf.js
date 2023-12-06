import { useNavigate } from "react-router-dom"
import '../styles/showSelf.scss'
import fav from '../assets/fav.png'
import star from '../assets/star.png'
import { useParams } from 'react-router-dom'
const ShowSelf = ({ className, show }) => {
    const { page: currentPage } = useParams()
    const { id, name, image, rating, premiered } = show
    let validPremieredDate = premiered.slice(0, 4)
    const { original } = image
    const { average } = rating
    const navigate = useNavigate()
    function clickHandler() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        navigate(`/shows/${show.id}/${currentPage}`)

    }
    return <div onClick={clickHandler} key={id} className={`show-self-container ${className !== undefined && className}`}>
        <img src={original} alt={name} className="show-img" />
        <div className="title-box">
            <span style={{ color: "white" }}>{name}</span>
        </div>
        <div className="action-box">
            <span id='date'>{validPremieredDate}</span>
            <div id='f-r'>
                <img src={fav} alt="favorite" id='fav' />
                <span><img src={star} alt="star" />{average}</span>
            </div>
        </div>
    </div>
}
export default ShowSelf