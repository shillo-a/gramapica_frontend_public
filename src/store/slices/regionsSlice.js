import { createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

import regionApi from "../../utils/apis/region.api";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { regionTransform } from "../transformations/region.transform";

const initialState = {
    data: [],

    getRegions: idle
}

const getRegions = createAsyncThunk('regions/getRegions', async (value=null, thunkAPI) => {

    try {
        const response = await regionApi.getRegions()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const regionsSlice = createSlice({
    name: 'regions',
    initialState,

    reducers: {
        changeCurrentRegion: (state, action) => {
            const regionName = action.payload;
            localStorage.setItem('current_region_name', regionName);
            state.data = state.data.map(item => ({
                ...item, isCurrent: item.name === regionName ? true : false
            }))
        }
    },

    extraReducers: {

        //getRegions
        [getRegions.pending]: (state) => {
            state.getRegions = loading;
        },
        [getRegions.fulfilled]: (state, action) => {
            const regions = action.payload;
            
            if(regions){
                
                const currentRegionName = localStorage.getItem('current_region_name');
                if(!currentRegionName){
                    localStorage.setItem('current_region_name', 'world');
                    state.data = regions.map(item => ({...regionTransform(item), isCurrent: item.name === 'world' ? true : false}));
                } else {
                    state.data = regions.map(item => ({...regionTransform(item), isCurrent: item.name === currentRegionName ? true : false}));
                }
            }

            
    // isCurrent: item.name === currentRegionName ? true : false

            state.getRegions = succeeded
        },
        [getRegions.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getRegions = {...failed, message, remarks};
        },

    }
})


//reducer
export default regionsSlice.reducer;

//selectors
export const selectRegions = state => {
    return state.regions.data;
};

//selectors
export const selectCurrentRegion = state => {
    return state.regions.data.find(item => item.isCurrent === true);
};

//thunk action creators
export { 
    getRegions
};

//action creators
export const { changeCurrentRegion } = regionsSlice.actions;

// Получаем из БД сведения о всех регионах
// Сохраняем в local Storage заданный регион

