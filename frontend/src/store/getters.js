export const loadDataUser = (state) => {
	let data = state.state.user;
	return data;
}

export const getUserRegistration = (state) => {
	let data = state.state.setUserRegistration;
	return data;
}

export const getErrorUserRegistration = (state) => {
	let data = state.state.setErrorUserRegistration;
	return data;
}

export const loadIndexData = (state) => {
	let result = state.state.data;
	return result;
}

export const getCRUD = (state) => {
	let data = state.state.setCRUD;
	return data;
}

export const getErrorCRUD = (state) => {
	let data = state.state.setErrorCRUD;
	return data;
}