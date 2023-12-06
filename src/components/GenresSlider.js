import { genrez as allGenres, showActions } from '../store/store';
import '../styles/genres.scss'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { genresAction } from '../store/store';
import left from '../assets/left-arrow.png'
import right from '../assets/right-arrow.png'



const SwiperNavigationButtons = () => {
    const swiper = useSwiper()
    return <div className='swiper-actions'>
        <button onClick={() => swiper.slideNext()}><img className='icon' src={right} /></button>
        <button onClick={() => swiper.slidePrev()}><img className='icon' src={left} /></button>
    </div>
}

function updateTrends() {
    return function (dispatch, state) {
        dispatch(showActions.updateTrends(state()))
    }
}
export function restoreFilteredShows() {
    return function (dispatch, state) {
        const { genres: regularGenres } = state()
        const { genres } = regularGenres
        dispatch(showActions.filterShowsByGenres(genres))
    }
}

const GenresSlider = ({ specialPurpose }) => {
    const { genres: pickedGenres, trendingsGenres } = useSelector(state => state.genres)
    const dispatch = useDispatch()
    const onFilter = (genre) => {
        if (specialPurpose) {
            dispatch(genresAction.interactTrendingsGenres(genre))
            dispatch(updateTrends())
        } else {
            dispatch(genresAction.interactGenre(genre))
            dispatch(restoreFilteredShows())
        }
    }
    return <Swiper
        className="genres-filter"
        spaceBetween={30}
        slidesPerView={8}
    >
        {
            allGenres.map(genre => {
                let isActive = false
                if (!specialPurpose) {
                    if (pickedGenres.includes(genre)) {
                        isActive = true
                    }
                } else if (specialPurpose) {
                    if (trendingsGenres.includes(genre)) {
                        isActive = true
                    }
                }
                return <SwiperSlide
                    onClick={onFilter.bind(null, genre)}
                    className={!isActive ? 'span-inactive' : 'span-active'}
                    key={genre}>
                    {genre}
                </SwiperSlide>
            })
        }
        <SwiperNavigationButtons />
    </Swiper >
}
export default GenresSlider