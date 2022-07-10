import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'

import { Button, Form, Input, InputNumber } from 'antd';
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
  required: '${label} é Obrigatório required!',
  types: {
    number: '${label} precisa estar em formato numérico!',
  },
  number: {
    range: '${label} precisa ser maior que ${min}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Produto = ({dispatch}) => {

	const history = useHistory();

	const validateToken = async() =>{

		try {
			
			const token = JSON.parse(localStorage.getItem('tokenUser'))

			const response = await axios.get(`${URL}/validtoken`,{
				headers: {
				'authorization': token
				}
			})
			if(response.status !==204){
				history.push('/')
			}

		} catch (error) {
			history.push('/')
		}
	
	}

	useEffect(()=>{
		validateToken()
	},[])

  const onFinish = async (values) => {
	console.log({...values.produto});
    try {

		const token = JSON.parse(localStorage.getItem('tokenUser'))

		const response = await axios.post(`${URL}/produtos`,
		{...values.produto},
		{
			headers: {
			  'authorization': token
			}
		});
		console.log(response);
		if(response.status ===203){
			dispatch(messageModal("Produto Cadastrado com Sucesso"))
			dispatch(createProduct(values))
		}else{
			dispatch(messageModal("Falha ao Criar Produto"))
		}
	} catch (error) {
		console.log(error);
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
		>

		<Form.Item
			name={['produto', 'nomeProduto']}
			label="Nome do Produto"
			rules={[
			{
				required: true,
			},
			]}
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
		>
			<InputNumber />
		</Form.Item>

		<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
			<ModalMessages htmlType="submit" textoBotao="Cadastrar"/>
		</Form.Item>
		</Form>
	</div>
	</div>
  );
};

export default connect()(Produto);
