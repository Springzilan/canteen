import './index.css'
import { Button, Cascader, CascaderOption, Form, Toast } from 'antd-mobile';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { get } from '../../util/api';
import Cookies from 'js-cookie';
export default () => {


	const [noodleselector, setNoodleSelector] = useState<CascaderOption[]>([])
	const [noodleVisible, setNoodleVisible] = useState([false, false, false])
	const changeNoodleVisible = (index: number, visible: boolean) => {
		let tmp = noodleVisible.slice()
		tmp[index] = visible
		setNoodleVisible(tmp)
	}
	const [noodleaddshow, setNoodleShow] = useState(true)
	const [noodle, setnoodleItem] = useState<string[][]>([])

	const addNoodle = (x: string[]) => {
		setnoodleItem([...noodle, x])
		if (noodle.length === 2) {
			setNoodleShow(false)
		}
	}
	const change_noodle = (index: number, value: string[]) => {
		let tmp = noodle.slice()
		tmp[index] = value
		setnoodleItem(tmp)
	}

	const deleteNoodleItem = (x: number) => {
		let tmp = noodle.slice()
		tmp.splice(x, 1)
		setnoodleItem(tmp)
		setNoodleShow(true)
	}
	const [flourselector, setFlourSelector] = useState<CascaderOption[]>([])
	const [flourVisible, setFlourVisible] = useState([false, false, false])

	const changeFlourVisible = (index: number, visible: boolean) => {
		let tmp = flourVisible.slice()
		tmp[index] = visible
		setFlourVisible(tmp)
	}
	const [flouraddshow, setFlourShow] = useState(true)
	const [flour, setflourItem] = useState<string[][]>([])
	const addFlour = (x: string[]) => {
		setflourItem([...flour, x])
		if (flour.length === 2) {
			setFlourShow(false)
		}
	}
	const change_flour = (index: number, value: string[]) => {
		let tmp = flour.slice()
		tmp[index] = value
		setflourItem(tmp)
	}

	const deleteFlourItem = (x: number) => {
		let tmp = flour.slice()
		tmp.splice(x, 1)
		setflourItem(tmp)
		setFlourShow(true)
	}
	useEffect(() => {
		const getNoodleJson = async () => {
			await get<CascaderOption[]>("/static/noodles.json").then((res) => {
				console.log("res", res.data)
				setNoodleSelector(res.data)
			})
			await get<CascaderOption[]>("/static/flour.json").then((res) => {
				console.log("res", res.data)
				setFlourSelector(res.data)
			})
		}
		getNoodleJson()
	}, []);

	const nav = useNavigate();
	const onFinish = (values: any) => {
		console.log(values)
		Cookies.set('wanteat', 'yes')
		console.log(Cookies.get('wanteat'))
		Toast.show({
			content: '提交完成',
			position: 'bottom',
			afterClose: () => {
				console.log('after')
			},
		})

		nav('/')
	}
	return (
		<div>
			<div className='noodlepage-section'>
				<Form
					name='form'
					onFinish={onFinish}
					footer={
						<Button block type='submit' color='primary' size='large'>
							提交
						</Button>
					}>
					<div className='noodle-title'>面料类</div>
					<div className='noodle-selector'>
						{noodle.map((_, i) => {
							return (
								<div className='noodle-selectbox'>
									<div className='noodle-formitem'>
										<Form.Item
											valuePropName={'noodle' + i}
											onClick={() => {
												changeNoodleVisible(i, true)
											}}>
											<Cascader
												options={noodleselector}
												visible={noodleVisible[i]}
												onClose={() => {
													changeNoodleVisible(i, false)
												}}
												value={noodle[i]}
												onConfirm={(value) => {
													change_noodle(i, value)
												}}
												onSelect={(val, extend) => {
													console.log('onSelect', val, extend.items)
												}}
											>
												{items => {
													if (items.every(item => item === null)) {
														return '未选择'
													} else {
														return items.map(item => item?.label ?? '未选择')[items.length - 1]
													}
												}}
											</Cascader>
										</Form.Item>
									</div>
									<div onClick={() => deleteNoodleItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{noodleaddshow ? (<div className='noodle-add' onClick={() => addNoodle([])}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>
					<div className='noodle-title'>水煮类</div>
					<div className='noodle-selector'>
						{flour.map((_, i) => {
							return (
								<div className='noodle-selectbox'>
									<div className='noodle-formitem'>
										<Form.Item
											valuePropName={'flour' + i}
											onClick={() => {
												changeFlourVisible(i, true)
											}}>
											<Cascader
												options={flourselector}
												visible={flourVisible[i]}
												onClose={() => {
													changeFlourVisible(i, false)
												}}
												value={flour[i]}
												onConfirm={(value) => {
													change_flour(i, value)
												}}
												onSelect={(val, extend) => {
													console.log('onSelect', val, extend.items)
												}}
											>
												{items => {
													if (items.every(item => item === null)) {
														return '未选择'
													} else {
														return items.map(item => item?.label ?? '未选择')[items.length - 1]
													}
												}}
											</Cascader>
										</Form.Item>
									</div>
									<div onClick={() => deleteFlourItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{flouraddshow ? (<div className='noodle-add' onClick={() => addFlour([])}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>

				</Form>
			</div >
		</div >
	)
}
