import '../styles/warning.scss'
import warning from '../assets/warning.png'
const Warning = ({ children }) => {
    return <div className='warning'>
        <img src={warning} alt='warning' />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{children}</span>
            <span>See details below.</span>
        </div>
    </div>
}
export default Warning