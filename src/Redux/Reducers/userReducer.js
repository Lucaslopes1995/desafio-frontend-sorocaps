import { USERLOGGED } from "../Actions";


const INITIAL_STATE = {
	name:""
  };
  
  function user(state = INITIAL_STATE, action) {
	switch (action.type) {
	  case USERLOGGED:
		console.log(action.payload);
		return { 
			...state,
			name:action.payload.name
		};
	  default:
		return state;
	}
  }
  
  export default user;