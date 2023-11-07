import { createSlice } from "@reduxjs/toolkit";

export const itemsTypeSlice = createSlice({
    name:"itemType",
    initialState:{value:"all"},
    reducers:{
        setItemType:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setItemType} = itemsTypeSlice.actions
export default itemsTypeSlice.reducer