import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    searchTerm:"",
    sortKey:"name",
    sortOrder:"asc",
    selectedUserId:0
}

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUsersState:(state,action) => {
            state.users = [...action.payload];
        },
        setSearchTerm:(state,action) =>{
            state.searchTerm = action.payload;
        },
        setSortKey:(state,action)=>{
            state.sortKey = action.payload;
        },
        setSortOrder:(state,action)=>{
            state.sortOrder = action.payload;
        },
        setSelectedUserId:(state,action)=>{
            state.selectedUserId = action.payload;
        }
    }
})

export const {setSearchTerm,setSelectedUserId,setSortOrder,setUsersState,setSortKey} = usersSlice.actions;
export default usersSlice.reducer;