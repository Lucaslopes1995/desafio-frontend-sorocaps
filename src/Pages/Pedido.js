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
		console.log(andamento);
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
				history.push('/')
			}

		} catch (error) {
			history.push('/')
		}
	
	}

	const getPedidos = async () => {

		try {
			const token = JSON.parse(localStorage.getItem('tokenUser'))
			// console.log(values);
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
		<Table1 pedidos= {pedidosAndamento} getPedidos={getPedidos} status={"Andamento"}/>
		<Table1 pedidos= {pedidosAprovados} status={"Aprovadas"}/>

		</div>

		</div>
	</>
		

  );
}

export default Pedido;