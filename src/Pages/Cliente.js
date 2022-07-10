import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'

import { Button, Form, Input, InputNumber } from 'antd';
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
  required: '${label} é Obrigatório required!',
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
	console.log({...values.cliente});
    try {

		const token = JSON.parse(localStorage.getItem('tokenUser'))

		const response = await axios.post(`${URL}/clientes`,
			{...values.cliente},
			{
				headers: {
				'authorization': token
				}
			});
		console.log(response);
		if(response.status === 203){
			dispatch(messageModal("Cliente Cadastrado com Sucesso"))
			return dispatch(createCliente(values))
		}else{
			dispatch(messageModal("Falha ao Criar Cliente2"))
			// console.log("Falha ao Criar Cliente");
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
		>
			<Input />
		</Form.Item>
		<Form.Item
			name={['cliente', 'cnpj']}
			label="CNPJ"
			rules={[
			{
				type: 'number',
				min: 0
			},
			]}
		>
			<InputNumber />
		</Form.Item>
		<Form.Item
			name={['cliente', 'endereco']}
			label="Endereço"
			rules={[
			{
				required: true,
			},
			]}
		>
			<Input />
		</Form.Item>
		

		<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
			{/* <Button type="primary" htmlType="submit">
			Cadastrar
			</Button> */}
			<ModalMessages htmlType="submit" textoBotao="Cadastrar"/>
		</Form.Item>
		</Form>

	</div>
	</div>
  );
};

export default connect()(Cliente);
