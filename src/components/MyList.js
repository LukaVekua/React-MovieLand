import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import star from '../assets/star.png'
import trash from '../assets/trash-can.png'
import play from '../assets/play-buttton.png'
import home from '../assets/home.png'
import { authActions } from "../store/store"
import { useNavigate } from "react-router-dom"
const MyList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { favouriteShows } = useSelector(state => state.auth)
    function deleteHandler(id) {
        dispatch(authActions.deleteFavourite(id))
    }
    function navigateBack() {
        navigate('/shows/69/1')
    }
    return <>
        <Swiper
            modules={[Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            className="my-list"
            slidesPerView={1}
        >
            {favouriteShows.length === 0 && <SwiperSlide className="empty-list">
                <h2>Empty</h2>
                <button onClick={navigateBack} className="list-btn"><img src={home} alt="home" /></button>
            </SwiperSlide>}
            {favouriteShows.length > 0 && favouriteShows.map(favShow => {
                if(favShow){
                    const { id, genres, image, name, rating, premiered, summary, network } = favShow
                    const { original } = image
                    const { country } = network
                    const { average } = rating
                    return <SwiperSlide style={{ backgroundImage: `url(${original})` }} key={id} className="show-container slide">
                        <aside id="slide-overlay"></aside>
                        <aside className="show-details">
                            <header className="show-header">
                                <div>
                                    <h2 id="title">{name}</h2>
    
                                </div>
                                <div>
                                    {genres.map(genre => <span id="genre" key={genre}>{genre}</span>)}
                                </div>
                            </header>
                            <header>
                                <div id="extra">
                                    <span>{premiered}</span>
                                    <span><img src={star} alt="star" />{average}</span>
                                    <span>{country.name}</span>
                                </div>
                            </header>
                            <div id="deep">
                                <p>{summary}</p>
                            </div>
                            <div id="list-actions">
                                <button onClick={navigateBack} className="list-btn"><img src={home} alt="home" /></button>
                                <button className="list-btn" ><img src={play} alt="play" /></button>
                                <button className="list-btn" onClick={deleteHandler.bind(null, id)}><img src={trash} alt="trash" /></button>
                            </div>
    
                        </aside>
                    </SwiperSlide>
                }
           
            })}

        </Swiper>
    </>
}
export default MyList