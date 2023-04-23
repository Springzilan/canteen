import { Link } from 'react-router-dom'
import './index.css'

export default () => {
    return (
        <>
            <div className='titlebox'>
                <div className='title'>不辣套餐</div>
            </div>
            <ul className='list'>
                <li>菠菜炒鸡蛋</li>
                <li>凉拌黄瓜</li>
                <li>宫保鸡丁</li>
            </ul>
            <div className="container">
                <Link to="/nextweek">
                    <div className="custom-btn btn-1">
                        下周吃啥
                    </div>
                </Link>
                <Link to="/wanteat">
                    <div className="custom-btn btn-2">
                        我想要吃
                    </div>
                </Link>
                <div className="custom-btn btn-3">
                    餐后点评
                </div>
                <div className="custom-btn btn-4">
                    我要反馈
                </div>
            </div>
        </ >
    )
}
