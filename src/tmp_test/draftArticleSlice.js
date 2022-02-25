import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import articleApi from '../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../utils/apis/config/statuses";

const initialState = {
    data: null,
    deleteDraftArticle: idle
}

const deleteDraftArticle = createAsyncThunk('draftArticleSlice/deleteDraftArticle', async(articleId, thunkAPI) => {

    try {
        const response = await articleApi.deleteDraftArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const draftArticleSlice = createSlice({
    name: 'draftArticleSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [deleteDraftArticle.pending]: (state) => {
            state.deleteDraftArticle = loading;
        },
        [deleteDraftArticle.fulfilled]: (state, action) => {
            state.deleteDraftArticle = succeeded
        },
        [deleteDraftArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.deleteDraftArticle = {...failed, message, remarks};
        },
    }
})

//reducer
export default draftArticleSlice.reducer;

//selectors
// export const selectDraftArticlesHeaders = state => {
//     return state.draftArticlesHeaders.data
// };

// //action creators
// export const { 
//     addArticleName, 
//     addTags,
//     addSection,  
//     deleteSection, 
//     changeSectionPosition,
//     changeSection
// } = currentArticleSlice.actions;

//thunk action creators
export { 
    deleteDraftArticle
};