export const tagTransform = (item) => ({
    articleTagId: item.id, 
    id: item.tag.id,
    name: item.tag.name
})