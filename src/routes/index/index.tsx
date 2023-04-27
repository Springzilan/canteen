import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { post } from '../../util/api';
import { WantCheckVO, WantCheckDTO } from '../../lib/model';
import { useEffect, useState } from 'react';

export default () => {
    useEffect(() => {
        const getWantCheck = async () => {
            console.log('tttt', Cookies.get('wanteat'))
            var wantcheck: WantCheckDTO = {
                "user": Cookies.get('user')
            }
            await post<WantCheckVO>("/api/want_check", wantcheck).then((res) => {
                console.log("checkres", res.data.data)
                Cookies.set('wanteat', res.data.data.toString())
                showCookieUpdata(res.data.data.toString())
            })
        }
        getWantCheck()
    }, []);
    const [showCookie, showCookieUpdata] = useState(Cookies.get('wanteat'))
    const nav = useNavigate()
    const submit = (value: string) => {
        Cookies.set('user', value)
        console.log('gdhggcghc', Cookies.get('user'))
        nav('/')
    }
    if (!Cookies.get('user')) {
        return (
            <>
                <div className='user'>
                    <Form
                        name="form"
                        onFinish={(value) => submit(value.user)}
                        layout='horizontal'
                        mode='card'
                        footer={
                            <Button block type='submit' color='primary' size='large' style={{ marginTop: '1rem' }}>
                                提交
                            </Button>
                        }
                    >
                        <Form.Item
                            name='user'
                            label='用户名'
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                    </Form>
                </div>
            </>)
    }
    const yesCommit = () => {
        if (Cookies.get('wanteat')) {
            Toast.show({
                content: '您已提交',
                position: 'bottom',
                afterClose: () => {
                    console.log('after')
                },
            })
        }
    }
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
                {
                    showCookie === 'true' ?
                        <div className="index-custom-btn btn-false" onClick={() => yesCommit()} >
                            我想要吃
                        </div> :
                        <Link to="/wanteat" >
                            <div className="index-custom-btn index-btn-1" >
                                我想要吃
                            </div>
                        </Link>
                }
                <Link to="/nextweek">
                    <div className="index-custom-btn index-btn-2">
                        下周吃啥
                    </div>
                </Link>
                <div className="index-custom-btn index-btn-3">
                    餐后点评
                </div>
                {
                    Cookies.get('user') === 'borber' ? <Link to="/feedback">
                        <div className="index-custom-btn index-btn-4" >
                            我要反馈
                        </div>
                    </Link> : <div className="index-custom-btn index-btn-4" >
                        我要反馈
                    </div>
                }

            </div>
        </ >
    )
}
