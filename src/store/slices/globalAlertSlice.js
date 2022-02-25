import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [
    // {id: '', body: '', type: ''}
]

const launchAlert = createAsyncThunk('globalAlert/launchAlert', 
    async(value, thunkAPI) => {

        const id = Math.random().toString(36).substr(2,9);
        thunkAPI.dispatch(globalAlertSlice.actions.addAlert({id, ...value}));

        return new Promise(resolve => {
            setTimeout(()=>{resolve(
                thunkAPI.dispatch(globalAlertSlice.actions.removeAlert(id))
            )}, 6000)
        })
        
    }
)

const globalAlertSlice = createSlice ({
    name: 'globalAlert',
    initialState,
    reducers: {
        addAlert: (state, action) => {
            state.push(action.payload)
        },
        removeAlert: (state, action) => {
            const removeIndex = state.map(item => item.id).indexOf(action.payload);
            state.splice(removeIndex, 1)
        }

    }
})

//reducer
export default globalAlertSlice.reducer;

//selectors

//action creators
export const { addAlert, removeAlert } = globalAlertSlice.actions;

//thunk action creators
export { launchAlert };