import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ModalMessages from '../components/ModalMessages';
import { LoggedUser, messageModal } from '../Redux/Actions';
import Header from '../components/Header'
import URL from '../baseURLs/baseURLS';

const Login = ({dispatch}) => {
  const [form] = Form.useForm();
  const [shwowHeader, setShwowHeader] = useState(false);
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const history = useHistory();

  const onFinish = async (values) => {
    try {
		const response = await axios.post(`${URL}/user/${values.name}`);

		const token = response?.data?.token;

		if(token){
			localStorage.setItem('tokenUser', JSON.stringify(token));
			dispatch(messageModal('Acesso Correto'))
			dispatch(LoggedUser({name:values.name}))
			setShwowHeader(true);
		}else{
			dispatch(messageModal('Dados Incorretos'))
		}

	} catch (error) {

		const message = error.response.data.message || 'Dados Incorretos';

		dispatch(messageModal(message))

		console.log(error.response.data.message);
	}
  };

  const onFinishFailed = () => {
	dispatch(messageModal('Dados Incorretos'))
  }

  return (
	<div>
		{shwowHeader && <Header/>}


	
		<div className='div-form'>
	
		<Form form={form} name="horizontal_login" onFinish={onFinish} onFinishFailed={onFinishFailed} align='center'>
		
		
		<Row justify='center'gutter={8}>

				<Col span={4}>
				<Form.Item
				name="name"
				rules={[
				{
				required: true,
				message: 'Adicione o Nome!',
				},
				]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome" />
				</Form.Item>
				</Col>


		</Row>

		<Row justify='center'>

				<Col span={4}>
					<Form.Item
					name="password"
					rules={[
					{
						required: true,
						message: 'Adicione a Senha!',
					},
					]}
					>
						<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="senha"
						/>
					</Form.Item>
				</Col>


		</Row>
		
		
		<Row justify='center'>
			<Col span={4}>
				<Form.Item shouldUpdate>
					<ModalMessages htmlType="submit" textoBotao="Acessar"/>
				</Form.Item>
			</Col>
		</Row>
		

		</Form>
	</div>
	</div>
  );
};

export default connect()(Login);