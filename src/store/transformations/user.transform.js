export const userTransform = (item) => ({
    id: item.id,
    username: item.username,
    name: item.name,
    email: item.email,
    about: item.about,
    isActive: item.is_active,
    avatarFilename: item.avatar_filename,
    createdAt: item.createdAt,
    roles: item.roles ? [] : null,
    draftArticlesNum: item.draft_articles_num,

    accessToken: item.accessToken
})