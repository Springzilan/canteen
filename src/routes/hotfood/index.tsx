import './index.css'
import { Button, Cascader, CascaderOption, Form, Toast } from 'antd-mobile';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { get } from '../../util/api';
export default () => {

	const [bigmeatselector, setBigmeatSelector] = useState<CascaderOption[]>([])
	const [bigmeatVisible, setBigmeatVisible] = useState([false, false, false])
	const changeBigmeatVisible = (index: number, visible: boolean) => {
		let tmp = bigmeatVisible.slice()
		tmp[index] = visible
		setBigmeatVisible(tmp)
	}
	const [smallmeatselector, setSmallmeatSelector] = useState<CascaderOption[]>([])
	const [smallmeatVisible, setSmallmeatVisible] = useState([false, false, false])
	const changeSmallmeatVisible = (index: number, visible: boolean) => {
		let tmp = smallmeatVisible.slice()
		tmp[index] = visible
		setSmallmeatVisible(tmp)
	}
	const [vegetableselector, setVegetableSelector] = useState<CascaderOption[]>([])
	const [vegetableVisible, setVegetableVisible] = useState([false, false, false])
	const changeVegetableVisible = (index: number, visible: boolean) => {
		let tmp = vegetableVisible.slice()
		tmp[index] = visible
		setVegetableVisible(tmp)
	}
	useEffect(() => {
		const getVegetableJson = async () => {
			await get<CascaderOption[]>("/static/hot_big_meat.json").then((res) => {
				console.log("res", res.data)
				setBigmeatSelector(res.data)
			})
			await get<CascaderOption[]>("/static/hot_little_meat.json").then((res) => {
				console.log("res", res.data)
				setSmallmeatSelector(res.data)
			})
			await get<CascaderOption[]>("/static/vagetable.json").then((res) => {
				console.log("res", res.data)
				setVegetableSelector(res.data)
			})
		}
		getVegetableJson()
	}, []);

	const [bigaddshow, setBigShow] = useState(true)
	const [smalladdshow, setSmallShow] = useState(true)
	const [vegetableaddshow, setVegetableShow] = useState(true)

	const [bigmeat, setbigItem] = useState<string[][]>([])
	const [smallmeat, setsmallItem] = useState<string[][]>([])
	const [vegetable, setvegetableItem] = useState<string[][]>([])
	const addBig = (x: string[]) => {
		setbigItem([...bigmeat, x])
		if (bigmeat.length === 2) {
			setBigShow(false)
		}
	}
	const addSmall = (x: string[]) => {
		setsmallItem([...smallmeat, x])
		if (smallmeat.length === 2) {
			setSmallShow(false)
		}
	}
	const addVegetable = (x: string[]) => {
		setvegetableItem([...vegetable, x])
		if (vegetable.length === 2) {
			setVegetableShow(false)
		}
	}

	const change_big = (index: number, value: string[]) => {
		let tmp = bigmeat.slice()
		tmp[index] = value
		setbigItem(tmp)
	}
	const change_small = (index: number, value: string[]) => {
		let tmp = smallmeat.slice()
		tmp[index] = value
		setsmallItem(tmp)
	}
	const change_vegetable = (index: number, value: string[]) => {
		let tmp = vegetable.slice()
		tmp[index] = value
		setvegetableItem(tmp)
	}

	const deleteBigItem = (x: number) => {
		let tmp = bigmeat.slice()
		tmp.splice(x, 1)
		setbigItem(tmp)
		setBigShow(true)
	}
	const deleteSmallItem = (x: number) => {
		let tmp = smallmeat.slice()
		tmp.splice(x, 1)
		setsmallItem(tmp)
		setSmallShow(true)
	}
	const deleteVegetableItem = (x: number) => {
		let tmp = vegetable.slice()
		tmp.splice(x, 1)
		setvegetableItem(tmp)
		setVegetableShow(true)
	}
	const nav = useNavigate();
	const onFinish = (values: any) => {
		console.log(bigmeat)
		console.log(smallmeat)
		console.log('112e', vegetable)
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
			<div className='hotfood-page-section'>
				<Form
					name='form'
					onFinish={onFinish}
					footer={
						<Button block type='submit' color='primary' size='large'>
							提交
						</Button>
					}>
					<div className='hotfood-title'>大荤</div>
					<div className='hotfood-selector'>
						{bigmeat.map((_, i) => {
							return (
								<div className='hotfood-selectbox'>
									<div className='hotfood-formitem'>
										<Form.Item
											valuePropName={'bigmeat' + i}
											onClick={() => {
												changeBigmeatVisible(i, true)
											}}>
											<Cascader
												options={bigmeatselector}
												visible={bigmeatVisible[i]}
												onClose={() => {
													changeBigmeatVisible(i, false)
												}}
												value={bigmeat[i]}
												onConfirm={(value) => {
													change_big(i, value)
												}}
												onSelect={(val, extend) => {
													console.log('onSelect', val, extend.items)
												}}
											>
												{items => {
													if (items.every(item => item === null)) {
														return '未选择'
													} else {
														return items.map(item => item?.label ?? '未选择').join('-')
													}
												}}
											</Cascader>
										</Form.Item>
									</div>
									<div onClick={() => deleteBigItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{bigaddshow ? (<div className='hotfood-add' onClick={() => addBig([])}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>
					<div className='hotfood-title'>小荤</div>
					<div className='hotfood-selector'>
						{smallmeat.map((_, i) => {
							return (
								<div className='hotfood-selectbox'>
									<div className='hotfood-formitem'>
										<Form.Item
											valuePropName={'smallmeat' + i}
											onClick={() => {
												changeSmallmeatVisible(i, true)
											}}>
											<Cascader
												options={smallmeatselector}
												visible={smallmeatVisible[i]}
												onClose={() => {
													changeSmallmeatVisible(i, false)
												}}
												value={smallmeat[i]}
												onConfirm={(value) => {
													change_small(i, value)
												}}
												onSelect={(val, extend) => {
													console.log('onSelect', val, extend.items)
												}}
											>
												{items => {
													if (items.every(item => item === null)) {
														return '未选择'
													} else {
														return items.map(item => item?.label ?? '未选择').join('-')
													}
												}}
											</Cascader>
										</Form.Item>
									</div>
									<div onClick={() => deleteSmallItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{smalladdshow ? (<div className='hotfood-add' onClick={() => addSmall([])}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>
					<div className='hotfood-title'>素菜</div>
					<div className='hotfood-selector'>
						{vegetable.map((_, i) => {
							return (
								<div className='hotfood-selectbox'>
									<div className='hotfood-formitem'>
										<Form.Item
											valuePropName={'vegetable' + i}
											onClick={() => {
												changeVegetableVisible(i, true)
											}}>
											<Cascader
												options={vegetableselector}
												visible={vegetableVisible[i]}
												onClose={() => {
													changeVegetableVisible(i, false)
												}}
												value={vegetable[i]}
												onConfirm={(value) => {
													change_vegetable(i, value)
												}}
												onSelect={(val, extend) => {
													console.log('onSelect', val, extend.items)
												}}
											>
												{items => {
													if (items.every(item => item === null)) {
														return '未选择'
													} else {
														return items.map(item => item?.label ?? '未选择').join('-')
													}
												}}
											</Cascader>
										</Form.Item>
									</div>
									<div onClick={() => deleteVegetableItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{vegetableaddshow ? (<div className='hotfood-add' onClick={() => addVegetable([])}>
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
