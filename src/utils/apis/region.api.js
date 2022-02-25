import http from './config/http-common';

//Получаем справочник тегов
const getRegions = () => {
    return http.get('/regions');
}

export default {
    getRegions
}