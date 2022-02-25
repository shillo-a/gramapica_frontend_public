import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpened: false
}

const globalLoaderSlice = createSlice({
    name: 'globalLoader',
    initialState,
    reducers: {
        openLoader: (state, action) => {
            state.isOpened = true;
        },
        hideLoader: (state, action) => {
            state.isOpened = false;
        },
    }
})

//reducer
export default globalLoaderSlice.reducer;

//selectors

//action creators
export const { openLoader, hideLoader } = globalLoaderSlice.actions;

//thunk action creators
