import { useQuery } from '@tanstack/react-query'
import fetchShows, { fetchCast } from '../asyncFns/AsyncCollection'
import '../styles/CurrentShow.scss'
import ShowDataBox from './ShowDataBox'
import { useParams } from 'react-router-dom'
import ShowLoader from './ShowLoader'
export default function CurrentShow() {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ['shows', { showId: id }],
        queryFn: ({ queryKey }) => fetchShows(queryKey[1])
    })
    const { data: cast, isLoading: castIsLoading } = useQuery({
        queryKey: ['cast', { showId: id }],
        queryFn: ({ queryKey }) => fetchCast(queryKey[1])
    })
    return <>
        {isLoading && <ShowLoader />}
        {!isLoading && !castIsLoading && < section id='current' style={{ backgroundImage: `url(${data.image.original})` }} className='show-container'>
            <div id='show-overlay'></div>

            <ShowDataBox cast={cast} showData={data} />

        </section >
        }
    </>
}