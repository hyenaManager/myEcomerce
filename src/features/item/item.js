import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getItems = async()=>{
    const items = await axios.get("http://localhost:8000/items")
    return items
}

export const itemSlice = createSlice({
    name:"items",
    initialState:{value: getItems()},
    reducers:{

    }
})
