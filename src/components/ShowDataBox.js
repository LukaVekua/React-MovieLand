import star from '../assets/star.png'
import ShowCast from './ShowCast'
import play from '../assets/play-btn.png'
import plus from '../assets/plus.png'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../store/store'

const ShowDataBox = ({ cast, showData }) => {
    const dispatch = useDispatch()
    const {
        name,
        rating,
        summary,
        genres,
        averageRuntime: duration,
        premiered,
        ended,
    } = showData
    const { favouriteShows, isAuthenticated } = useSelector(state => state.auth)
    let isFavourite = false
    if (favouriteShows.find(favShow => favShow.id === showData.id) !== undefined) {
        isFavourite = true
    }

    function addListHandler() {
        if (!isAuthenticated) {
            alert("please sign in with demo account(which is shown in sign-in form) so you can add movies to favourites");
        } else {
            dispatch(authActions.addToFavourite({ show: showData }))
        }
    }
    const correctedSummary = summary.slice(3, summary.length - 4)
    const correctedPremiered = premiered.slice(0, 4)
    const correctedEnded = ended !== null ? ended.slice(0, 4) : 'Currently'
    return <div className="show-data-box my-list" >
        <div className='imbd-genre-box'>
            <h2 id='title'>{name}</h2>
            <div>
                <span id='rating'><img src={star} alt='star' />{rating.average}</span>
                {genres.map(genre => <span key={genre}>{genre}</span>)}
            </div>
        </div>
        <div id='det'>
            <span id='years'>{correctedPremiered} - {correctedEnded}</span>
            <span id='duration'>Duration: {duration} min</span>
        </div>
        <p id='description'>{correctedSummary}</p>
        {cast && <ShowCast cast={cast} />}
        <div id='btns'>
            <button id='show-later-btn'><img src={play} alt='play' />WATCH</button>
            {!isFavourite && < button onClick={addListHandler} id='add-list-btn'><img src={plus} alt='plus' /> ADD LIST</button>}
        </div>
    </div >
}
export default ShowDataBox