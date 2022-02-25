import http from './config/http-common';
import authHeader from './config/auth-header';

const getPublishedArticleComments = (articleId) => {
    return http.get(`/published-articles/${articleId}/comments`);
}

const getPublishedArticleNewComments = (articleId, lastUpdatedAt) => {
    return http.get(`/published-articles/${articleId}/new-comments/${lastUpdatedAt}`);
}

const getPublishedArticleUserComments = (userKey) => {
    return http.get(`/published-articles/users/${userKey}/comments`);
}

const postPublishedArticleComment = (articleId, comment) => {
    return http.post(`/published-articles/${articleId}/comments`, {comment}, {
        headers: authHeader() 
    });
}

const putPublishedArticleComment = (commentId, comment) => {
    return http.put(`/published-articles/comments/${commentId}`, {comment}, {
        headers: authHeader() 
    });
}

const deletePublishedArticleComment = (commentId) => {
    return http.delete(`/published-articles/comments/${commentId}`, {
        headers: authHeader() 
    });
}

export default {
    getPublishedArticleComments,
    getPublishedArticleNewComments,
    getPublishedArticleUserComments,
    postPublishedArticleComment,
    putPublishedArticleComment,
    deletePublishedArticleComment
}