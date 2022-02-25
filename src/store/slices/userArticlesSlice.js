import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";
import articleApi from "../../utils/apis/article.api";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: [],
    getUserArticles: idle,
    getUserPublishedArticles: idle,
    putUserArticleStatus: idle,
    deleteUserArticle: idle,
}

const getUserArticles = createAsyncThunk('userArticles/getUserArticles', async(value=null, thunkAPI) => {

    try {
        const response = await articleApi.getUserArticles()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getUserPublishedArticles = createAsyncThunk('userArticles/getUserPublishedArticles', async(userKey, thunkAPI) => {

    try {
        const response = await articleApi.getUserPublishedArticles(userKey)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }

})

const putUserArticleStatus = createAsyncThunk('userArticles/putUserArticleStatus', async({articleId, statusName}, thunkAPI) => {

    try {
        const response = await articleApi.putUserArticleStatus(articleId, statusName);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

const deleteUserArticle = createAsyncThunk('userArticles/deleteUserArticle', async(articleId, thunkAPI) => {

    try {
        const response = await articleApi.deleteUserArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const userArticles = createSlice({
    name: 'userArticles',
    initialState,
    reducers: {},
    extraReducers: {
        //getUserArticles
        [getUserArticles.pending]: (state) => {
            state.getUserArticles = loading
        },
        [getUserArticles.fulfilled]: (state, action) => {
            const userArticles = action.payload;
            if(userArticles){
                const transformedUserArticles = userArticles.map(item => (
                    articleTransform(item)
                ))
                state.data = transformedUserArticles
            }
            
            state.getUserArticles = succeeded
        },
        [getUserArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getUserArticles = {...failed, message, remarks};
        },

        //getUserPublishedArticles
        [getUserPublishedArticles.pending]: (state) => {
            state.getUserPublishedArticles = loading
        },
        [getUserPublishedArticles.fulfilled]: (state, action) => {
            const userPublishedArticles = action.payload;
            
            if(userPublishedArticles){
                const transformedUserPublishedArticles = userPublishedArticles.map(item => (
                    articleTransform(item)
                ))
                state.data = transformedUserPublishedArticles
            }

            state.getUserPublishedArticles = succeeded
        },
        [getUserPublishedArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getUserPublishedArticles = {...failed, message, remarks};
        },

        //putUserArticleStatus
        [putUserArticleStatus.pending]: (state, action) => {
            state.putUserArticleStatus = loading;
        },
        [putUserArticleStatus.fulfilled]: (state, action) => {
            //удаляем статью из userAricles
            const deletedArticleId = action.meta.arg.articleId
            const index = state.data.findIndex((item) => item.id === deletedArticleId)
            state.data.splice(index, 1)

            state.putUserArticleStatus = succeeded;
        },
        [putUserArticleStatus.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putUserArticleStatus = {...failed, message, remarks};
        },

        // deleteUserArticle
        [deleteUserArticle.pending]: (state) => {
            state.deleteUserArticle = loading;
        },
        [deleteUserArticle.fulfilled]: (state, action) => {
            //удаляем статью из userAricles
            const deletedArticleId = action.meta.arg;
            const index = state.data.findIndex((item) => item.id === deletedArticleId);
            state.data.splice(index, 1);

            state.deleteUserArticle = succeeded;
        },
        [deleteUserArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.deleteUserArticle = {...failed, message, remarks};
        },

    }
})

//reducer
export default userArticles.reducer;

//selectors
export const selectUserArticles = state => {
    return state.userArticles.data
};

//thunk action creators
export { 
    getUserArticles,
    getUserPublishedArticles,
    putUserArticleStatus,
    deleteUserArticle
};