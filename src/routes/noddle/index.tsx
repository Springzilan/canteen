import './index.css'
import { Button, Cascader, CascaderOption, Form, Toast } from 'antd-mobile';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { get } from '../../util/api';
export default () => {


	const [noddleselector, setNoddleSelector] = useState<CascaderOption[]>([])
	const [noddleVisible, setNoddleVisible] = useState([false, false, false])
	const changeNoddleVisible = (index: number, visible: boolean) => {
		let tmp = noddleVisible.slice()
		tmp[index] = visible
		setNoddleVisible(tmp)
	}
	const [noddleaddshow, setNoddleShow] = useState(true)
	const [noddle, setnoddleItem] = useState<string[][]>([])

	const addNoddle = (x: string[]) => {
		setnoddleItem([...noddle, x])
		if (noddle.length === 2) {
			setNoddleShow(false)
		}
	}
	const change_noddle = (index: number, value: string[]) => {
		let tmp = noddle.slice()
		tmp[index] = value
		setnoddleItem(tmp)
	}

	const deleteNoddleItem = (x: number) => {
		let tmp = noddle.slice()
		tmp.splice(x, 1)
		setnoddleItem(tmp)
		setNoddleShow(true)
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
		const getVegetableJson = async () => {
			await get<CascaderOption[]>("/static/noodles.json").then((res) => {
				console.log("res", res.data)
				setNoddleSelector(res.data)
			})
			await get<CascaderOption[]>("/static/flour.json").then((res) => {
				console.log("res", res.data)
				setFlourSelector(res.data)
			})
		}
		getVegetableJson()
	}, []);

	const nav = useNavigate();
	const onFinish = (values: any) => {
		console.log(values)
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
			<div className='noddle-page-section'>
				<Form
					name='form'
					onFinish={onFinish}
					footer={
						<Button block type='submit' color='primary' size='large'>
							提交
						</Button>
					}>
					<div className='noddle-title'>面料类</div>
					<div className='noddle-selector'>
						{noddle.map((_, i) => {
							return (
								<div className='noddle-selectbox'>
									<div className='noddle-formitem'>
										<Form.Item
											valuePropName={'noddle' + i}
											onClick={() => {
												changeNoddleVisible(i, true)
											}}>
											<Cascader
												options={noddleselector}
												visible={noddleVisible[i]}
												onClose={() => {
													changeNoddleVisible(i, false)
												}}
												value={noddle[i]}
												onConfirm={(value) => {
													change_noddle(i, value)
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
									<div onClick={() => deleteNoddleItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{noddleaddshow ? (<div className='noddle-add' onClick={() => addNoddle([])}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>
					<div className='noddle-title'>水煮类</div>
					<div className='noddle-selector'>
						{flour.map((_, i) => {
							return (
								<div className='noddle-selectbox'>
									<div className='noddle-formitem'>
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
						{flouraddshow ? (<div className='noddle-add' onClick={() => addFlour([])}>
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
