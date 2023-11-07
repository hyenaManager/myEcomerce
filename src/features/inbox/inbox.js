import { createSlice } from "@reduxjs/toolkit";

export const inboxSlice = createSlice({
    name:"inbox",
    initialState:{value:[
        {
          sender: "admin",
          id: 0,
          title: "noticing",
          type: "primary",
          message:
            "dear user your order have been canceled due to unavailable products sorry for unconvinence of us ,thank you for your ordering",
          watched: false,
        },
        {
          sender: "admin",
          id: 1,
          title: "success purchasement",
          type: "primary",
          message: "Dear user your your purchasement is success order code-6Y2D7UM",
          watched: false,
        },
        {
          sender: "admin",
          id: 2,
          type: "new item",
          title: "new item",
          message: "dear user there is new item we added check it out",
          watched: false,
        },
      ]},
      reducers:{
        deleteUserInboxMessage:(state,action)=>{
            state.value = state.value.filter((message)=>message.id !== action.payload.id)
        },
        addUserInboxMessage:(state,action)=>{
            state.value = [
                ...state.value,
                action.payload
            ]
        },
        watchUserInboxMessage:(state,action)=>{
            state.value = state.value.map((message)=>{
                if (message.id === action.payload.id){
                    return {
                        ...action.payload,
                        watched:true
                    }
                }
                return message
            })
        }
      }
})

export const {deleteUserInboxMessage,addUserInboxMessage,watchUserInboxMessage} = inboxSlice.actions
export default inboxSlice.reducer