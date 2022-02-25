import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";

// Все разновидности опубликованных статей (кол-во страниц для отражения)
const initialState = {
    data: 1,
    getNewestPublishedArticlesTotalPages: idle,
    getPopularPublishedArticlesTotalPages: idle,
}

const getNewestPublishedArticlesTotalPages = createAsyncThunk('publishedArticlesTotalPages/getNewestPublishedArticlesTotalPages', async({regionName}, thunkAPI) => {

    try {
        const response = await articleApi.getNewestPublishedArticlesTotalPages(regionName)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getPopularPublishedArticlesTotalPages = createAsyncThunk('publishedArticlesTotalPages/getPopularPublishedArticlesTotalPages', async({regionName}, thunkAPI) => {

    try {
        const response = await articleApi.getPopularPublishedArticlesTotalPages(regionName)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const publishedArticlesTotalPagesSlice = createSlice({
    name: 'publishedArticlesTotalPages',
    initialState,
    reducers: {
        clearPublishedArticlesTotalPages: (state, action) => {
            return initialState
        }
    },
    extraReducers: {

        // getNewestPublishedArticlesTotalPages
        [getNewestPublishedArticlesTotalPages.pending]: (state) => {
            state.getNewestPublishedArticlesTotalPages = loading;
        },
        [getNewestPublishedArticlesTotalPages.fulfilled]: (state, action) => {
            const newestPublishedArticlesTotalPages = action.payload;

            if(newestPublishedArticlesTotalPages > 0){
                state.data = newestPublishedArticlesTotalPages;
            }

            state.getNewestPublishedArticlesTotalPages = succeeded;
        },
        [getNewestPublishedArticlesTotalPages.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getNewestPublishedArticlesTotalPages = {...failed, message, remarks};
        },

        // getPopularPublishedArticlesTotalPages
        [getPopularPublishedArticlesTotalPages.pending]: (state) => {
            state.getPopularPublishedArticlesTotalPages = loading;
        },
        [getPopularPublishedArticlesTotalPages.fulfilled]: (state, action) => {
            const popularPublishedArticlesTotalPages = action.payload;

            if(popularPublishedArticlesTotalPages > 0){
                state.data = popularPublishedArticlesTotalPages;
            }

            state.getPopularPublishedArticlesTotalPages = succeeded;
        },
        [getPopularPublishedArticlesTotalPages.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPopularPublishedArticlesTotalPages = {...failed, message, remarks};
        },


    }
})

//reducer
export default publishedArticlesTotalPagesSlice.reducer;

//selectors
export const selectPublishedArticlesTotalPages = state => {
    return state.publishedArticlesTotalPages.data
};

//action creators
export const { 
    clearPublishedArticlesTotalPages
} = publishedArticlesTotalPagesSlice.actions;

//thunk action creators
export { 
    getNewestPublishedArticlesTotalPages,
    getPopularPublishedArticlesTotalPages
};