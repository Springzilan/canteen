import './index.css'
import { Button, Form, Picker, Space, Toast } from 'antd-mobile';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, RefObject } from 'react'

import type { PickerRef } from 'antd-mobile/es/components/picker'
import { useNavigate } from 'react-router-dom';
export default () => {

	const [value, setValue] = useState<(string | null)[]>([])
	const bigmeatselector = [[
		{ label: '猪肉', value: '猪肉' },
		{ label: '牛肉', value: '牛肉' },
		{ label: '羊肉', value: '羊肉' },
		{ label: '鸭肉', value: '鸭肉' },
		{ label: '鸡肉', value: '鸡肉' }
	]
	]
	const smallmeatselector = [[
		{ label: '鸡蛋', value: '鸡蛋' },
		{ label: '鱼', value: '鱼' },
		{ label: '虾', value: '虾' },
		{ label: '蟹', value: '蟹' }]]

	const vegetableselector = [[
		{ label: '西红柿', value: '西红柿' },
		{ label: '茄子', value: '茄子' },
		{ label: '土豆', value: '土豆' },
		{ label: '豆角', value: '豆角' },
		{ label: '青椒', value: '青椒' }]]

	const [bigaddshow, setBigShow] = useState(true)
	const [smalladdshow, setSmallShow] = useState(true)
	const [vegetableaddshow, setVegetableShow] = useState(true)

	const [bigmeat, setbigItem] = useState<string[]>([])
	const [smallmeat, setsmallItem] = useState<string[]>([])
	const [vegetable, setvegetableItem] = useState<string[]>([])
	const addBig = (x: string) => {
		setbigItem([...bigmeat, x])
		if (bigmeat.length === 2) {
			setBigShow(false)
		}
	}
	const addSmall = (x: string) => {
		setsmallItem([...smallmeat, x])
		if (smallmeat.length === 2) {
			setSmallShow(false)
		}
	}
	const addVegetable = (x: string) => {
		setvegetableItem([...vegetable, x])
		if (vegetable.length === 2) {
			setVegetableShow(false)
		}
	}

	const change_big = (index: number, value: string) => {
		let tmp = bigmeat.slice()
		tmp[index] = value
		setbigItem(tmp)
	}
	const change_small = (index: number, value: string) => {
		let tmp = smallmeat.slice()
		tmp[index] = value
		setsmallItem(tmp)
	}
	const change_vegetable = (index: number, value: string) => {
		let tmp = vegetable.slice()
		tmp[index] = value
		setvegetableItem(tmp)
	}

	const deleteBigItem = (x: number) => {
		let tmp = bigmeat.slice()
		tmp.splice(x, 1)
		setbigItem(tmp)
		setValue(tmp)
		setBigShow(true)
		console.log('iiii', value, tmp, x)
	}
	const deleteSmallItem = (x: number) => {
		let tmp = smallmeat.slice()
		tmp.splice(x, 1)
		setsmallItem(tmp)
		setValue(tmp)
		setSmallShow(true)
		console.log('iiii', value, tmp, x)
	}
	const deleteVegetableItem = (x: number) => {
		let tmp = vegetable.slice()
		tmp.splice(x, 1)
		setvegetableItem(tmp)
		setValue(tmp)
		setVegetableShow(true)
		console.log('iiii', value, tmp, x)
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
											name='bigmeat'
											valuePropName={bigmeat[i]}
											onClick={(_, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={bigmeatselector}
												value={[bigmeat[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change_big(i, setValue[0] as string)
												}}
											>
												{(items, { open }) => {
													return (
														<Space align='center'>
															<Button onClick={open}>选择</Button>
															{items.every(item => item === null)
																? '未选择'
																: items.map(item => item?.label ?? '未选择').join(' - ')}
														</Space>
													)
												}}
											</Picker>
										</Form.Item>
									</div>
									<div onClick={() => deleteBigItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{bigaddshow ? (<div className='hotfood-add' onClick={() => addBig('null')}>
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
											name='smallmeat'
											valuePropName={smallmeat[i]}
											onClick={(_, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={smallmeatselector}
												value={[smallmeat[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change_small(i, setValue[0] as string)
												}}
											>
												{(items, { open }) => {
													return (
														<Space align='center'>
															<Button onClick={open}>选择</Button>
															{items.every(item => item === null)
																? '未选择'
																: items.map(item => item?.label ?? '未选择').join(' - ')}
														</Space>
													)
												}}
											</Picker>
										</Form.Item>
									</div>
									<div onClick={() => deleteSmallItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{smalladdshow ? (<div className='hotfood-add' onClick={() => addSmall('null')}>
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
											name='vegetable'
											valuePropName={vegetable[i]}
											onClick={(_, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={vegetableselector}
												value={[vegetable[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change_vegetable(i, setValue[0] as string)
												}}
											>
												{(items, { open }) => {
													return (
														<Space align='center'>
															<Button onClick={open}>选择</Button>
															{items.every(item => item === null)
																? '未选择'
																: items.map(item => item?.label ?? '未选择').join(' - ')}
														</Space>
													)
												}}
											</Picker>
										</Form.Item>
									</div>
									<div onClick={() => deleteVegetableItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{vegetableaddshow ? (<div className='hotfood-add' onClick={() => addVegetable('null')}>
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
