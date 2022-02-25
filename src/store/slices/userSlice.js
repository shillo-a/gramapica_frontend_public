import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from '../../utils/apis/user.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { userTransform } from "../transformations/user.transform";

const initialState = {
    data: null,
    getUser: idle
}


const getUser = createAsyncThunk('user/getUser', async(userKey, thunkAPI) => {

    //Проверяем, является ли текущий пользователь тем пользователем, по которому завпрашивается информация
    // const store = thunkAPI.extra.store;
    // const state = store.getState();
    // const currentUser = state.authentication.data;
    // const currentUserIsOwner = currentUser.username === userKey;

    try {
        const response = await userApi.getUser(userKey)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getUser.pending]: (state) => {
            state.getUser = loading
        },
        [getUser.fulfilled]: (state, action) => {
            const user = action.payload
            if(user){
                const transformedUser = userTransform(user);
                state.data = transformedUser;
            }
            state.getUser = succeeded
        },
        [getUser.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getUser = {...failed, message, remarks};
        },
    }
})

//reducer
export default userSlice.reducer;

//selectors
export const selectUser = state => {
    return state.user.data
};

export const selectGetUserStatus = state => {
    return state.user.getUser
};

// action creators
// export const { clearPostSignup, clearPostLogin, logOff } = authenticationSlice.actions;

// thunk action creators
export { 
    getUser
};