import http from './config/http-common';
import authHeader from './config/auth-header';

const putArticleReview = (articleId, articleReview) => {
    return http.put(`/article-reviews/articles/${articleId}`, {articleReview}, {
        headers: authHeader() 
    });
}

export default {
    putArticleReview
}