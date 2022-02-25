import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authenticationApi from '../../utils/apis/authentication.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { userTransform } from "../transformations/user.transform";

const initialState = {
    //currentUser header
    data: {},
    postSignup: idle,
    postLogin: idle,
    postTokenValidity: idle,
    logOff: idle,
    putAuthUser: idle
}

const postSignup = createAsyncThunk('authenticationSlice/postSignup', async ({ email, username, password, password2 }, thunkAPI) => {
    try {
        const response = await authenticationApi.postSignup(email, username, password, password2)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const postLogin = createAsyncThunk('authenticationSlice/postLogin', async({ email, password }, thunkAPI) => {
    try {
        const response = await authenticationApi.postLogin(email, password)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const postTokenValidity = createAsyncThunk('authenticationSlice/postTokenValidity', async(value=null, thunkAPI) => {
    try {
        const response = await authenticationApi.postTokenValidity()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const putAuthUser = createAsyncThunk('authenticationSlice/putAuthUser', async(user, thunkAPI) => {

    try {
        const response = await authenticationApi.putAuthUser(user)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }

})

const authenticationSlice = createSlice({
    name: 'authenticationSlice',
    initialState,
    reducers: {
        clearPostSignup : (state, action) => {
            state.postSignup = idle
        },
        clearPostLogin : (state, action) => {
            state.postLogin = idle
        },
        logOff : (state, action) => {
            //Удаляем JWT-token из localStorage!
            localStorage.removeItem('user')
            //Возвращаем значения к init
            state.data = initialState.data
            state.logOff = succeeded
        }
    },
    extraReducers: {
        //postSignup
        [postSignup.pending]: (state) => {
            state.postSignup = loading
        },
        [postSignup.fulfilled]: (state, action) => {
            state.postSignup = succeeded
        },
        [postSignup.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.postSignup = {...failed, message, remarks};
        },

        //postLogin
        [postLogin.pending]: (state) => {
            state.postLogin = loading
        },
        [postLogin.fulfilled]: (state, action) => {
            
            const user = action.payload
            //Сохраняем информацию о пользователе в store
            if(user){
                const transformedUser = userTransform(user);
                state.data = transformedUser;
                //Сохраняем JWT-token в localStorage!
                localStorage.setItem('user', JSON.stringify(transformedUser));
            }

            state.postLogin = succeeded
        },
        [postLogin.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.postLogin = {...failed, message, remarks};
        },

        //postTokenValidity
        [postTokenValidity.pending]: (state) => {
            state.postTokenValidity = loading
        },
        [postTokenValidity.fulfilled]: (state, action) => {

            const user = action.payload
            //Сохраняем информацию о пользователе в store
            if(user){
                const transformedUser = userTransform(user);
                state.data = transformedUser;
            }

            state.postTokenValidity = succeeded
        },
        [postTokenValidity.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.postTokenValidity = {...failed, message, remarks};
        },

        //putAuthUser
        [putAuthUser.pending]: (state) => {
            state.putAuthUser = loading;
        },
        [putAuthUser.fulfilled]: (state, action) => {
            const user = action.meta.arg;
            const userUpdated = action.payload;
            
            //Сохраняем информацию о пользователе в store
            if(userUpdated){
                state.data = user;
            }
            state.putAuthUser = succeeded;
        },
        [putAuthUser.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putAuthUser = {...failed, message, remarks};
        },
    }
})

//reducer
export default authenticationSlice.reducer;

//selectors
export const selectSignupStatus = state => {
    return state.authentication.postSignup
};

export const selectLoginStatus = state => {
    return state.authentication.postLogin
};

export const selectTokenValidityStatus = state => {
    return state.authentication.postTokenValidity
};

export const selectCurrentUser = state => {
    return state.authentication.data
}

//action creators
export const { clearPostSignup, clearPostLogin, logOff } = authenticationSlice.actions;

//thunk action creators
export { 
    postSignup,
    postLogin,
    postTokenValidity,
    putAuthUser
};


// .catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });