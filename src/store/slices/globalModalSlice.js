import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalType: '',
    isOpened: false,
    isConfirmed: false,
    isDeclined: false
}

// Для модальных окон, где треубется асинхронно принять решение
const launchModal = createAsyncThunk('globalModal/launchModal', 
    async (value, thunkAPI) => {

        const store = thunkAPI.extra.store;
        thunkAPI.dispatch(globalModalSlice.actions.openModal(value));

        return new Promise(resolve => {
            const unsubscribe = store.subscribe(() => {
                const state = store.getState();

                if (state.globalModal.isConfirmed) {
                    unsubscribe();
                    thunkAPI.dispatch(globalModalSlice.actions.hideModal());
                    resolve(true);
                }

                if (state.globalModal.isDeclined) {
                    unsubscribe();
                    thunkAPI.dispatch(globalModalSlice.actions.hideModal());
                    resolve(false);
                }

            })
        })

    }
)

const globalModalSlice = createSlice({
    name: 'globalModal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpened = true;
            state.modalType = action.payload;
        },
        hideModal: (state, action) => {
            state.isOpened = false;
            state.isConfirmed = false;
            state.isDeclined = false;
        },
        confirmModal: (state, action) => {
            state.isConfirmed = true;
        },
        declineModal: (state, action) => {
            state.isDeclined = true;
        }
    },
    extraReducers: {
        
    }
})

//reducer
export default globalModalSlice.reducer;

//selectors

//action creators
export const { openModal, hideModal, confirmModal, declineModal } = globalModalSlice.actions;

//thunk action creators
export { launchModal };