import { combineReducers } from 'redux';
import user from './userReducer';
import produto from './ProductsReducer';
import cliente from './ClienteReducer';
import pedido from './PedidoReducer';
import modal from './ModalReducer';

const rootReducer = combineReducers({ user, produto, cliente, pedido, modal });

export default rootReducer;