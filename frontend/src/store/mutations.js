export const setUserData = (state, data) => 
{
	state.state.user = data;
} 

export const setIndexCRUD = (state, data) => 
{
	state.state.data = data;
}

export const getCRUDbyID = (state, data) => 
{
	state.state.setCRUD = data;
} 

export const resetData = (state) => 
{
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
}

export const refreshCRUDdata = (state, id) => 
{
	let filterdata = state.state.data;
	let setfilter = [];
	
	for(var i = 0; i < filterdata.length; i++)
	{
		var getid = filterdata[i]._id.toString();
		if(getid != id)
		{
			setfilter.push(filterdata[i]);
		}
	}
	
	state.state.data = setfilter;
} 

export const removeAccount = (state, data) => 
{
	state.state.user = {};
} 

export const setError = (state, data) => 
{
	let seterror = data.name;
	let statedata = state.state;
	let geterror = null;
	for (const [key, value] of Object.entries(statedata)) {
	  if(key == data.name)
	  {
		geterror = value;
	  }
	}
	
	if(geterror == null)
	{
		alert("ERROR WHILE SHOW ERROR DATA!!");
	}
	else
	{
		let setdata = data.data;
		for(var i = 0; i < setdata.length; i++)
		{		
			let getstring = setdata[i].split(" ")[0];
			for (const [key, value] of Object.entries(geterror)) {
				if(key == getstring)
				{
					geterror[key].push(setdata[i]);
				}
			}
		}
	}
}