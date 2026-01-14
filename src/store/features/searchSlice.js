import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchMedia = createAsyncThunk(
    "search/fetchMedia",
    async ({page,query,activeTab}, { rejectWithValue }) => {
        try {

            if (!query || query.trim() === "") return [];
            const res = await fetch(`/api/search?q=${query}&type=${activeTab}&page=${page}`);
            if (!res.ok) throw new Error("Failed to fetch media");
            const data = await res.json();
            return data.results;
        }catch(err){
            return rejectWithValue(err.message);
        }
    }
)
const initialState = {
    query: "cat",
    activeTab: "photo",
    results: []
}
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
            state.results = [];
        },
        setActiveTab(state, action) {
            state.activeTab = action.payload;
            state.results = [];
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMedia.pending,(state)=>{

        })
        .addCase(fetchMedia.fulfilled,(state,action)=>{
            state.results.push(...action.payload);
        })
        .addCase(fetchMedia.rejected,(state,action)=>{
            
        })
    }
})

export const { setQuery, setActiveTab, setResults } = searchSlice.actions;

export default searchSlice.reducer;