import { createSlice  } from "@reduxjs/toolkit";
const collectionSlice =createSlice({
    name:"collection",
    initialState:{
        liked:[]
    },
    reducers:{
        AddLikedItem(state,action){
            const exists = state.liked.find((item)=>item._id===action.payload._id);
            if(!exists){
                state.liked.push(action.payload)
            }
        },
        RemoveLikedItem(state,action){
            state.liked=state.liked.filter((item)=>item._id !== action.payload._id)
        }
    }
})
export const {AddLikedItem,RemoveLikedItem}=collectionSlice.actions;
export default collectionSlice.reducer;