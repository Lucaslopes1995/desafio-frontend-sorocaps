import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const App = () => {
	const history =useHistory();

	const changePage = (e) => {
		switch(e.key){
			case ("Cadastro Produto"):
				history.push('/desafio-frontend-sorocaps/produto');
				break;
			case ("Cadastro Cliente"):
				history.push('/desafio-frontend-sorocaps/cliente');
				break;
			case ("Cadastro Pedido"):
				history.push('/desafio-frontend-sorocaps/pedido');
				break;
			default:
				return false;
		}
	}


  return(
	<Menu mode="horizontal" defaultSelectedKeys={['Cadastro Cliente']} onClick={(e)=>changePage(e)}>
	<Menu.Item key="Cadastro Cliente">
      Cadastro Cliente
    </Menu.Item>
	<Menu.Item  key="Cadastro Produto">
	  Cadastro Produto
    </Menu.Item>
	<Menu.Item  key="Cadastro Pedido">
	  Cadastro Pedido
    </Menu.Item>
    
  </Menu>
  
  )
};

export default App;