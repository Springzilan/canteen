import { Link } from 'react-router-dom'
import './index.css'

export default () => {
    return (
        <>
            <div className='index-titlebox'>
                <div className='index-title'>不辣套餐</div>
            </div>
            <ul className='index-list'>
                <li>菠菜炒鸡蛋</li>
                <li>凉拌黄瓜</li>
                <li>宫保鸡丁</li>
            </ul>
            <div className="index-container">
                <Link to="/wanteat">
                    <div className="index-custom-btn index-btn-1">
                        我想要吃
                    </div>
                </Link>
                <Link to="/nextweek">
                    <div className="index-custom-btn index-btn-2">
                        下周吃啥
                    </div>
                </Link>
                <div className="index-custom-btn index-btn-3">
                    餐后点评
                </div>
                <div className="index-custom-btn index-btn-4">
                    我要反馈
                </div>
            </div>
        </ >
    )
}
