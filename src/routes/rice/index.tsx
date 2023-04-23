import './index.css'
import { Button, Form, Input, Picker, Space, Toast } from 'antd-mobile';
import { FormItem } from 'antd-mobile/es/components/form/form-item';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, RefObject } from 'react'

import type { PickerRef } from 'antd-mobile/es/components/picker'
import { useNavigate } from 'react-router-dom';
export default () => {

	const [value, setValue] = useState<(string | null)[]>([])
	const foodselector = [[
		{ label: '猪肉', value: '猪肉' },
		{ label: '牛肉', value: '牛肉' },
		{ label: '羊肉', value: '羊肉' },
		{ label: '鸭肉', value: '鸭肉' },
		{ label: '鸡肉', value: '鸡肉' }
	]
	]

	const [addshow, setShow] = useState(true)

	const [food, foodItem] = useState<string[]>([])
	const add = (x: string) => {
		foodItem([...food, x])
		if (food.length === 2) {
			setShow(false)
		}
	}

	const change = (index: number, value: string) => {
		let tmp = food.slice()
		tmp[index] = value
		foodItem(tmp)
	}

	const deleteItem = (x: number) => {
		let tmp = food.slice()
		tmp.splice(x, 1)
		foodItem(tmp)
		setValue(tmp)
		setShow(true)
		console.log('iiii', value, tmp, x)
	}
	const nav = useNavigate();
	const onFinish = (values: any) => {
		console.log(food)
		console.log(values)
		Toast.show({
			content: '提交完成',
			afterClose: () => {
				console.log('after')
			},
		})

		nav('/')
	}
	return (
		<div>
			<div className='rice-page-section'>
				<Form
					name='form'
					onFinish={onFinish}
					footer={
						<Button block type='submit' color='primary' size='large'>
							提交
						</Button>
					}>
					<div className='rice-title'>套餐</div>
					<div className='rice-selector'>
						{food.map((_, i) => {
							return (
								<div className='rice-selectbox'>
									<div className='rice-formitem'>
										<Form.Item
											name='food'
											valuePropName={food[i]}
											onClick={(e, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={foodselector}
												value={[food[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change(i, setValue[0] as string)
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
									<div onClick={() => deleteItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{addshow ? (<div className='rice-add' onClick={() => add('null')}>
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
