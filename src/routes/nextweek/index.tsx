import './index.css'
import { useState } from 'react'
import { Selector, Button, Form, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
export default () => {
    const weekList = ['周一', '周二', '周三', '周四', '周五']
    const [index, setIndex] = useState<number>(0)
    const [choose, setChoose] = useState<boolean[]>([false, false, false, false, false])
    const [food, setFood] = useState<(number | null)[]>([null, null, null, null, null, null, null, null, null])
    const nohotlist = [[{
        label: '芹菜炒肉',
        value: 0,
    },
    {
        label: '水煮鱼',
        value: 1,
    }], [{
        label: '蚝油生菜',
        value: 2,
    },
    {
        label: '蒜蓉菜心',
        value: 3,
    }], [{
        label: '菠菜炒鸡蛋',
        value: 4,
    },
    {
        label: '上汤豆苗',
        value: 5,
    }]
    ]
    const hotlist = [[
        {
            label: '辣椒炒肉',
            value: 6
        },
        {
            label: '宫保鸡丁',
            value: 7
        }], [
        {
            label: '麻婆豆腐',
            value: 8
        },
        {
            label: '辣椒炒羊肉',
            value: 9
        }], [
        {
            label: '毛血旺',
            value: 10
        },
        {
            label: '辣椒炒鸡蛋',
            value: 11
        }]
    ]
    const noddlelist = [
        {
            label: '红烧牛肉面',
            value: 12
        },
        {
            label: '酸辣粉',
            value: 13
        }
    ]
    const ricelist = [
        {
            label: '猪脚饭',
            value: 14
        }
    ]
    const japaneselist = [
        {
            label: '日式豚骨拉面',
            value: 15
        }
    ]
    const change = (index: number, value: number[]) => {
        if (index === 0 || index === 1 || index === 2) {
            setChoose([false, true, true, true, true])
        }
        if (index === 3 || index === 4 || index === 5) {
            setChoose([true, false, true, true, true])
        }
        if (index === 6) {
            setChoose([true, true, false, true, true])
        }
        if (index === 7) {
            setChoose([true, true, true, false, true])
        }
        if (index === 8) {
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
    // const history = useHistory()
    const onFinish = (_: any) => {
        console.log(food.filter(item => item !== null))
        if (index < 4) {
            setFood([null, null, null, null, null, null, null, null, null])
            setChoose([false, false, false, false, false])
            setIndex(index + 1)
        } else {
            Toast.show({
                content: '提交完成',
                position: 'bottom',
                afterClose: () => {
                    console.log('after')
                },
            })

            nav('/')
        }
    }
    // let
    return (
        <div className='nextweek-week'>
            <div className='nextweek-titleweek'>{weekList[index]}</div>
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
                        options={nohotlist[0]}
                        onChange={(arr, _) => change(0, arr)}
                    />
                    <Selector
                        value={[food[1] as number]}
                        columns={2}
                        disabled={choose[0]}
                        options={nohotlist[1]}
                        onChange={(arr, _) => change(1, arr)}
                    />
                    <Selector
                        value={[food[2] as number]}
                        columns={2}
                        disabled={choose[0]}
                        options={nohotlist[2]}
                        onChange={(arr, _) => change(2, arr)}
                    />
                </div>
                <div>
                    <div className='nextweek-title'>辣味套餐</div>
                    <Selector
                        value={[food[3] as number]}
                        columns={2}
                        disabled={choose[1]}
                        options={hotlist[0]}
                        onChange={(arr, _) => change(3, arr)}
                    />
                    <Selector
                        value={[food[4] as number]}
                        columns={2}
                        disabled={choose[1]}
                        options={hotlist[1]}
                        onChange={(arr, _) => change(4, arr)}
                    />
                    <Selector
                        value={[food[5] as number]}
                        columns={2}
                        disabled={choose[1]}
                        options={hotlist[2]}
                        onChange={(arr, _) => change(5, arr)}
                    />
                </div>
                <div>
                    <div className='nextweek-title'>特色面食</div>
                    <Selector
                        value={[food[6] as number]}
                        columns={2}
                        disabled={choose[2]}
                        options={noddlelist}
                        onChange={(arr, _) => change(6, arr)}
                    />
                </div>
                <div className='nextweek-line'>
                    <div className='nextweek-rice'>
                        <div className='nextweek-title'>特色饭食</div>
                        <Selector
                            columns={1}
                            value={[food[7] as number]}
                            disabled={choose[3]}
                            options={ricelist}
                            onChange={(arr, _) => change(7, arr)}
                        />
                    </div>
                    <div className='nextweek-ja'>
                        <div className='nextweek-title'>日式料理</div>
                        <Selector
                            columns={1}
                            value={[food[8] as number]}
                            disabled={choose[4]}
                            options={japaneselist}
                            onChange={(arr, _) => change(8, arr)}
                        /></div>
                </div>
            </Form>
        </div >
    )
}
