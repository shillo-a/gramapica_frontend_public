export const convertToDMlongYT = (date) => {
    let options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }

    return new Date(date).toLocaleDateString("ru-Ru", options)
}

//14 мая 2018 21:16