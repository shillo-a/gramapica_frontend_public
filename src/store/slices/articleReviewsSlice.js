import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";
import articleReviewApi from "../../utils/apis/articleReview.api";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";

const initialState = {
    data: [],
    putArticleReview: idle
}

const putArticleReview = createAsyncThunk('articleReviews/putArticleReview', async({articleId, articleReview}, thunkAPI) => {

    try {
        const response = await articleReviewApi.putArticleReview(articleId, articleReview)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const articleReviewsSlice = createSlice({
    name: 'articleReviews',
    initialState,
    reducers: {},
    extraReducers: {
        //putArticleReview
        [putArticleReview.pending]: (state) => {
            state.putArticleReview = loading
        },
        [putArticleReview.fulfilled]: (state, action) => {
            state.putArticleReview = succeeded
        },
        [putArticleReview.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putArticleReview = {...failed, message, remarks};
        },
    }
})

//reducer
export default articleReviewsSlice.reducer;


//selectors
// export const selectUserArticles = state => {
//     return state.userArticles.data
// };

//thunk action creators
export { 
    putArticleReview
};