import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: { parentId: null, type: 'write' }
}

const currentCommentTypeSlice = createSlice({
    name: 'currentCommentType',
    initialState,
    reducers: {
        changeCurrentCommentTypeSlice: (state, action) => {
            const commentType = action.payload;
            state.data = commentType;
        }
    },
    extraReducers: {}
})


//reducer
export default currentCommentTypeSlice.reducer;

//selectors
export const selectCurrentCommentTypeSlice = state => {
    return state.currentCommentType.data;
};

//action creators
export const { 
    changeCurrentCommentTypeSlice
} = currentCommentTypeSlice.actions;
