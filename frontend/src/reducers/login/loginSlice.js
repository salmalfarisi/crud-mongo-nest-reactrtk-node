import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status:'',
	id:'',
	name:'',
	username:'',
	token:'',
	email:'',
	
}

export const loginSlice = createSlice(
	{
		name:'login',
		initialState,
		reducers:{
			resetvalue: (state) => {
				state.status = '';
				state.id = '';
				state.name = '';
				state.username = '';
				state.token = '';
				state.email = '';
			},
			/*incrementbyamount: (state, action) => {
				state.count += action.payload
			}*/
		}
	}
)

export const { resetvalue } = loginSlice.actions;

export default loginSlice.reducer;