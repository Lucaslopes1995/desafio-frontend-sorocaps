import { CREATEPRODUCT } from "../Actions";


const INITIAL_STATE = []
  
function produto(state = INITIAL_STATE, action) {
	switch (action.type) {
	case CREATEPRODUCT:
	return [ 
		...state,
		action.payload.produto
	];
	default:
		return state;
	}
}
  
  export default produto;