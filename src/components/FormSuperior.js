import { Col,Form, Input, Row, Select } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { createPedido, messageModal } from '../Redux/Actions';
import ModalMessages from './ModalMessages'
import URL from '../baseURLs/baseURLS';
const { Option } = Select;

const App = ({dispatch, getPedidos}) => {

	const [form] = Form.useForm();

	const [clientes, setClientes] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(()=>{
		getClientes()
		getProducts()
	}, []) 

	const getClientes = async () => {
		const response = await axios.get(`${URL}/clientes`)
		const rawClientes = response?.data;
		setClientes(rawClientes)
	};

	const getProducts = async () => {
		const response = await axios.get(`${URL}/produtos`)
		const rawClientes = response?.data;
		setProducts(rawClientes)
	};

	const onFinish = async (values) => {
		try {
			const token = JSON.parse(localStorage.getItem('tokenUser'))
			dispatch(messageModal('Carregando'));
			const response = await axios.post(`${URL}/pedidos`,
				{...values,status:"EM PROCESSO"},
				{
					headers: {
					'authorization': token				
					}
				});
			if(response.status === 201){
				await getPedidos();
				dispatch(messageModal('Pedido Criado'))
				dispatch(createPedido({...values,status:"EM PROCESSO"}))
				form.resetFields()
			}else{
				dispatch(messageModal('Falha ao Criar o Pedido'))
			}
		} catch (error) {
			const message = error?.response?.data?.message || "Falha ao Criar Pedido";
			dispatch(messageModal(message))
		}
	  };

	  const onFinishFailed = () => {
		dispatch(messageModal('Falha ao Criar o Pedido'))
	  }

  return (
	<>
		<Form
		form={form}
		autoComplete='off'
		align="center"
		style={{
			marginTop: 30,
			}}
		name="complex-form"
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
		labelCol={{
			span: 10,
		}}
		wrapperCol={{
			span: 10,
		}}
		>
		<Form.Item align="center" >
			<Input.Group compact >
			<Form.Item
				name={'cliente_id'}
				noStyle
				rules={[
				{
					required: true,
					message: 'Cliente é obrigatório',
				},
				]}
			>
				<Select placeholder="Selecione um Cliente">
					{clientes.length>0 && clientes.map((el,i)=>(
						<Option key={el.id+i} value={el.id}>{el.nome}</Option>
					))}

				</Select>
			</Form.Item >
			<Form.Item
				name={'produto_id'}
				noStyle
				rules={[
				{
					required: true,
					message: 'Produto é obrigatório',
				},
				]}
				
			>
				<Select placeholder="Selecione um produto">
					{products.length>0 && products.map((el,i)=>(
						<Option key={el.id+i} value={el.id}>{el.nomeProduto}</Option>
					))}

				</Select>
			</Form.Item>
			</Input.Group>
		</Form.Item>
		<Form.Item
			align="center"
			style={{
			marginBottom: 0,
			}}
			labelCol={{
				span: 24,

			  }}
		>
			<Form.Item

			wrapperCol={{
				span: 12,
				offset: 6
			}}

			label="Quantidade"
			name="quantidade"
			rules={[
				{
				required: true,
				},
			]}
			style={{
				display: 'inline-block',
			}}
			>
			<Input placeholder="Quantidade" />
			</Form.Item>
			<Form.Item
			wrapperCol={{
				span: 12,
				offset: 6
			}}
			
			label="Valor da Venda"
			name="valorDaVenda"
			rules={[
				{
				required: true,
				},
			]}
			style={{
				display: 'inline-block',
			}}
			>
			<Input placeholder="Valor da Venda" />
			</Form.Item>

		</Form.Item>

			<Row justify='center'>
				<Col justify='center' >

						<ModalMessages htmlType="submit" textoBotao="Cadastrar Pedido" justify='center'  />

				</Col>
			</Row>


		
		</Form>
	</>
  );
};

export default connect()(App);