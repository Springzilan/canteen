import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { post } from '../../util/api';
import { WantCheckDTO } from '../../lib/model';
import { useEffect } from 'react';

export default () => {
    var wantcheck: WantCheckDTO = {
        "user": Cookies.get('user')
    }
    useEffect(() => {
        const getWantCheck = async () => {
            await post<WantCheckDTO>("/api/want_check", wantcheck).then((res) => {
                console.log("checkres", res.data)
                Cookies.set('wanteat', res.data)
            })
        }
        getWantCheck()
    }, []);
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
                    Cookies.get('wanteat') ?
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
