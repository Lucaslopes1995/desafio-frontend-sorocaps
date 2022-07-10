import { Space, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import URL from '../baseURLs/baseURLS';
import { messageModal } from '../Redux/Actions';
import ModalMessages from './ModalMessages';

const changeStatus = async (data) =>{
	console.log(data.id);
	try {
		const response = await axios.put(`${URL}/pedidos/${data.id}`)
		console.log(response);
		if(response.status ===203){
			console.log(data);
			data.getPedidos();

			data.dispatch(messageModal('Produto Atualizado com sucesso'))
			// alert("Produto Atualizado com sucesso")
		}else{
			data.dispatch("Produto Atualizado com sucesso")
			console.log("Falha ao Atualizar o produto");
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
    dataIndex: ["clientes",'cnpj'],
    key: 'cliente_id',
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
		  {/* {console.log(record)} */}

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


	// console.log(pedidosTeste);

	return (
		<>
			<h2>{status}</h2>
			<Table columns={columns} dataSource={pedidos} />
		</>
	
		)

};

export default connect()(Table1);