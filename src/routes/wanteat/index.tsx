import { Button } from "antd-mobile"
import { Link } from "react-router-dom"
import './index.css'
export default () => {
    return (
        <>
            <div className='wanteat-row'>
                <Link to="/nohotfood">
                    <Button className='wanteat-btn wanteat-btn1'>不辣套餐</Button>
                </Link>
                <Link to="/hotfood">
                    <Button className='wanteat-btn wanteat-btn2'>辣味套餐</Button>
                </Link>
                <Link to="/noodle">
                    <Button className='wanteat-btn wanteat-btn3'>特色面食</Button>
                </Link>
                <Link to="/rice">
                    <Button className='wanteat-btn wanteat-btn4'>特色饭食</Button>
                </Link>
                <Link to="/japanesefood">
                    <Button className='wanteat-btn wanteat-btn5'>日式料理</Button>
                </Link>
            </div>
            <div>
                <ul className="notes">
                    <li>请选择下周你最想吃的菜品</li>
                    <li>每人每周仅能选择一个类别提交，且只有一次</li>
                </ul>
            </div>
        </>
    )
}
