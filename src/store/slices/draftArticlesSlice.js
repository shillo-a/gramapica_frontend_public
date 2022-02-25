import { createAsyncThunk, createSlice, current  } from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";
import { convertToDMlongYT } from "../../utils/functions/convertToDMlongYT";
import { articleTransform } from "../transformations/article.transform";

const initialState = {
    data: [],
    getDraftArticles: idle,
    deleteDraftArticle: idle
}

const getDraftArticles = createAsyncThunk('draftArticlesSlice/getDraftArticles', async(value=null, thunkAPI) => {

    try {
        const response = await articleApi.getDraftArticles()
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const deleteDraftArticle = createAsyncThunk('draftArticlesSlice/deleteDraftArticle', async(articleId, thunkAPI) => {

    try {
        const response = await articleApi.deleteDraftArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const draftArticlesSlice = createSlice({
    name: 'draftArticlesSlice',
    initialState,
    reducers: {},
    extraReducers: {

        // getDraftArticles
        [getDraftArticles.pending]: (state) => {
            state.getDraftArticles = loading
        },
        [getDraftArticles.fulfilled]: (state, action) => {
            const draftArticles = action.payload;
            if(draftArticles.length > 0){
                const transformedDraftArticles = draftArticles.map(item => (
                    articleTransform(item)
                ))

                state.data = transformedDraftArticles
            }

            state.getDraftArticles = succeeded
        },
        [getDraftArticles.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getDraftArticles = {...failed, message, remarks};
        },

        // deleteDraftArticle
        [deleteDraftArticle.pending]: (state) => {
            state.deleteDraftArticle = loading;
        },
        [deleteDraftArticle.fulfilled]: (state, action) => {
            const articleId = Number(action.payload)
            //Удаляем позицию в store без перезапроса API
        
            const index = state.data.findIndex((item) => item.id === articleId)
            state.data.splice(index, 1)

            state.deleteDraftArticle = succeeded;
        },
        [deleteDraftArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.deleteDraftArticle = {...failed, message, remarks};
        },

    }
})

//reducer
export default draftArticlesSlice.reducer;

//selectors
export const selectDraftArticles = state => {
    return state.draftArticles.data
};

// //action creators
// export const { 
//     addArticleName, 
//     addTags,
//     addSection,  
//     deleteSection, 
//     changeSectionPosition,
//     changeSection
// } = currentArticleSlice.actions;

//thunk action creators
export { 
    getDraftArticles,
    deleteDraftArticle
};


// {

//     id: item.id,
//     name: item.name || 'Без названия',
//     authorUsername: item.author.username,
//     statusDescription: item.article_status.description,
//     updatedAt: convertToDMlongYT(item.updatedAt),
   
//     tags: item.tags.map(item => ({
//         id: item.id,
//         name: item.name
//     })),

//     sections: item.sections.map(item => ({
//         id: item.id,
//         typeName: item.section_type.name,
//         orderNum: item.order_num,
//         header: item.header,
//         body: item.body,
        
//         sectionMarker: item.marker ? {
//             id: item.marker.id,
//             name: item.marker.name,
//             description: item.marker.description,

//             markerImage: item.marker.marker_image ? {
//                 id: item.marker.marker_image.id,
//                 filename: item.marker.marker_image.filename,
//                 description: item.marker.marker_image.description
//             }: null,

//             coordinate: item.marker.coordinate ? {
//                 id: item.marker.coordinate.id,
//                 name: item.marker.coordinate.name,
//                 latitude: item.marker.coordinate.latitude,
//                 longitude: item.marker.coordinate.longitude 
//             }: null,

//             boundary: item.marker.boundary,
//         } : null,

//         sectionImage: item.section_image ? {
//             id: item.section_image.id,
//             filename: item.section_image.filename,
//             description: item.section_image.description,
//         } : null,

//         sectionQuote: item.quote ? {
//             id: item.quote.id,
//             body: item.quote.body,
//             personName: item.quote.person_name,
//             profession: item.quote.profession,
//             avatarFilename: item.quote.avatar_filename,
//         }: null,
        
//     }))

// }