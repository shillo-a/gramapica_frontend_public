import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import articleApi from '../../utils/apis/article.api';
import { failed, idle, loading, succeeded } from "../../utils/apis/config/statuses";


import { createRandomId } from '../../utils/functions/createRandomId'
import { articleTransform } from "../transformations/article.transform";
import { articleRegionTransform } from "../transformations/region.transform";
import { sectionTransform } from "../transformations/section.transform";
import { tagTransform } from "../transformations/tag.transform";

const initialState = {
    data: {
        id: '',
        name: '',
        tags: [],
        sections: [],
        regions: []
    },

    changeHappened: '', // to start debounce PUT 
    changeHappenedRightNow: '', //to set loader status

    getDraftArticle: idle,
    postDraftArticle: idle,
    putDraftArticle: idle,
    postDraftArticleSection: [],
    deleteDraftArticleSection: [],
    putDraftArticleStatus: idle,
    putDraftArticleTags: idle,
    putDraftArticleRegions: idle,
    deleteDraftArticle: idle
}

const getDraftArticle = createAsyncThunk('currentArticle/getDraftArticle', async (articleId, thunkAPI) => {

    try {
        const response = await articleApi.getDraftArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const postDraftArticle = createAsyncThunk('currentArticle/postDraftArticle', async (value, thunkAPI) => {

    try {
        const response = await articleApi.postDraftArticle(/* абсолютно пустой */)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const putDraftArticle = createAsyncThunk('currentArticle/putDraftArticle', async (value, thunkAPI) => {
    
    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;
    const currentArticle = state.currentArticle.data;

    try {
        const response = await articleApi.putDraftArticle(articleId, currentArticle);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data);
    }
    
    
})

const postDraftArticleSection = createAsyncThunk('currentArticle/postDraftArticleSection', async ({typeName, tmpSectionId}, thunkAPI) => {
    
    //Через action.meta.arg везде будет доступен tmpSectionId !!!
    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;
    const orderNum = state.currentArticle.data.sections.length + 1;

    try {
        const response = await articleApi.postDraftArticleSection(articleId, typeName, orderNum);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

const deleteDraftArticleSection = createAsyncThunk('currentArticle/deleteDraftArticleSection', async ({sectionId}, thunkAPI) => {
    
    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;

    try {
        const response = await articleApi.deleteDraftArticleSection(articleId, sectionId);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

const putDraftArticleStatus = createAsyncThunk('currentArticle/putDraftArticleStatus', async(statusName, thunkAPI) => {
    
    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;

    try {
        const response = await articleApi.putDraftArticleStatus(articleId, statusName);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }

})

const putDraftArticleTags = createAsyncThunk('currentArticle/putDraftArticleTags', async(tags, thunkAPI) => {

    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;

    try {
        const response = await articleApi.putDraftArticleTags(articleId, tags);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const putDraftArticleRegions = createAsyncThunk('currentArticle/putDraftArticleRegions', async(regions, thunkAPI) => {

    //Получаем информацию из Redux store
    const store = thunkAPI.extra.store;
    const state = store.getState();
    const articleId = state.currentArticle.data.id;

    try {
        const response = await articleApi.putDraftArticleRegions(articleId, regions);
        return response.data;
    } catch (error) {
        if(!error.response){ throw error };
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

const deleteDraftArticle = createAsyncThunk('currentArticle/deleteDraftArticle', async(articleId, thunkAPI) => {

    try {
        const response = await articleApi.deleteDraftArticle(articleId)
        return response.data
    } catch (error) {
        if(!error.response){ throw error }
        return thunkAPI.rejectWithValue(error.response.data)
    }
    
})

const currentArticleSlice = createSlice({
    name: 'currentArticle',
    initialState,

    reducers: {
        clearCurrentArticle: (state, action) => {
            // Object.assign(state, action.payload)
            return initialState
        },

        //Ловим ИЗМЕНЕНИЯ в реальном времени
        setChangeHappenedRightNow: (state, action) => {
            state.changeHappenedRightNow = createRandomId();
        },

        //управление наименованием статьи
        changeArticleName: (state, action) => {
            const articleName = action.payload;
            state.data.name = articleName;

            state.changeHappened = createRandomId(); //Фиксируем, что было ИЗМЕНЕНИЕ (сработает общий PUT)
        },

        changeSectionPosition: (state, action) => {
            const sourceIndex = action.payload.sourceIndex
            const destinationIndex = action.payload.destinationIndex
            //Определяем, какая секция двигается
            const draggableSection = state.data.sections[sourceIndex]
            //Убираем секцию со старого места
            state.data.sections.splice(sourceIndex, 1)
            //Добавляем секцию на новое место
            state.data.sections.splice(destinationIndex, 0, draggableSection)

            //Изменяем orderNum-ы в зависимости от нового положения в array
            state.data.sections.forEach((item, index) => {
                item.orderNum = index + 1;
            })

            state.changeHappened = createRandomId(); //Фиксируем, что было ИЗМЕНЕНИЕ (сработает общий PUT)
        },

        changeSection: (state, action) => {
            const section = action.payload
            //Определяем индекс секции, которую мы хотим изменть
            const changedSectionIndex = state.data.sections.findIndex(item => item.id === section.id)
            //Изменяем секцию
            state.data.sections[changedSectionIndex] = section

            state.changeHappened = createRandomId(); //Фиксируем, что было ИЗМЕНЕНИЕ (сработает общий PUT)
        },
    },

    extraReducers: {
        //getDraftArticle
        [getDraftArticle.pending]: (state) => {
            state.getDraftArticle = loading
        },
        [getDraftArticle.fulfilled]: (state, action) => {
            const article = action.payload;
            if(article){
                const transformedDraftArticle = articleTransform(article);
                state.data = transformedDraftArticle;
            }
            state.getDraftArticle = succeeded
        },
        [getDraftArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.getDraftArticle = {...failed, message, remarks};
        },

        //postDraftArticle (without data)
        [postDraftArticle.pending]: (state) => {
            state.postDraftArticle = loading
        },
        [postDraftArticle.fulfilled]: (state, action) => {
            const article = action.payload
            const articleId = article.id
            state.postDraftArticle = succeeded
            state.data.id = articleId
        },
        [postDraftArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.postDraftArticle = {...failed, message, remarks};
        },

        //putDraftArticle
        [putDraftArticle.pending]: (state) => {
            state.putDraftArticle = loading;
        },
        [putDraftArticle.fulfilled]: (state, action) => {
            state.putDraftArticle = succeeded;

            state.changeHappenedRightNow = '' //Фиксируем, что загрузка ИЗМЕНЕНИЯ была ЗАВЕРШЕНА (для loader-а)
        },
        [putDraftArticle.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putDraftArticle = {...failed, message, remarks};

            state.changeHappenedRightNow = '' //Фиксируем, что загрузка ИЗМЕНЕНИЯ была ЗАВЕРШЕНА (для loader-а)
        },

        //postDraftArticleSection
        [postDraftArticleSection.pending]: (state, action) => {
            const tmpSectionId = action.meta.arg.tmpSectionId;
            state.postDraftArticleSection.push( {sectionId: tmpSectionId, ...loading} );
        },
        [postDraftArticleSection.fulfilled]: (state, action) => {
            const section = action.payload;
            const sectionId = section.id;
            if(section){
                const transformedDraftArticleSection = sectionTransform(section);
                state.data.sections.push(transformedDraftArticleSection);
            }

            //Определяем Статус для postDraftArticleSection - index
            const tmpSectionId = action.meta.arg.tmpSectionId;
            const stateIndex = state.postDraftArticleSection.findIndex(item => item.sectionId === tmpSectionId)
            state.postDraftArticleSection[stateIndex] = {sectionId: sectionId, ...succeeded}
        },
        [postDraftArticleSection.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];

            //Определяем Статус для postDraftArticleSection - index
            const tmpSectionId = action.meta.arg.tmpSectionId;
            const stateIndex = state.postDraftArticleSection.findIndex(item => item.sectionId === tmpSectionId)
            state.postDraftArticleSection[stateIndex] = {sectionId: tmpSectionId, ...failed, message, remarks};
        },

        //deleteDraftArticleSection
        [deleteDraftArticleSection.pending]: (state, action) => {
            const sectionId = action.meta.arg.sectionId;
            state.deleteDraftArticleSection.push( {sectionId: sectionId, ...loading} );
        },
        [deleteDraftArticleSection.fulfilled]: (state, action) => {
            const deleteSectionId = Number(action.payload);
            const deleteSectionIndex = state.data.sections.findIndex((item) => item.id === deleteSectionId)
            state.data.sections.splice(deleteSectionIndex, 1)

            //Изменяем orderNum-ы в зависимости от нового положения в array
            state.data.sections.forEach((item, index) => {
                item.orderNum = index + 1;
            })
            
            //Определяем Статус для deleteDraftArticleSection - index
            const sectionId = action.meta.arg.sectionId;
            const stateIndex = state.deleteDraftArticleSection.findIndex(item => item.sectionId === sectionId)
            state.deleteDraftArticleSection[stateIndex] = {sectionId: sectionId, ...succeeded}
        },
        [deleteDraftArticleSection.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];

             //Определяем Статус для deleteDraftArticleSection - index
             const sectionId = action.meta.arg.sectionId;
             const stateIndex = state.deleteDraftArticleSection.findIndex(item => item.sectionId === sectionId)
             state.deleteDraftArticleSection[stateIndex] = {sectionId: sectionId, ...failed, message, remarks}
        },

        //putDraftArticleStatus
        [putDraftArticleStatus.pending]: (state, action) => {
            state.putDraftArticleStatus = loading;
        },
        [putDraftArticleStatus.fulfilled]: (state, action) => {
            state.putDraftArticleStatus = succeeded;
        },
        [putDraftArticleStatus.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putDraftArticleStatus = {...failed, message, remarks};
        },

        //putDraftArticleTags
        [putDraftArticleTags.pending]: (state, action) => {
            state.putDraftArticleTags = loading;
        },
        [putDraftArticleTags.fulfilled]: (state, action) => {
            const tags = action.payload;
            if(tags){ //сохранять не обязательно после PUT-а
                const transformedDraftArticleTags = tags.map(item => tagTransform(item))
                state.tags = transformedDraftArticleTags
            }
            state.putDraftArticleTags = succeeded;

            state.changeHappenedRightNow = '' //Фиксируем, что загрузка ИЗМЕНЕНИЯ была ЗАВЕРШЕНА (для loader-а)
        },
        [putDraftArticleTags.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putDraftArticleTags = {...failed, message, remarks};
        },

        //putDraftArticleRegions
        [putDraftArticleRegions.pending]: (state, action) => {
            state.putDraftArticleRegions = loading;
        },
        [putDraftArticleRegions.fulfilled]: (state, action) => {
            const regions = action.payload;
            if(regions){ //сохранять не обязательно после PUT-а
                const transformedDraftArticleRegions = regions.map(item => articleRegionTransform(item))
                state.regions = transformedDraftArticleRegions
            }
            state.putDraftArticleRegions = succeeded;

            state.changeHappenedRightNow = '' //Фиксируем, что загрузка ИЗМЕНЕНИЯ была ЗАВЕРШЕНА (для loader-а)
        },
        [putDraftArticleRegions.rejected]: (state, action) => {
            const message = action.payload?.message || action.payload || action.error.message;
            const remarks = action.payload?.remarks || [];
            state.putDraftArticleRegions = {...failed, message, remarks};
        },

        // deleteDraftArticle
        [deleteDraftArticle.pending]: (state) => {
            state.deleteDraftArticle = loading;
        },
        [deleteDraftArticle.fulfilled]: (state, action) => {
            state.data = initialState.data;
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
export default currentArticleSlice.reducer;

//selectors
export const selectCurrentArticle = state => {
    return state.currentArticle.data;
};

export const selectCurrentArticleId = state => {
    return state.currentArticle.data?.id;
};

export const selectCurrentArticleName = state => {
    return state.currentArticle.data?.name;
};

export const selectCurrentArticleSections = state => {
    return state.currentArticle.data?.sections;
};

export const selectCurrentArticleTags = state => {
    return state.currentArticle.data?.tags;
};

export const selectChangeHappened = state => {
    return state.currentArticle.changeHappened;
}

export const selectGetDraftArticle = state => {
    return state.currentArticle.getDraftArticle;
};

export const selectChangeHappenedRightNow = state => {
    return state.currentArticle.changeHappenedRightNow;
};

export const selectPutDraftArticle = state => {
    return state.currentArticle.putDraftArticle;
}

//action creators
export const { 
    changeArticleName, 
    // addCurrentArticle,
    changeTags,
    addSection,  
    deleteSection, 
    changeSectionPosition,
    changeSection,
    clearCurrentArticle,
    setChangeHappenedRightNow
} = currentArticleSlice.actions;

//thunk action creators
export { 
    getDraftArticle, 
    postDraftArticle,
    putDraftArticle,
    postDraftArticleSection,
    deleteDraftArticleSection,
    putDraftArticleStatus,
    putDraftArticleTags,
    putDraftArticleRegions,
    deleteDraftArticle
};

// //управление тегами статьи
// changeTags: (state, action) => {
//     const tags = action.payload
//     state.data.tags = tags

//     // state.changeHappened = createRandomId(); //Фиксируем, что было ИЗМЕНЕНИЕ (сработает общий PUT)
// },

// addCurrentArticle: (state, action) => {
//     const articleId = action.payload;
//     state.data.id = articleId;
// },

// //управление разделами статьи
// addSection: (state, action) => {
//     const typeName = action.payload

//     let newSection = {
//         id: createRandomId(),
//         typeName,
//     }

//     switch(typeName){

//         case "subheader": newSection.header = ''; break;

//         case "text": newSection.body = ''; break;

//         case "spoiler": newSection.body = ''; break;

//         case "image": newSection.sectionImage = {
//             filename: '',
//             description: ''
//         }; break;

//         case "quote": newSection.sectionQuote = {
//             body: '',
//             personName: '',
//             profession: '',
//             avatarFilename: '',
//         }; break;

//         case "marker": newSection.sectionMarker = {
//             name: '',
//             description: '',
//             coordinate: {
//                 name: '',
//                 latitude: '',
//                 longitude: ''
//             },
//             markerImage: {
//                 filename: '',
//                 description: ''
//             }
//         }; break;
    
//     }

//     state.data.sections.push(newSection);

//     state.creationHappened = createRandomId(); //Фиксируем, что было СОЗДАНИЕ (сработает частный POST)
// },

// deleteSection: (state, action) => {
//     const index = action.payload;
//     state.data.sections.splice(index, 1);

//     state.deletionHappened = createRandomId(); //Фиксируем, что было УДАЛЕНИЕ (сработает частный DELETE)
// },