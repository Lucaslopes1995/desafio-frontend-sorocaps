import { CREATECLIENTE } from "../Actions";


const INITIAL_STATE = []
  
function cliente(state = INITIAL_STATE, action) {
	switch (action.type) {
	case CREATECLIENTE:
	return [ 
		...state,
		action.payload.cliente
	];
	default:
		return state;
	}
}
  
  export default cliente;