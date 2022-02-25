import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "../../utils/apis/comment.api";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { commentTransform } from "../transformations/comment.transform";
// import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: [],
    getPublishedArticleComments: idle,
    getPublishedArticleNewComments: idle,
    getPublishedArticleUserComments: idle,
    postPublishedArticleComment: idle,
    deletePublishedArticleComment: idle,
    putPublishedArticleComment: idle,
}

const getPublishedArticleComments = createAsyncThunk('publishedArticleComments/getPublishedArticleComments', async (articleId, thunkAPI) => {

    try {
        const response = await commentApi.getPublishedArticleComments(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getPublishedArticleNewComments = createAsyncThunk('publishedArticleComments/getPublishedArticleNewComments', async ({articleId, lastUpdatedAt}, thunkAPI) => {

    try {
        const response = await commentApi.getPublishedArticleNewComments(articleId, lastUpdatedAt)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const getPublishedArticleUserComments = createAsyncThunk('publishedArticleComments/getPublishedArticleUserComments', async (userKey, thunkAPI) => {

    try {
        const response = await commentApi.getPublishedArticleUserComments(userKey)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const postPublishedArticleComment = createAsyncThunk('publishedArticleComments/postPublishedArticleComment', async ({articleId, comment}, thunkAPI) => {

    try {
        const response = await commentApi.postPublishedArticleComment(articleId, comment)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const deletePublishedArticleComment = createAsyncThunk('publishedArticleComments/deletePublishedArticleComment', async (commentId, thunkAPI) => {

    try {
        const response = await commentApi.deletePublishedArticleComment(commentId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const putPublishedArticleComment = createAsyncThunk('publishedArticleComments/putPublishedArticleComment', async ({commentId, comment}, thunkAPI) => {

    try {
        const response = await commentApi.putPublishedArticleComment(commentId, comment)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const publishedArticleCommentsSlice = createSlice({
    name: 'publishedArticleComments',
    initialState,
    reducers: {
        clearPublishedArticleComments: (state, action) => {
            return initialState
        }
    },
    extraReducers: {

        //getPublishedArticleComments
        [getPublishedArticleComments.pending]: (state) => {
            state.getPublishedArticleComments = loading
        },
        [getPublishedArticleComments.fulfilled]: (state, action) => {
            const publishedArticleComments = action.payload;
            if(publishedArticleComments){
                const transformedPublishedArticleComments= publishedArticleComments.map(item => (
                    commentTransform(item)
                ))
                state.data = transformedPublishedArticleComments
            }
            
            state.getPublishedArticleComments = succeeded
        },
        [getPublishedArticleComments.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPublishedArticleComments = {...failed, message, remarks};
        },

        //getPublishedArticleNewComments
        [getPublishedArticleNewComments.pending]: (state) => {
            state.getPublishedArticleNewComments = loading
        },
        [getPublishedArticleNewComments.fulfilled]: (state, action) => {

            const publishedArticleNewComments = action.payload;
            if(publishedArticleNewComments){
                
                // 1. Приводим статьи к необходимому виду
                const transformedPublishedArticleNewComments = publishedArticleNewComments.map(item => (
                    commentTransform(item)
                ))

                transformedPublishedArticleNewComments.forEach(newComment => {
                    
                    const newCommentIndex = state.data.findIndex(item => item.id === newComment.id);
                    // 2. Обновленные/ удаленные комментарии (уже раннее загруженные) изменяем по месту
                    // 3. Новые статьи добавляем в конец очереди
                    if(newCommentIndex >= 0){
                        state.data.splice(newCommentIndex, 1, newComment);
                    } else {
                        state.data.push(newComment)
                    }

                })
            }
            
            state.getPublishedArticleNewComments = succeeded
        },
        [getPublishedArticleNewComments.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPublishedArticleNewComments = {...failed, message, remarks};
        },

        //getPublishedArticleUserComments
        [getPublishedArticleUserComments.pending]: (state) => {
            state.getPublishedArticleUserComments = loading
        },
        [getPublishedArticleUserComments.fulfilled]: (state, action) => {
            const getPublishedArticleUserComments = action.payload;
            if(getPublishedArticleUserComments){
                const transformedPublishedArticleUserComments= getPublishedArticleUserComments.map(item => (
                    commentTransform(item)
                ))
                state.data = transformedPublishedArticleUserComments
            }
            
            state.getPublishedArticleUserComments = succeeded
        },
        [getPublishedArticleUserComments.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getPublishedArticleUserComments = {...failed, message, remarks};
        },
        
        //postPublishedArticleComment
        [postPublishedArticleComment.pending]: (state) => {
            state.postPublishedArticleComment = loading
        },
        [postPublishedArticleComment.fulfilled]: (state, action) => {
            const postedPublishedArticleComment = action.payload;
            if(postedPublishedArticleComment){
                const transformedPostedPublishedArticleComment = commentTransform(postedPublishedArticleComment)
                state.data.push(transformedPostedPublishedArticleComment)
            }
            
            state.postPublishedArticleComment = succeeded
        },
        [postPublishedArticleComment.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.postPublishedArticleComment = {...failed, message, remarks};
        },

        //deletePublishedArticleComment
        [deletePublishedArticleComment.pending]: (state) => {
            state.deletePublishedArticleComment = loading
        },
        [deletePublishedArticleComment.fulfilled]: (state, action) => {
            const deletedPublishedArticleCommentId = Number(action.payload);
    
            //Просто помечаем как архивированную
            const index = state.data.findIndex((item) => item.id === deletedPublishedArticleCommentId);
            state.data[index].isArchived = true;

            state.deletePublishedArticleComment = succeeded;
        },
        [deletePublishedArticleComment.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.deletePublishedArticleComment = {...failed, message, remarks};
        },

        //putPublishedArticleComment
        [putPublishedArticleComment.pending]: (state) => {
            state.putPublishedArticleComment = loading
        },
        [putPublishedArticleComment.fulfilled]: (state, action) => {
            const updatedPublishedArticleCommentId = Number(action.payload);
            const updatedComment = action.meta.arg.comment;

            //Изменяем тело комментария
            const index = state.data.findIndex((item) => item.id === updatedPublishedArticleCommentId);
            state.data[index].body = updatedComment.body;

            state.putPublishedArticleComment = succeeded;
        },
        [putPublishedArticleComment.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putPublishedArticleComment = {...failed, message, remarks};
        },

    }
})


//reducer
export default publishedArticleCommentsSlice.reducer;

//selectors
export const selectPublishedArticleComments = state => {
    return state.publishedArticleComments.data;
};

//повторяем, чтобы потом, если что перенести
// + не отображаем удаленные комментарии в профиле (они выступают в качестве заглушек в иерархии)
export const selectPublishedArticleUserComments = state => {
    let nonDeletedComments = state.publishedArticleComments.data.filter(item => item.isArchived !== true)
    return nonDeletedComments;
};

export const selectPublishedArticleCommentsLastUpdateAt = state => {

    let allUpdatedAt = state.publishedArticleComments.data.map(item => (new Date(item.updatedAt)));
    let lastUpdatedAt = new Date(Date.now()).toISOString();
    if(allUpdatedAt.length > 0){
        lastUpdatedAt = new Date(Math.max(...allUpdatedAt)).toISOString();
    }
    return lastUpdatedAt

}

export const selectGetPublishedArticleNewCommentsStatus = state => {
    return state.publishedArticleComments.getPublishedArticleNewComments
}

export const selectGetPublishedArticleCommentsStatus = state => {
    return state.publishedArticleComments.getPublishedArticleComments
}


//action creators
export const { 
    clearPublishedArticleComments
} = publishedArticleCommentsSlice.actions;

//thunk action creators
export {
    getPublishedArticleComments,
    getPublishedArticleNewComments,
    getPublishedArticleUserComments,
    postPublishedArticleComment,
    deletePublishedArticleComment,
    putPublishedArticleComment
};


// new Date(Math.max(...a.map(e => new Date(e.MeasureDate))));
// state.publishedArticleComments.data;