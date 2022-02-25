import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import tagApi from '../../utils/apis/tag.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";

const initialState = {
    tags: [],
    getTags: idle
}

const getTags = createAsyncThunk('tag/getTags', async() => {
    try {
        const response = await tagApi.getTags()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const tagSlice = createSlice ({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: {
        [getTags.pending]: (state) => {
            state.getTags = loading
        },
        [getTags.fulfilled]: (state, action) => {
            const tags = action.payload
            if(tags){state.tags = tags}
            state.getTags = succeeded
        },
        [getTags.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getTags = {...failed, message, remarks};
        },
    }
})

//reducer
export default tagSlice.reducer;

//selectors
export const selectTags = state => {
    return state.tag.tags || []
};

export const selectGetTagsStatus = state => {
    return state.tag.getTags || {}
};

//action creators
// export const { addAlert, removeAlert } = globalAlertSlice.actions;

//thunk action creators
export { getTags };