import http from './config/http-common';
import authHeader from './config/auth-header';

const postSignup = ( email, username, password, password2 ) => {
    return http.post('/signup', {
        email: email,
        username: username,
        password: password,
        password2: password2
    });
}

const postLogin = ( email, password ) => {
    return http.post('/login', {
        email: email,
        password: password
    });
}

const postTokenValidity = () => {
    return http.post('/token-validity',{},{
        headers: authHeader() 
    });
}

const putAuthUser = (user) => {
    return http.put('/auth/user', {user: user}, {
        headers: authHeader() 
    });
}

export default {
    postSignup,
    postLogin,
    postTokenValidity,
    putAuthUser
}
