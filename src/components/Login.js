import { Link, useNavigate } from 'react-router-dom'
import Warning from './Warning'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store/store'
import { useEffect, useReducer } from 'react'
const initialUser = {
    name: '',
    password: ''
}
function loginReducer(state, action) {
    if (action.aim === 'name') return {
        ...state,
        name: action.value
    }
    if (action.aim === 'password') return {
        ...state,
        password: action.value
    }
    if (action.aim === 'restore') return initialUser
}
const Login = () => {
    const navigate = useNavigate()
    const [user, dispatchUser] = useReducer(loginReducer, initialUser)
    const { name, password } = user
    const { isWrong } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isWrong === true) {
            setTimeout(() => {
                dispatch(authActions.fadeWarning())
            }, 1500)
        }
        if (isWrong === false) {
            navigate('/shows/69/1')
        }
    }, [isWrong])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatchUser({ aim: 'restore' })
        dispatch(authActions.login({
            name,
            password
        }))

    }
    return <form onSubmit={submitHandler} className='login-box'>
        {isWrong === true && <Warning>
            Please, use already created testing account for signing in.
        </Warning>}
        <header>
            <h2>Sign In</h2>
        </header>
        <div className='inputs'>
            <div className="input-box">
                <span>Username</span>
                <input required type='text' value={name} name='username' onChange={(e) => {
                    dispatchUser({ aim: 'name', value: e.target.value })
                }} />
            </div>
            <div className="input-box">
                <span>Password</span>
                <input required type='password' value={password} name='password' onChange={(e) => {
                    dispatchUser({ aim: 'password', value: e.target.value })
                }} />
            </div>
        </div>
        <div className='login-actions'>
            <button>Sign in</button>
            <div className="corrections">
                <div>
                    <input id='remember' type='checkbox' />
                    <label htmlFor='remember'>Remember Me</label>
                </div>
                <a>Need help?</a>
            </div>
        </div>
        <footer>
            <h3>New to Movieland? <Link to='/register/null/1'>Sign up now</Link>.</h3>
            <span className='footer-span'>This page is protected by methugsonik to ensure you're not a bot. Learn more.</span>
            <div className='test-info'>
                <span className='test-acc'>Test Acc:</span>
                <span className='test-acc'>Username: test</span>
                <span className='test-acc'>Password: test123</span>
            </div>
        </footer>
    </form>
}
export default Login