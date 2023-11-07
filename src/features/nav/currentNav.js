import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
    name:"currentNav",
    initialState:{value:"/home"},
    reducers:{
        setCurrentNav:(state,action)=>{
            state.value = action.payload
        },
    }
})

export const {setCurrentNav} = navigationSlice.actions

export default navigationSlice.reducer