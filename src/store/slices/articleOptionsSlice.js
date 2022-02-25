import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: { },
    getArticleOptions: idle,
}

const getArticleOptions = createAsyncThunk('articleOptions/getArticleOptions', async (articleId, thunkAPI) => {

    try {
        const response = await articleApi.getArticleOptions(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const articleOptionsSlice = createSlice({
    name: 'articleOptions',
    initialState,

    reducers: {
        clearArticleOptions: (state, action) => {
            return initialState
        },
    },
    extraReducers: {
        //getArticleOptions
        [getArticleOptions.pending]: (state) => {
            state.getArticleOptions = loading
        },
        [getArticleOptions.fulfilled]: (state, action) => {
            const articleOptions = action.payload;
            if(articleOptions){
                const transformedArticleOptions = articleTransform(articleOptions);
                state.data = transformedArticleOptions;
            }
            state.getArticleOptions = succeeded
        },
        [getArticleOptions.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getArticleOptions = {...failed, message, remarks};
        },
    }
})

//reducer
export default articleOptionsSlice.reducer;

//action creators
export const { 
    clearArticleOptions
} = articleOptionsSlice.actions;

//thunk action creators
export { 
    getArticleOptions
};

//selectors
export const selectArticleOptions = state => {
    return state.articleOptions.data;
};

export const selectGetArticleOptionsStatus = state => {
    return state.articleOptions.getArticleOptions.status;
};