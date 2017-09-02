export default function({dispatch}){
	return next=>action =>{
		//if actions does not have a payload
		//or payload does not have a .then property
		//we don't care about it, send it on
		if(!action.payload||!action.payload.then){
			return next(action);	
		}

		//make sure promise is resolves
		action.payload.then(response=>{
			//create new action with old type, but
			//replace the promise with response data
			const newAction={...action,payload: response};
			//send the action to all middlewares again
			dispatch(newAction);
		});

	}
}