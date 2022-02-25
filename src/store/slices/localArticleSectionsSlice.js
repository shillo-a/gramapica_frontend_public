import { createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

const initialState = {
    data: [
        //sections
    ]
}

const localArticleSectionsSlice = createSlice({
    name: 'localArticleSections',
    initialState,

    reducers: {

        // Управление подсветкой мест на карте
        changeHighlightSection: (state, action) => {

            const sectionId = action.payload.sectionId;
            const moveType = action.payload.moveType;
            
            const sectionIndex = state.data.findIndex(item => item.sectionId === sectionId);
            
            // Создаем новую запись в начале
            if(sectionIndex < 0){
                state.data.push({sectionId, highlight: true});
                return;
            }

            // Затем её меняем
            switch(moveType){

                case 'enter' : {
                    state.data[sectionIndex].highlight = true;
                    break;
                }

                case 'leave' : {
                    state.data[sectionIndex].highlight = false;
                    break;
                }
            }

        },

    },
    extraReducers: {}
})

//reducer
export default localArticleSectionsSlice.reducer;

//selectors
export const selectLocalArticleSection = (state, sectionId) => {
    return state.localArticleSections.data.find(item => item.sectionId === sectionId);
};

export const selectLocalArticleSections = (state) => {
    return state.localArticleSections.data;
};

//action creators
export const { 
    changeHighlightSection
} = localArticleSectionsSlice.actions;