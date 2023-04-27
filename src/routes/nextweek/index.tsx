import './index.css'
import { useEffect, useState } from 'react'
import { Selector, Button, Form, Toast, SelectorOption, } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserOrderDTO, UserOrderVO } from '../../lib/model'
import { get, post } from '../../util/api'

export default () => {
    const [menu, setMenu] = useState<SelectorOption<number>[][]>([[]])
    useEffect(() => {
        const getNextWeekMenu = async () => {
            await get<SelectorOption<number>[][]>("/static/next_week_menu.json").then((res) => {
                console.log("res", res.data, res.data[0].slice(0, 2))
                setMenu(res.data)
            })
        }
        getNextWeekMenu()
    }, []);
    const weekList = ['周一', '周二', '周三', '周四', '周五']
    const [day, setDay] = useState<number>(0)
    const [choose, setChoose] = useState<boolean[]>([false, false, false, false, false])
    const [food, setFood] = useState<(number | null)[]>([null, null, null, null, null, null, null])

    const all_chose_flag = () => {
        return food.slice(0, 4).filter(item => item !== null).length !== 0
    }
    const change = (index: number, value: number[]) => {
        if (index === 0 || index === 1) {
            setChoose([false, true, true, true, true])
        }
        if (index === 2 || index === 3) {
            setChoose([true, false, true, true, true])
        }
        if (index === 4) {
            setChoose([true, true, false, true, true])
        }
        if (index === 5) {
            setChoose([true, true, true, false, true])
        }
        if (index === 6) {
            setChoose([true, true, true, true, false])
        }
        let tmp = food.slice()
        if (value.length === 1) {
            tmp[index] = value[0]
            setFood(tmp)
        } else {
            tmp[index] = null
            setFood(tmp)
            if (tmp.every(item => item === null)) {
                setChoose([false, false, false, false, false])
            }
        }
        console.log(index, value)
    }

    const nav = useNavigate()

    const onFinish = async (_: any) => {
        if (all_chose_flag() && food.filter(item => item !== null).length !== 2) {
            Toast.show({
                content: '请在该套餐中选择2种菜品',
                position: 'bottom'
            })
            return
        }
        if (food.filter(item => item !== null).length === 0) {
            Toast.show({
                content: '请至少选择一种套餐',
                position: 'bottom'
            })
            return
        }
        var order: number[] = food.filter(item => item !== null).map(item => item as number)
        const kind = choose.indexOf(false)
        if (kind < 2) (
            order.push(menu[day].slice(8, 9)[0].value)
        )
        const user = Cookies.get('user')
        const dto: UserOrderDTO = {
            user: user as string,
            day: day + 1,
            kind: kind,
            content: order
        }
        console.log(dto, '星期几', day + 1, '套餐顺序', kind, '选菜id', order, 'user', user)
        await post<UserOrderVO>("/api/order", dto).then((res) => {
            console.log("res", res.data.data)
            if (res.data.data) {
                setFood([null, null, null, null, null, null, null])
                setChoose([false, false, false, false, false])
                setDay(day + 1)
                if (day == 4) {
                    Cookies.set('nextweek', 'true')
                    Toast.show({
                        content: '提交完成',
                        position: 'bottom',
                        afterClose: () => {
                            console.log('after')
                        },
                    })
                    nav('/')
                    return
                }
                Toast.show({
                    content: weekList[day] + '提交完成',
                    position: 'bottom'
                })
            } else {
                Toast.show({
                    content: '提交失败',
                    position: 'bottom'
                })
            }

        })



    }
    return (
        <div className='nextweek-week'>
            <div className='nextweek-titleweek'>{weekList[day]}</div>
            <Form
                name='form'
                onFinish={onFinish}
                layout='horizontal'
                footer={
                    <Button block type='submit' color='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <div>
                    <div className='nextweek-title'>不辣套餐</div>
                    <Selector
                        value={[food[0] as number]}
                        columns={2}
                        disabled={choose[0]}
                        options={menu[day].slice(0, 2)}
                        onChange={(arr, _) => change(0, arr)}
                    />
                    <Selector
                        value={[food[1] as number]}
                        columns={2}
                        disabled={choose[0]}
                        options={menu[day].slice(2, 4)}
                        onChange={(arr, _) => change(1, arr)}
                    />
                </div>
                <div>
                    <div className='nextweek-title'>辣味套餐</div>
                    <Selector
                        value={[food[2] as number]}
                        columns={2}
                        disabled={choose[1]}
                        options={menu[day].slice(4, 6)}
                        onChange={(arr, _) => change(2, arr)}
                    />
                    <Selector
                        value={[food[3] as number]}
                        columns={2}
                        disabled={choose[1]}
                        options={menu[day].slice(6, 8)}
                        onChange={(arr, _) => change(3, arr)}
                    />
                </div>
                <div>
                    <div className='nextweek-title'>素菜</div>
                    <Selector
                        columns={1}
                        disabled={true}
                        value={all_chose_flag() ? [menu[day].slice(8, 9)[0].value] : []}
                        showCheckMark={all_chose_flag()}
                        options={menu[day].slice(8, 9)}
                    />
                </div>
                <div>
                    <div className='nextweek-title'>特色面食</div>
                    <Selector
                        value={[food[4] as number]}
                        columns={2}
                        disabled={choose[2]}
                        options={menu[day].slice(9, 11)}
                        onChange={(arr, _) => change(4, arr)}
                    />
                </div>
                <div className='nextweek-line'>
                    <div className='nextweek-rice'>
                        <div className='nextweek-title'>特色饭食</div>
                        <Selector
                            columns={1}
                            value={[food[5] as number]}
                            disabled={choose[3]}
                            options={menu[day].slice(11, 12)}
                            onChange={(arr, _) => change(5, arr)}
                        />
                    </div>
                    <div className='nextweek-ja'>
                        <div className='nextweek-title'>日式料理</div>
                        <Selector
                            columns={1}
                            value={[food[6] as number]}
                            disabled={choose[4]}
                            options={menu[day].slice(12, 13)}
                            onChange={(arr, _) => change(6, arr)}
                        /></div>
                </div>
            </Form>
        </div >
    )
}
