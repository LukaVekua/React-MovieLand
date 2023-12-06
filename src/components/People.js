import { useEffect, useState } from "react"
import { client } from "../asyncFns/AsyncCollection"
import { fetchPeople } from "../asyncFns/AsyncCollection"
import { useDispatch, useSelector } from "react-redux"
import { peopleAction } from "../store/store"
import Person from "./Person"
import { useContext } from "react"
import { context } from '../store/context'
import close from '../styles/close-slide.png'
import '../styles/people.scss'

const getPeopleThunk = () => async dispatch => {
    const data = await client.fetchQuery({
        queryKey: ['people'],
        queryFn: fetchPeople
    })
    dispatch(peopleAction.deliverPeople(data))
}
const People = () => {
    const { visibility, setVisibility } = useContext(context)
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPeopleThunk())
    }, [])
    const { searchedPeople } = useSelector(state => state.people)
    function search(e) {
        e.preventDefault()
        dispatch(peopleAction.search(searchTerm))
        setSearchTerm('')
    }
    return <section className={`people-slider-${visibility ? 'visible' : 'invisible'}`}>
        <header>
            <h2>Look for your favourite actor/actress...</h2>
            <button onClick={() => setVisibility(false)}><img src={close} alt="close" /></button>
        </header>
        <form onSubmit={search} className="search-form">
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button id="search">Search</button>
        </form>
        <div className="searched-res">
            {searchedPeople === null && <p className="feedback">Search For Any Actor/Actress...</p>}
            {searchedPeople?.length === 0 && <p className="feedback">No one matches your search...</p>}
            {searchedPeople?.length > 0 && <>
                {searchedPeople.map(person => <div className="person-box" key={person.id}>
                    <Person person={person} />
                </div>)}
            </>}
        </div>
    </section>
}
export default People