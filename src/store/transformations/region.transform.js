export const regionTransform = (item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    descriptionPP: item.description_pp
})

export const articleRegionTransform = (item) => ({
    articleRegionId: item.id,
    id: item.region.id,
    name: item.region.name,
    description: item.region.description
})