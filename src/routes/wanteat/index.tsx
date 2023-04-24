import { Button, Toast } from "antd-mobile"
import { Link } from "react-router-dom"

import './index.css'
import Cookies from "js-cookie"
export default () => {
    return (
        <div className='wanteat-row'>

            <Button onClick={() => {
                Toast.show({

                    content: <>{Cookies.get('user')}</>,
                    position: 'bottom',
                    afterClose: () => {
                        console.log('after')
                    },
                })
            }}>用户</Button>
            <Link to="/nohotfood">
                <Button className='wanteat-btn wanteat-btn1'>不辣套餐</Button>
            </Link>
            <Link to="/hotfood">
                <Button className='wanteat-btn wanteat-btn2'>辣味套餐</Button>
            </Link>
            <Link to="/noddle">
                <Button className='wanteat-btn wanteat-btn3'>水煮类</Button>
            </Link>
            <Link to="/rice">
                <Button className='wanteat-btn wanteat-btn4'>面料类</Button>
            </Link>
            <Link to="/japanesefood">
                <Button className='wanteat-btn wanteat-btn5'>日式料理</Button>
            </Link>
        </div >
    )
}
