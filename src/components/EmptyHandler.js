import '../styles/empty.scss'
import { useDispatch } from 'react-redux'
import { showActions } from '../store/store'
const EmptyHandler = ({ array, text }) => {
    const dispatch = useDispatch()
    function seeAll() {
        dispatch(showActions.restartShows())
    }

    if (array.length === 0) return <div style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    }}>
        <h2 style={{
            color: 'white',
            textAlign: "center",
            fontSize: '1.5rem'
        }}>{text}</h2>
        <button onClick={seeAll} >See All</button>
    </div>
    return null
}
export default EmptyHandler
