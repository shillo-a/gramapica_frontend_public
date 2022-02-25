import http from './config/http-common';
import authHeader from './config/auth-header';

const getUser = (userKey) => {
    return http.get(`/users/${userKey}`);
}

export default {
    getUser
}