import './index.css'
import { Link } from 'react-router-dom'
export default () => {
    return (
        <div className="wscn-http404-container">
            <div>404</div>
            <Link to='/'>返回首页</Link>
        </div>
    )
}
