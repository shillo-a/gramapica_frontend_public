export const articleReviewTransform = (item) => ({
    id: item.id,
    userId: item.user_id,
    isLike: item.is_like,
    isFavorite: item.is_favorite
})
