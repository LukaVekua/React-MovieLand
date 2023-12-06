import { useNavigate } from "react-router-dom"

const Auth = () => {
    const navigate = useNavigate()
    const registerLaterHandler = () => {
        navigate('shows/69/1')
    }
    const registerHandler = () => {
        navigate('/login')
    }
    return <div className="auth">
        <h1>Unlimited movies, TV shows, and more</h1>
        <span>Watch anywhere. Cancel anytime.</span>
        <span>Ready to watch? Navigate to shows to page or <span style={{ color: "rgba(229, 9, 20)" }}>register</span> to create  your membership.</span>
        <div>
            <button onClick={registerHandler} className="register">Sign in</button>
            <button onClick={registerLaterHandler} className='enabled' >Go to shows</button>
        </div>
    </div>
}
export default Auth