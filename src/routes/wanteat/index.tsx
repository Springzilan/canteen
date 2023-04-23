import { Button } from "antd-mobile"
import { Link } from "react-router-dom"

import './index.css'
export default () => {
    return (
        <div className='row'>
            <Link to="/nohotfood">
                <Button className='btn btn1'>不辣套餐</Button>
            </Link>
            <Link to="/nohotfood">
                <Button className='btn btn2'>辣味套餐</Button>
            </Link>
            <Link to="/noddle">
                <Button className='btn btn3'>特色面食</Button>
            </Link>
            <Link to="/rice">
                <Button className='btn btn4'>特色饭食</Button>
            </Link>
            <Link to="/japanesefood">
                <Button className='btn btn5'>日式料理</Button>
            </Link>
        </div >
    )
}
