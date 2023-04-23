import './index.css'
import { Button, Form, Picker, Space, Toast } from 'antd-mobile';
import { AddCircleOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { useState, RefObject } from 'react'

import type { PickerRef } from 'antd-mobile/es/components/picker'
import { useNavigate } from 'react-router-dom';
export default () => {

	const [value, setValue] = useState<(string | null)[]>([])
	const noddleselector = [[
		{ label: '红烧牛肉面', value: '红烧牛肉面' },
		{ label: '番茄牛腩面', value: '番茄牛腩面' }
	]
	]
	const flourselector = [[
		{ label: '酸辣粉', value: '酸辣粉' },
		{ label: '红烧牛肉粉', value: '红烧牛肉粉' },
		{ label: '炒粉', value: '炒粉' }]]

	const [noddleaddshow, setNoddleShow] = useState(true)
	const [flouraddshow, setFlourShow] = useState(true)

	const [noddle, setnoddleItem] = useState<string[]>([])
	const [flour, setflourItem] = useState<string[]>([])
	const addNoddle = (x: string) => {
		setnoddleItem([...noddle, x])
		if (noddle.length === 2) {
			setNoddleShow(false)
		}
	}
	const addFlour = (x: string) => {
		setflourItem([...flour, x])
		if (flour.length === 2) {
			setFlourShow(false)
		}
	}

	const change_noddle = (index: number, value: string) => {
		let tmp = noddle.slice()
		tmp[index] = value
		setnoddleItem(tmp)
	}
	const change_flour = (index: number, value: string) => {
		let tmp = flour.slice()
		tmp[index] = value
		setflourItem(tmp)
	}

	const deleteNoddleItem = (x: number) => {
		let tmp = noddle.slice()
		tmp.splice(x, 1)
		setnoddleItem(tmp)
		setValue(tmp)
		setNoddleShow(true)
		console.log('iiii', value, tmp, x)
	}
	const deleteFlourItem = (x: number) => {
		let tmp = flour.slice()
		tmp.splice(x, 1)
		setflourItem(tmp)
		setValue(tmp)
		setFlourShow(true)
		console.log('iiii', value, tmp, x)
	}
	const nav = useNavigate();
	const onFinish = (values: any) => {
		console.log(noddle)
		console.log(flour)
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
					<div className='noddle-title'>面类</div>
					<div className='noddle-selector'>
						{noddle.map((_, i) => {
							return (
								<div className='noddle-selectbox'>
									<div className='noddle-formitem'>
										<Form.Item
											name='noddle'
											valuePropName={noddle[i]}
											onClick={(_, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={noddleselector}
												value={[noddle[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change_noddle(i, setValue[0] as string)
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
									<div onClick={() => deleteNoddleItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{noddleaddshow ? (<div className='noddle-add' onClick={() => addNoddle('null')}>
							<span>
								<AddCircleOutline /> 添加
							</span>
						</div>) : ''}
					</div>
					<div className='noddle-title'>粉类</div>
					<div className='noddle-selector'>
						{flour.map((_, i) => {
							return (
								<div className='noddle-selectbox'>
									<div className='noddle-formitem'>
										<Form.Item
											name='flour'
											valuePropName={flour[i]}
											onClick={(_, PickerRef: RefObject<PickerRef>) => {
												PickerRef.current?.open()
											}}>
											<Picker
												columns={flourselector}
												value={[flour[i]]}
												onConfirm={(setValue) => {
													console.log('onConfirm', i, setValue[0])
													change_flour(i, setValue[0] as string)
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
									<div onClick={() => deleteFlourItem(i)}><CloseCircleOutline /></div>
								</div>
							)
						})}
						{flouraddshow ? (<div className='noddle-add' onClick={() => addFlour('null')}>
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
