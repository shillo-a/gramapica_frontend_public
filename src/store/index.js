import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import globalLocationSlice from './slices/globalLocationSlice';
import globalModalSlice from './slices/globalModalSlice';
import globalLoaderSlice from './slices/globalLoaderSlice';
import globalAlertSlice from './slices/globalAlertSlice';
import currentArticleSlice from './slices/currentArticleSlice';
import tagSlice from './slices/tagSlice';
import authenticationSlice from './slices/authenticationSlice';
import userSlice from './slices/userSlice';
import draftArticlesSlice from './slices/draftArticlesSlice';
import uploadsSlice from './slices/uploadsSlice';
import userArticlesSlice from './slices/userArticlesSlice';
import articleSlice from './slices/articleSlice';
import articleReviewsSlice from './slices/articleReviewsSlice';
import articleOptionsSlice from './slices/articleOptionsSlice';
import localArticleSectionsSlice from './slices/localArticleSectionsSlice';
import regionsSlice from './slices/regionsSlice';
import favoriteArticlesSlice from './slices/favoriteArticlesSlice';
import publishedArticleCommentsSlice from './slices/publishedArticleCommentsSlice';
import currentCommentTypeSlice from './slices/currentCommentTypeSlice';
import publishedArticlesSlice from './slices/publishedArticlesSlice';
import publishedArticlesTotalPagesSlice from './slices/publishedArticlesTotalPagesSlice';

const createStore = () => {
    const thunkArguments = {};
    const customizedMiddleware = getDefaultMiddleware(({
        thunk: {
            extraArgument: thunkArguments
        }
    }))

    const store = configureStore({

        reducer: {
            globalLocation: globalLocationSlice,
            globalModal: globalModalSlice,
            globalLoader: globalLoaderSlice,
            globalAlert: globalAlertSlice,

            // Авторизация и настройки текущего пользователя
            authentication: authenticationSlice,
            
            // Активные стейты, над которыми работают "сейчас"
            currentArticle: currentArticleSlice,
            currentCommentType: currentCommentTypeSlice,
            
            // Справочники
            tag: tagSlice,
            regions: regionsSlice,

            // Выгруженная информация "для работы"
            user: userSlice,
            article: articleSlice,
            draftArticles: draftArticlesSlice, //user draft articles
            userArticles: userArticlesSlice,
            articleReviews: articleReviewsSlice,
            articleOptions: articleOptionsSlice,
            favoriteArticles: favoriteArticlesSlice,
            publishedArticleComments: publishedArticleCommentsSlice,
            
            publishedArticles: publishedArticlesSlice,
            publishedArticlesTotalPages: publishedArticlesTotalPagesSlice,
            
            // Локальное управление частью компонентов
            localArticleSections: localArticleSectionsSlice,

            // Управление загрузками изображений
            uploads: uploadsSlice
        },

        middleware: customizedMiddleware
    })

    //добавляем для thunk ссылку на store
    thunkArguments.store = store;

    return store;
}


export default createStore;