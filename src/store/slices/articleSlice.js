import { createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: {
        id: '',
        name: '',
        tags: [],
        sections: [],
        reviews: []
    },

    getUserArticle: idle,
    getPublishedArticle: idle
}

const getUserArticle = createAsyncThunk('article/getUserArticle', async (articleId, thunkAPI) => {

    try {
        const response = await articleApi.getUserArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getPublishedArticle = createAsyncThunk('article/getPublishedArticle', async (articleId, thunkAPI) => {

    try {
        const response = await articleApi.getPublishedArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})


const articleSlice = createSlice({
    name: 'article',
    initialState,

    reducers: {
        clearArticle: (state, action) => {
            return initialState
        },
    },
    extraReducers: {
        //getUserArticle
        [getUserArticle.pending]: (state) => {
            state.getUserArticle = loading
        },
        [getUserArticle.fulfilled]: (state, action) => {
            const article = action.payload;
            if(article){
                const transformedDraftArticle = articleTransform(article);
                state.data = transformedDraftArticle;
            }
            state.getUserArticle = succeeded
        },
        [getUserArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getUserArticle = {...failed, message, remarks};
        },

        //getPublishedArticle
        [getPublishedArticle.pending]: (state) => {
            state.getPublishedArticle = loading
        },
        [getPublishedArticle.fulfilled]: (state, action) => {
            const article = action.payload;
            
            if(article){
                const transformedDraftArticle = articleTransform(article);
                state.data = transformedDraftArticle;
            }
            state.getPublishedArticle = succeeded
        },
        [getPublishedArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPublishedArticle = {...failed, message, remarks};
        },
    }
})

//reducer
export default articleSlice.reducer;


//selectors
export const selectArticle = state => {
    return state.article.data;
};

export const selectGetPublishedArticle = state => {
    return state.article.getPublishedArticle
}

//action creators
export const { 
    clearArticle
} = articleSlice.actions;

//thunk action creators
export { 
    getUserArticle,
    getPublishedArticle
};