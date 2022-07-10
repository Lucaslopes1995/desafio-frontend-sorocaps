import { MESSAGEMODAL } from "../Actions";


const INITIAL_STATE = {message:''}
  
function modal(state = INITIAL_STATE, action) {
	// console.log("modal");
	switch (action.type) {
	case MESSAGEMODAL:
	return {
		...state,
		message:action.payload
	};
	default:
		return state;
	}
}
  
  export default modal;