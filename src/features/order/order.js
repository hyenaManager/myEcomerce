import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const orderSlice = createSlice({
    name:"order",
    initialState:{value:[]},
    reducers:{
        makeANewOrder:(state,action)=>{
            let order = {
                ...action.payload,
                id:uuidv4().slice(0,6),
                orderCode:uuidv4().slice(0,6),
            }
            state.value=[
                ...state.value,
                order
            ]
        },
        deleteOrder:(state,action)=>{
            state.value=state.value.filter((cart)=>cart.id !==action.payload.id)
        },
    }
})

export const {makeANewOrder,deleteOrder} = orderSlice.actions

export default orderSlice.reducer;