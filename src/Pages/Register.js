import axios from 'axios'
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { LoggedUser, messageModal } from '../Redux/Actions';
import ModalMessages from '../components/ModalMessages';
import Header from '../components/Header'
import URL from '../baseURLs/baseURLS';


const Login = ({dispatch}) => {
	// const history = useHistory();
	const [shwowHeader, setShwowHeader] = useState(false);


  	const onFinish = async (values) => {
		try {
			dispatch(messageModal('Carregando'));
			const response = await axios.post(`${URL}/users`,values);
			
			const token = response?.data?.token
			if(token){
				localStorage.setItem('tokenUser', JSON.stringify(token));
				dispatch(messageModal('Usuário Criado com Sucesso'));
				dispatch(LoggedUser({name:values.name}));
				setShwowHeader(true)
			}else{
				dispatch(messageModal('Falha ao Criar Usuário'));
			}
		} catch (error) {
			const message = error?.response?.data.message || 'Falha ao Criar Usuário';
			dispatch(messageModal(message));
		}
		
  };

  const onFinishFailed = () => {
	dispatch(messageModal('Falha ao Criar Usuário'));
  };

  return (
	<div>
		{shwowHeader && <Header/>}


	
		<div className='div-form'>
    <Form
      name="basic"
	  align='center'
      labelCol={{
        span: 4,
		offset: 6,
      }}
      wrapperCol={{
        span: 4,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[
          {
            required: true,
            message: 'Adicione um Nome',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Adicione um Password',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 10,
          span:6,
        }}
      >
		<ModalMessages htmlType="submit" textoBotao="Realizar Cadastro"/>
      </Form.Item>
    </Form>
	</div>
	</div>
  );
};

export default connect()(Login);
