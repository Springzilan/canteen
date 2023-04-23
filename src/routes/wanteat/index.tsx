import { Button } from "antd-mobile"
import { Link } from "react-router-dom"

import './index.css'
export default () => {
    return (
        <div className='wanteat-row'>
            <Link to="/nohotfood">
                <Button className='wanteat-btn wanteat-btn1'>不辣套餐</Button>
            </Link>
            <Link to="/hotfood">
                <Button className='wanteat-btn wanteat-btn2'>辣味套餐</Button>
            </Link>
            <Link to="/noddle">
                <Button className='wanteat-btn wanteat-btn3'>特色面食</Button>
            </Link>
            <Link to="/rice">
                <Button className='wanteat-btn wanteat-btn4'>特色饭食</Button>
            </Link>
            <Link to="/japanesefood">
                <Button className='wanteat-btn wanteat-btn5'>日式料理</Button>
            </Link>
        </div >
    )
}
