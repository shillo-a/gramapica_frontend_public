import http from './config/http-common';

//Получаем справочник тегов
const getTags = () => {
    return http.get('/tags');
}

export default {
    getTags
}