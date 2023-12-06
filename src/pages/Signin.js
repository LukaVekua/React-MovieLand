import '../styles/login.scss'
import TopNav from '../components/TopNav'
import Login from '../components/Login'
const Signin = () => {
    return <main id="login-main">
        <div id='login-overlay'></div>
        <TopNav page='login' />
        <Login />
    </main>
}
export default Signin