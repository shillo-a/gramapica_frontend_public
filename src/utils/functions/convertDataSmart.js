export const convertDataSmart = (timestamp) => {

    let options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }

    //1. Определяем текущую дату
    const currentTimestamp = new Date(Date.now());
    const currentYear = currentTimestamp.getFullYear();
    const currentMonth =  currentTimestamp.getMonth();
    const currentDay = currentTimestamp.getDate();
    const previousDay = currentDay - 1;
    
    //2. Превращаем currentTimeZ в формат даты js
    let baseTimestamp = new Date(timestamp);
    const baseTimestampYear = baseTimestamp.getFullYear();
    const baseTimestampMonth =  baseTimestamp.getMonth();
    const baseTimestampDay = baseTimestamp.getDate();
   
    //3. Трансформируем дату
    if(baseTimestampYear !== currentYear) {
        return baseTimestamp.toLocaleDateString("ru-Ru", {day: "numeric", month: "numeric", year: "numeric"})
    } else if (baseTimestampMonth !== currentMonth) {
        return baseTimestamp.toLocaleDateString("ru-Ru", {day: "numeric", month: "short"})
    } else if (baseTimestampDay === previousDay) {
        return 'вчера'
    } else if (baseTimestampDay !== currentDay) {
        return baseTimestamp.toLocaleDateString("ru-Ru", {day: "numeric", month: "short"})
    } else {
        return baseTimestamp.toLocaleTimeString("ru-Ru", {hour: '2-digit', minute:'2-digit'});
        // return 'сегодня в ' + baseTimestamp.toLocaleTimeString("ru-Ru", {hour: '2-digit', minute:'2-digit'});
    }

}


//14 мая 2018 21:16
// new Date(date).toLocaleDateString("ru-Ru", options)