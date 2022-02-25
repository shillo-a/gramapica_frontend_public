import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";
import articleApi from "../../utils/apis/article.api";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: [],
    getFavoriteArticles: idle,
}

const getFavoriteArticles = createAsyncThunk('favoriteArticles/getFavoriteArticles', async(value=null, thunkAPI) => {

    try {
        const response = await articleApi.getFavoriteArticles()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const favoriteArticles = createSlice({
    name: 'favoriteArticles',
    initialState,
    reducers: {},
    extraReducers: {

        //getFavoriteArticles
        [getFavoriteArticles.pending]: (state) => {
            state.getFavoriteArticles = loading
        },
        [getFavoriteArticles.fulfilled]: (state, action) => {
            const favoriteArticles = action.payload;
            if(favoriteArticles){
                const transformedFavoriteArticles = favoriteArticles.map(item => (
                    articleTransform(item)
                ))
                state.data = transformedFavoriteArticles
            }
            
            state.getFavoriteArticles = succeeded
        },
        [getFavoriteArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getFavoriteArticles = {...failed, message, remarks};
        },

    }
})

//reducer
export default favoriteArticles.reducer;

//selectors
export const selectFavoriteArticles = state => {
    return state.favoriteArticles.data
};

//thunk action creators
export { 
    getFavoriteArticles
};