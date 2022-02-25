import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentItem: {id: 1, name: 'Мир', namePP: 'Мире'},
    items: [
        {id: 1, name: 'Мир', namePP: 'Мире'},
        {id: 2, name: 'Москва', namePP: 'Москве'},
        {id: 3, name: 'Санкт-Петербург', namePP: 'Санкт-Петербурге'},
        {id: 4, name: 'Новосибирск', namePP: 'Новосибирске'},
        {id: 5, name: 'Екатеринбург', namePP: 'Екатеринбурге'},
    ]
}

const globalLocationSlice = createSlice({
    name: 'globalLocation',
    initialState,
    reducers: {
        changeGlobalLocation : (state, action) => {
            const newCurrentItem = state.items.find(item => (item.id === action.payload));
            state.currentItem = newCurrentItem;
        }
    }
})

//reducer
export default globalLocationSlice.reducer;

//selectors
export const selectGlobalLocation = state => {
    let items = state.globalLocation.items.map(item => ({id: item.id, name: item.name}))
    let currentItem = {id: state.globalLocation.currentItem.id, name: state.globalLocation.currentItem.name}
    return {currentItem, items}
};

export const selectGlobalLocationPP = state => {
    let items = state.globalLocation.items.map(item => ({id: item.id, name: item.namePP}))
    let currentItem = {id: state.globalLocation.currentItem.id, name: state.globalLocation.currentItem.namePP}
    return {currentItem, items}
};

//action creators
export const { changeGlobalLocation } = globalLocationSlice.actions;