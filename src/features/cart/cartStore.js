import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name:"cart",
    initialState:{value:[]},
    reducers:{
        addCart: (state,action)=>{
            state.value=[
                ...state.value,
                action.payload
            ]
        },
        removeCart:(state,action)=>{
           state.value = state.value.filter((data)=>data.id !== action.payload.id)
    },
        increaseQuantity:(state,action)=>{
            state.value = state.value.map((cart)=>{
                if (cart.id === action.payload.id){
                    return action.payload
                }
                return cart
            })
        },
        decreaseQuantity:(state,action)=>{
            state.value = state.value.map((cart)=>{
                if (cart.id === action.payload.id){
                    return action.payload
                }
                return cart
            })
        },
        clearCarts:(state)=>{
            state.value = []
        }
    }
})
export const {addCart,removeCart,increaseQuantity,decreaseQuantity,clearCarts} = cartSlice.actions

export default cartSlice.reducer