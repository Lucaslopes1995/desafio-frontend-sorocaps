import { Route, Switch } from 'react-router-dom'
import Register from './Pages/Register';


import './App.css';
import Produto from './Pages/Produto';
import Cliente from './Pages/Cliente';
import Login from './Pages/Login';
import Pedido from './Pages/Pedido';

function App() {
	const renderRoute = () => {
		return (
			<Switch>
			<Route exact path="/desafio-frontend-sorocaps/" component={Login} />
			<Route exact path="/desafio-frontend-sorocaps/registro" component={Register} />
			<Route exact path="/desafio-frontend-sorocaps/produto" component={Produto} />
			<Route exact path="/desafio-frontend-sorocaps/cliente" component={Cliente} />
			<Route exact path="/desafio-frontend-sorocaps/pedido" component={Pedido} />


		</Switch>
		)
	}

  return (
	<>
		{renderRoute()}
	</>
		

  );
}

export default App;
