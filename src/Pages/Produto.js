import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'

import { Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { createProduct, messageModal } from '../Redux/Actions';
import ModalMessages from '../components/ModalMessages';
import URL from '../baseURLs/baseURLS';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} é Obrigatório',
  types: {
    number: '${label} precisa estar em formato numérico!',
  },
  number: {
    range: '${label} precisa ser maior que ${min}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Produto = ({dispatch}) => {

	const [form] = Form.useForm();

	const history = useHistory();

	// const [form] = Form.useForm();

	const validateToken = async() =>{

		try {
			dispatch(messageModal('Carregando'));
			const token = JSON.parse(localStorage.getItem('tokenUser'))

			const response = await axios.get(`${URL}/validtoken`,{
				headers: {
				'authorization': token,
				'tabela': "produtos",
					'acao': "add"	
				}
			})
			if(response.status !==204){
				history.push('/desafio-frontend-sorocaps')
			}

		} catch (error) {
			dispatch(messageModal('Falha ao localizar token'));
			history.push('/desafio-frontend-sorocaps')
		}
	
	}

	useEffect(()=>{
		validateToken()
	},[])

  const onFinish = async (values) => {
    try {

		const token = JSON.parse(localStorage.getItem('tokenUser'));

		dispatch(messageModal('Carregando'));
		const response = await axios.post(`${URL}/produtos`,
		{...values.produto},
		{
			headers: {
			  'authorization': token
			}
		});
		if(response.status ===201){
			// console.log(values.produto.nomeProduto);
			// console.log(form);
			// form.setFieldsValue({
			// 	produto: {nomeProduto:"awd"}
			//   });
			dispatch(messageModal("Produto Cadastrado com Sucesso"))
			dispatch(createProduct(values))
			form.resetFields()
		}else{
			dispatch(messageModal("Falha ao Criar Produto"))
		}
	} catch (error) {
		dispatch(messageModal("Falha ao Criar Produto"))
	}
  };

  const onFinishFailed = () => {
	dispatch(messageModal("Falha ao Criar Produto"))
  }

  return (
	<div>
		<Header/>


	
		<div className='div-form'>

		<Form {...layout} name="nest-messages" onFinish={onFinish} 
		onFinishFailed={onFinishFailed} validateMessages={validateMessages}
		autoComplete='off'
		form={form}
		>

		<Form.Item
			name={['produto', 'nomeProduto']}
			label="Nome do Produto"
			rules={[
			{
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<Input />
		</Form.Item>



		<Form.Item
			name={['produto', 'codigoDoProduto']}
			label="Codigo do Produto"
			rules={[
			{
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<Input />
		</Form.Item>
		<Form.Item
			name={['produto', 'descricaoDoProduto']}
			label="Descrição do Produto"
			rules={[
			{
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<Input />
		</Form.Item>
		<Form.Item
			name={['produto', 'unidadeDeMedida']}
			label="Unidade de Medida"
			rules={[
			{
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<Input />
		</Form.Item>
		<Form.Item
			name={['produto', 'valorDaCompra']}
			label="Valor de Compra"
			rules={[
			{
				type: 'number',
				min: 0,
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<InputNumber />
		</Form.Item>
		<Form.Item
			name={['produto', 'precoDaVenda']}
			label="Preço de Venda"
			rules={[
			{
				type: 'number',
				min: 0,
				required: true,
			},
			]}
			labelCol={{
				span: 4,
				offset: 6,
			  }}
			  wrapperCol={{
				span: 4,
			  }}
		>
			<InputNumber />
		</Form.Item>

		<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
			<ModalMessages htmlType="submit" textoBotao="Cadastrar"/>
		</Form.Item>
		</Form>
	</div>
	</div>
  );
};

export default connect()(Produto);
