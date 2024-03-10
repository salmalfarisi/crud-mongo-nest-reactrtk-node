import axios from 'axios';
import Vue from 'vue'

export const checkUserExist = ({commit, state}) => {
	let url = state.state.urlBE + "user/detail";
		
	return new Promise((resolve, reject) => {
		axios.get(url, { withCredentials: true })
			.then(
				response => {
					if(response.status == 401)
					{
						return false;
					}
					else
					{
						commit('setUserData', response.data.data);
						return true;
					}
				}
			)
			.catch(
				error => {
					if(error.response.status == 401)
					{
						return false;
					}
					else
					{
						console.log(error.message);
					}
				}
			)
	});
} 

export const submitFormRegis = ({commit, state}, data) => {
	let url = state.state.urlBE + "user/registration";
	axios.post(url, data)
			.then(
				response => {
					return true;
				}
			)
			.catch(
				error => {
					console.log(error);
					if(error.response.status == 406)
					{
						alert(error.response.data.message)
					}
					else if(error.response.status == 400)
					{
						commit('setError', {
							data:error.response.data.message, 
							name:'setErrorUserRegistration'
						});
					}
					else
					{
						alert(error.response.data.message)
					}
				}
			);
}


export const submitFormLogin = ({commit, state}, data) => {
	let url = state.state.urlBE + "user/login";
	axios.post(url, data)
			.then(
				response => {
					Vue.$cookies.set('token', response.data.data.token);
					commit('setUserData', response.data.data);
				}
			)
			.catch(
				error => {
					console.log(error);
					alert(error.response.data.message);
				}
			);
}

export const removeAccount = ({commit}) => {
	commit('removeAccount');
}

export const loadCRUDDATA = ({commit, state}) => {
	let url = state.state.urlBE + "crud";
	axios.get(url, { withCredentials: true })
			.then(
				response => {
					commit('setIndexCRUD', response.data.data);
					return true;
				}
			)
			.catch(
				error => {
					console.log(error);
					if(error.response.status == 406)
					{
						alert(error.response.data.message)
					}
					else if(error.response.status == 400)
					{
						commit('setError', {
							data:error.response.data.message, 
							name:'setErrorUserRegistration'
						});
					}
					else
					{
						alert(error.response.data.message)
					}
				}
			);
}

export const resetCRUD = ({commit}) => {
	commit('resetData');
}

export const getCRUDdataByID = ({commit, state}, id) => {
	let url = state.state.urlBE + "crud/" + id;
	axios.get(url, { withCredentials: true })
			.then(
				response => {
					commit('getCRUDbyID', response.data);
					return true;
				}
			)
			.catch(
				error => {
					console.log(error);
					alert(error.response.data.message)
				}
			);
}

export const submitCRUD = ({commit, state}, data) => {
	let url = state.state.urlBE;
	let startapi = null;
	
	if(data._id != '' && data._id != undefined)
	{
		url = url + 'crud/update/' + data._id;
		startapi = axios.put(url, { title:data.title, description:data.description }, { withCredentials: true });
	}
	else
	{
		url = url + 'crud/create';
		startapi = axios.post(url, { title:data.title, description:data.description}, { withCredentials: true });
	}
	
	startapi.then(
				response => {
					state.state.setCRUD =
					{
						_id:'',
						title:'',
						description:'',
						is_delete:'',
					};
					state.state.setErrorCRUD = 
					{
						title:[],
						description:[],
					}
					return true;
				}
			)
			.catch(
				error => {
					console.log(error);
					if(error.response.status == 406)
					{
						alert(error.response.data.message)
					}
					else if(error.response.status == 400)
					{
						commit('setError', {
							data:error.response.data.message, 
							name:'setErrorCRUD'
						});
					}
					else
					{
						alert(error.response.data.message)
					}
				}
			);
}

export const deleteData = ({commit, state}, id) => {
	let url = state.state.urlBE + "crud/" + id;
	axios.delete(url, { withCredentials: true })
			.then(
				response => {
					commit('refreshCRUDdata', id);
					return true;
				}
			)
			.catch(
				error => {
					console.log(error);
					alert(error.response.data.message)
				}
			);
}