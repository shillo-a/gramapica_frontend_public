import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { articleTransform } from "../transformations/article.transform";

// Все разновидности опубликованных статей
const initialState = {
    data: [],

    getNewestPublishedArticles: idle,
    getPopularPublishedArticles: idle,
}

const getNewestPublishedArticles = createAsyncThunk('publishedArticles/getNewestPublishedArticles', async({pageNum, regionName}, thunkAPI) => {

    try {
        const response = await articleApi.getNewestPublishedArticles(pageNum, regionName)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getPopularPublishedArticles = createAsyncThunk('publishedArticles/getPopularPublishedArticles', async({pageNum, regionName, timePeriod}, thunkAPI) => {

    try {
        const response = await articleApi.getPopularPublishedArticles(pageNum, regionName, timePeriod)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const publishedArticlesSlice = createSlice({
    name: 'publishedArticles',
    initialState,
    reducers: {
        clearPublishedArticles: (state, action) => {
            return initialState
        }
    },
    extraReducers: {

        // getNewestPublishedArticles
        [getNewestPublishedArticles.pending]: (state) => {
            state.getNewestPublishedArticles = loading;
        },
        [getNewestPublishedArticles.fulfilled]: (state, action) => {
            const newestPublishedArticles = action.payload;
            
            if(newestPublishedArticles.length > 0){
                const transformedNewestPublishedArticles = newestPublishedArticles.map(item => (
                    articleTransform(item)
                ))
                state.data = transformedNewestPublishedArticles;
            }

            state.getNewestPublishedArticles = succeeded;
        },
        [getNewestPublishedArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getNewestPublishedArticles = {...failed, message, remarks};
        },

        // getPopularPublishedArticles
        [getPopularPublishedArticles.pending]: (state) => {
            state.getPopularPublishedArticles = loading;
        },
        [getPopularPublishedArticles.fulfilled]: (state, action) => {
            
            const popularPublishedArticles = action.payload;
            console.log(popularPublishedArticles)
            if(popularPublishedArticles.length > 0){
                const transformedPopularPublishedArticles = popularPublishedArticles.map(item => (
                    articleTransform(item)
                ))
                state.data = transformedPopularPublishedArticles;
            }

            state.getPopularPublishedArticles = succeeded;
        },
        [getPopularPublishedArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPopularPublishedArticles = {...failed, message, remarks};
        },
    }
})

//reducer
export default publishedArticlesSlice.reducer;

//selectors
export const selectPublishedArticles = state => {
    return state.publishedArticles.data;
};


//action creators
export const { 
    clearPublishedArticles
} = publishedArticlesSlice.actions;

//thunk action creators
export { 
    getNewestPublishedArticles,
    getPopularPublishedArticles
};