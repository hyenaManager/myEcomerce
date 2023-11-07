import { createSlice } from "@reduxjs/toolkit";

export const redeemSlice = createSlice({
    name:"redeem",
    initialState:{value:79},
    reducers:{
        reduceRedeem:(state,action)=>{
            state.value = state.value - action.payload
        },
        increaseRedeem:(state,action)=>{
            state.value = state.value + action.payload
        }
    }
})

export const {reduceRedeem,increaseRedeem} = redeemSlice.actions

export default redeemSlice.reducer