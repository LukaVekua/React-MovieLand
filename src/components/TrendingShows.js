import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '../styles/trending.scss'
import GenresSlider from './GenresSlider'
import trending from '../assets/trend.png'
import { useQuery } from '@tanstack/react-query'
import { fetchTrendings } from '../asyncFns/AsyncCollection'
import ShowSelf from './ShowSelf'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showActions } from '../store/store';
import hot from '../assets/trending.png'
import checked from '../assets/check.png'
import plus from '../assets/mini-plus.png'
const TrendingShows = () => {
    const dispatch = useDispatch()
    const { initialTrendingShows, trendingShows } = useSelector(state => state.show)
    const { data, isLoading } = useQuery({
        queryKey: ['trending-shows'],
        queryFn: fetchTrendings
    })
    useEffect(() => {
        if (!isLoading) {
            dispatch(showActions.fitTrends(data))
        }
    }, [data])
    return <div className='trending-container'>
        <header className='trending-header'>
            <h2> <img src={trending} alt='trending' />Trends Now</h2>
            <span><img src={hot} alt='hot' />Popular</span>
            <span><img src={checked} alt='checked' />Premieres</span>
            <span><img src={plus} alt='plus' />Recently Added</span>
        </header>
        <GenresSlider specialPurpose={true} />
        {isLoading && <p>Loading...</p>}
        {!isLoading && <Swiper
            modules={[Navigation]}
            navigation={true}
            slidesPerView={5}
            spaceBetween={30}
            className='trendings-swiper'
        >
            {trendingShows.length !== 0 && trendingShows.map(show => <SwiperSlide className='trending-swiper-slide'>
                <ShowSelf className={'swiper-show'} show={show} />
            </SwiperSlide>)}
            {trendingShows.length === 0 && initialTrendingShows.map(show => <SwiperSlide className='trending-swiper-slide'>
                <ShowSelf className={'swiper-show'} show={show} />
            </SwiperSlide>)}
        </Swiper>
        }
    </div >
}
export default TrendingShows