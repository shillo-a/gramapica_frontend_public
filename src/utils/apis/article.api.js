import http from './config/http-common';
import authHeader from './config/auth-header';

const getDraftArticle = (articleId) => {
    return http.get(`/draft-articles/${articleId}`, {
        headers: authHeader() 
    });
}

const postDraftArticle = () => {
    return http.post('/draft-articles', {}, {
        headers: authHeader() 
    });
}

const deleteDraftArticle = (articleId) => {
    return http.delete(`/draft-articles/${articleId}`, {
        headers: authHeader() 
    });
}

const putDraftArticle = (articleId, article) => {
    return http.put(`/draft-articles/${articleId}`, {article}, {
        headers: authHeader() 
    });
}

const getDraftArticles = () => {
    return http.get(`/draft-articles`, {
        headers: authHeader() 
    });
}

const postDraftArticleSection = (articleId, typeName, orderNum) => {
    return http.post(`/draft-articles/${articleId}/sections`, {typeName, orderNum}, {
        headers: authHeader() 
    });
}

const deleteDraftArticleSection = (articleId, sectionId) => {
    return http.delete(`/draft-articles/${articleId}/sections/${sectionId}`, {
        headers: authHeader() 
    });
}

const putDraftArticleStatus = (articleId, statusName) => {
    return http.put(`/draft-articles/${articleId}/statuses/${statusName}`, {}, {
        headers: authHeader() 
    });
}

const getUserArticles = () => {
    return http.get(`/user-articles`, {
        headers: authHeader() 
    });
}

const putDraftArticleTags = (articleId, tags) => {
    return http.put(`/draft-articles/${articleId}/tags`, {tags}, {
        headers: authHeader() 
    });
}

const getUserPublishedArticles = (userKey) => {
    return http.get(`/published-articles/users/${userKey}`);
}

const getUserArticle = (articleId) => {
    return http.get(`/user-articles/${articleId}`, {
        headers: authHeader() 
    });
}

const getArticleOptions = (articleId) => {
    return http.get(`/options/articles/${articleId}`);
}

const putDraftArticleRegions = (articleId, regions) => {
    return http.put(`/draft-articles/${articleId}/regions`, {regions}, {
        headers: authHeader() 
    });
}

const putUserArticleStatus = (articleId, statusName) => {
    return http.put(`/user-articles/${articleId}/statuses/${statusName}`, {}, {
        headers: authHeader() 
    });
}

const deleteUserArticle = (articleId) => {
    return http.delete(`/user-articles/${articleId}`, {
        headers: authHeader() 
    });
}

const getFavoriteArticles = () => {
    return http.get(`/favorite-articles`, {
        headers: authHeader() 
    });
}

const getPublishedArticle = (articleId) => {
    return http.get(`/published-articles/${articleId}`, {
        headers: authHeader() 
    });
}

const getNewestPublishedArticles = (pageNum, regionName) => {
    return http.get(`/newest-published-articles`, {
        params: {pageNum, regionName}
    });
}

const getNewestPublishedArticlesTotalPages = (regionName) => {
    return http.get(`/newest-published-articles-total-pages`, {
        params: {regionName}
    });
}

const getPopularPublishedArticles = (pageNum, regionName, timePeriod) => {
    return http.get(`/popular-published-articles`, {
        params: {pageNum, regionName, timePeriod}
    });
}

const getPopularPublishedArticlesTotalPages = (regionName) => {
    return http.get(`/popular-published-articles-total-pages`, {
        params: {regionName}
    });
}

export default {
    getDraftArticle,
    postDraftArticle,
    deleteDraftArticle,
    putDraftArticle,
    getDraftArticles,
    postDraftArticleSection,
    deleteDraftArticleSection,
    putDraftArticleStatus,
    getUserArticles,
    putDraftArticleTags,
    getUserPublishedArticles,
    getUserArticle,
    getArticleOptions,
    putDraftArticleRegions,
    putUserArticleStatus,
    deleteUserArticle,
    getFavoriteArticles,
    getPublishedArticle,
    getNewestPublishedArticles,
    getNewestPublishedArticlesTotalPages,
    getPopularPublishedArticles,
    getPopularPublishedArticlesTotalPages
}