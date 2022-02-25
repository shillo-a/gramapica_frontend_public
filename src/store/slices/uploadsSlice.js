import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import uploadApi from "../../utils/apis/upload.api";
import { createRandomId } from '../../utils/functions/createRandomId'

//Для каждой загрукзи делаем отдельную строчку
const initialState = {
    uploads: []
}

const postUpload = createAsyncThunk('uploadSlice/postUpload', async ({ file, uploadId }, thunkAPI) => {

    //Через action.meta.arg везде будет доступен uploadId !!!
    try {
        const response = await uploadApi.postUpload(file)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {

        // addUpload: (state, action) => {
        //     const uploadId = action.payload;
        //     state.uploads.push({
        //         data: {id: uploadId, filename: ''}, postUpload: idle
        //     })

        // },

    },
    extraReducers: {
        //postUpload for each upload
        [postUpload.pending]: (state, action) => {
            //Создаем запись об upload, чтобы сохранять сведения о загрузке со своим уникальным ID
            //И отражаем статус, что загрузка выполняется (idle отсутствует)
            const uploadId = action.meta.arg.uploadId;
            state.uploads.push({
                data: {id: uploadId, filename: ''}, postUpload: loading
            })   
        },
        [postUpload.fulfilled]: (state, action) => {
            const uploadId = action.meta.arg.uploadId;
            const filename = action.payload.filename
            const uploadIndex = state.uploads.findIndex(upload => upload.data.id === uploadId);
            state.uploads[uploadIndex].postUpload = succeeded;
            state.uploads[uploadIndex].data.filename = filename;
        },
        [postUpload.rejected]: (state, action) => {
            const uploadId = action.meta.arg.uploadId;
            const uploadIndex = state.uploads.findIndex(upload => upload.data.id === uploadId);
            
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.uploads[uploadIndex].postUpload = {...failed, message, remarks};
        },
    }
})

//reducer
export default uploadsSlice.reducer;


// //thunk action creators
export { 
    postUpload
};


//сбрасываем текущее состояние stat-e
    // thunkAPI.dispatch(currentArticleSlice.actions.clearCurrentArticle(initialState))
