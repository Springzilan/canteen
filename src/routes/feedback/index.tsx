import { Button, Toast } from "antd-mobile"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import './index.css'
export default () => {
    const nav = useNavigate()
    return (
        <div className="feedback">
            <Button color='primary' onClick={() => {
                Toast.show({
                    content: <>{Cookies.get('user')}</>,
                    position: 'bottom'
                })
            }}>Who am I</Button>
            <Button color="danger" onClick={() => {
                Cookies.remove('user')
                Toast.show({
                    content: '登出成功',
                    position: 'bottom'
                })
                nav('/')
            }}>登出</Button>
            <Button onClick={() => {
                Cookies.remove('wanteat')
                console.log(Cookies.get('wanteat'))
                nav('/')
            }
            }>不提交</Button>
        </div>
    )
}
