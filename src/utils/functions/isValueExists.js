//Проверяем есть значение или оно равняется = ''
export const isValueExists = (value) => {
    if(value || value === ''){
        return true
    };
};