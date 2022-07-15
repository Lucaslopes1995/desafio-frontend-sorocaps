import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormSuperior from '../components/FormSuperior'
import Table1 from '../components/Table1';
import Header from '../components/Header'
import URL from '../baseURLs/baseURLS';


function Pedido() {

	const history = useHistory();

	const [pedidos, setPedidos] = useState([]);
	const [pedidosAprovados, setPedidosAprovados] = useState([]);
	const [pedidosAndamento, setpedidosAndamento] = useState([]);
	

	useEffect(()=>{
		getPedidos();
		validateToken();
	},[])

	useEffect(()=>{
		const aprovados = pedidos.filter((el) => el.status === "APROVADOS");
		const andamento = pedidos.filter((el) => el.status !== "APROVADOS");
		setPedidosAprovados(aprovados)
		setpedidosAndamento(andamento)
	},[pedidos])


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

	const getPedidos = async () => {

		try {
			const token = JSON.parse(localStorage.getItem('tokenUser'))
			const response = await axios.get(`${URL}/pedidos`,
				{
					headers: {
					'authorization': token
					}
				});
				const rawClientes = response?.data;
				setPedidos(rawClientes)

		} catch (error) {
			
		}

	};

  return (
	<>
		<div>
		<Header/>

		<div className='div-form'>
			<FormSuperior getPedidos={getPedidos}/>
		<div className='tabelas-pedidos'>
			<Table1 pedidos= {pedidosAndamento} getPedidos={getPedidos} status={"Em Processo"}/>
			
		</div>

		<div className='tabelas-pedidos'>
			<Table1 pedidos= {pedidosAprovados} status={"Aprovados"}/>
			
		</div>

		</div>

		</div>
	</>
		

  );
}

export default Pedido;