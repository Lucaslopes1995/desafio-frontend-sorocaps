import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'

import { Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { createCliente, messageModal } from '../Redux/Actions';
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
  required: '${label} é Obrigatório!',
  types: {
    number: '${label} precisa estar em formato numérico!',
  },
  number: {
    range: '${label} precisa ser maior que ${min}',
  },
};
/* eslint-enable no-template-curly-in-string */

const Cliente = ({dispatch}) => {

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
				history.push('/desafio-frontend-sorocaps/')
			}

		} catch (error) {
			history.push('/desafio-frontend-sorocaps/')
		}
	
	}

	useEffect(()=>{
		validateToken()
	},[])

  const onFinish = async (values) => {
    try {

		const token = JSON.parse(localStorage.getItem('tokenUser'));

		dispatch(messageModal('Carregando'));
		const response = await axios.post(`${URL}/clientes`,
			{...values.cliente},
			{
				headers: {
				'authorization': token
				}
			});
		if(response.status === 203){
			dispatch(messageModal("Cliente Cadastrado com Sucesso"))
			return dispatch(createCliente(values))
		}else{
			dispatch(messageModal("Falha ao Criar Cliente2"))
		}
	} catch (error) {
		const message = error?.response?.data?.message || "Falha ao Criar Cliente";
		dispatch(messageModal(message))
	}
  };


  const onFinishFailed = async () => {
	dispatch(messageModal("Falha ao Criar Cliente"))
}

  return (
	<div>
		<Header/>


	
	<div className='div-form'>

		<Form {...layout} name="nest-messages" onFinish={onFinish}  
		onFinishFailed={onFinishFailed} validateMessages={validateMessages}

		>
		
		<Form.Item
			name={['cliente', 'nome']}
			label="Nome do Cliente"
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
			name={['cliente', 'razaoSocial']}
			label="Razao Social"
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
			name={['cliente', 'cnpj']}
			label="CNPJ"
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
			name={['cliente', 'endereco']}
			label="Endereço"
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
		

		<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
			<ModalMessages htmlType="submit" textoBotao="Cadastrar"/>
		</Form.Item>
		</Form>

	</div>
	</div>
  );
};

export default connect()(Cliente);
