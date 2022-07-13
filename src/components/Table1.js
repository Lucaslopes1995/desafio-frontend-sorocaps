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
		const response = await axios.put(`${URL}/pedidos/${data.id}`)
		if(response.status ===203){
			data.getPedidos();

			data.dispatch(messageModal('Produto Atualizado com sucesso'))
			// alert("Produto Atualizado com sucesso")
		}else{
			data.dispatch("Produto Atualizado com sucesso")
		}

	
		// setPedidos(rawClientes)
		
	} catch (error) {
		data.dispatch("Falha ao Atualizar o produto")
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
    dataIndex: 'valorDaVenda',
    key: 'valorDaVenda',
  },
  
  {
    title: 'Status',
    key: 'status',
    render: (_, record) => (
		<Space size="middle">
			{ record.status !=="Aprovadas" ?

		  		<ModalMessages textoBotao="Aprovar" onClick={ () => changeStatus(record)}/>
				: <span>Aprovada</span>
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