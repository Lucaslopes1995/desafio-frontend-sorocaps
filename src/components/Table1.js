import { Space, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import URL from '../baseURLs/baseURLS';
import { messageModal } from '../Redux/Actions';
import ModalMessages from './ModalMessages';

const changeStatus = async (data) =>{
	try {
		
		data.dispatch(messageModal('Carregando'))
		const token = JSON.parse(localStorage.getItem('tokenUser'));
		const response = await axios.put(`${URL}/pedidos/${data.id}`,{},{
			headers: {
			'authorization': token,
			'tabela': "pedido",
			'acao': "update"
			}
		})

		if(response.status ===200){
			data.getPedidos();

			data.dispatch(messageModal('Produto Atualizado com sucesso'))
			// alert("Produto Atualizado com sucesso")
		}else{
			data.dispatch(messageModal("Falha ao atualizar Pedido"))
		}

	
		// setPedidos(rawClientes)
		
	} catch (error) {
		data.dispatch(messageModal("Falha ao atualizar Pedido"))
	}
}

const columns = [
  {
    title: 'Produto',
    dataIndex: ["produtos",'codigoDoProduto'],
    key: 'produto_id',
  },
  {
    title: 'Cliente',
    dataIndex: ["clientes",'nome'],
    key: 'nome',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantidade',
    key: 'quantidade',
  },
  {
    title: 'Valor da Venda',
    key: 'valorDaVenda',
	render: (_, record) => (
		<span key={record.id}>{"R$ "+ (record.valorDaVenda)}</span>
	)
  },
  
  {
    title: 'Status',
    key: 'status',
    render: (_, record) => (
		<Space size="middle">
			{ record.status ==="Em Processo" ?

		  		<ModalMessages key={record.id} textoBotao="Aprovar" changeStatus = {()=>changeStatus(record)} />
				: <span key={record.id}>Aprovado</span>
        	}
		{/* <a onClick={ () => changeStatus(record) }>Aprovar</a> */}
      </Space>
    ),
  },
];


const Table1 = ({pedidos,getPedidos,status,dispatch}) => {
	pedidos.map(el => {
		el.getPedidos = getPedidos;
		el.dispatch = dispatch;
		el.status = status;
		return el
	});


	return (
		<>
			<h2>{status}</h2>
			<Table columns={columns} dataSource={pedidos} />
		</>
	
		)

};

export default connect()(Table1);