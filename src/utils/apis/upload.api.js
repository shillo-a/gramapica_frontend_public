import http from './config/http-multipart';

//Получаем изображение по наименованию
const postUpload = (file) => {
    return http.post(`/uploads`, file);
}

export default {
    postUpload
}