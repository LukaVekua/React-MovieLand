import { NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useContext } from "react"
import { context } from '../store/context'
import { useDispatch } from "react-redux"
import { peopleAction } from "../store/store"
import '../styles/topNav.scss'
const TopNav = ({ page: p1 }) => {
    const { page } = useParams()
    console.log(page)
    const dispatch = useDispatch()
    const { setVisibility } = useContext(context)
    const { isAuthenticated } = useSelector(state => state.auth)
    return <nav id={p1 === 'register' && 'additional'} className={`top-nav-initial`}>
        <span id="title">MOVI<span>e</span>LAND</span>
        <div className="links">
            <> <NavLink to='/'>Home</NavLink>
                {isAuthenticated && <NavLink className={({ isActive }) => isActive && 'active'} to='/profile'>My List</NavLink>}
                {page !== undefined && <a onClick={() => {
                    dispatch(peopleAction.restorePeople())
                    setVisibility(prev => !prev)
                }}>People</a>
                }
                {!isAuthenticated && page !== 'login' && <NavLink className='reg-link' to='/login'>Sign In</NavLink>}
            </>
        </div>
    </nav>
}
export default TopNav