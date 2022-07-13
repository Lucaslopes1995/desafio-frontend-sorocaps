import { CREATEPEDIDO } from "../Actions";


const INITIAL_STATE = []
  
function pedido(state = INITIAL_STATE, action) {
	switch (action.type) {
	case CREATEPEDIDO:
	return [ 
		...state,
		action.payload
	];
	default:
		return state;
	}
}
  
  export default pedido;