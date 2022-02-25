export const convertToDMlongY = (date) => {
    let options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    }

    return new Date(date).toLocaleDateString("ru-Ru", options)
}