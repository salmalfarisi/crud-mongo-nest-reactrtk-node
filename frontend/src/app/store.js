import { configureStore } from "@reduxjs/toolkit";
import loginSlice from '../reducers/login/loginSlice';

export const store = configureStore({
	reducer:{
		//variable : namareducer
		login:loginSlice
	}
})