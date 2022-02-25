import { convertDataSmart } from "../../utils/functions/convertDataSmart";
import { articleTransform } from "./article.transform";
import { userTransform } from "./user.transform";

export const commentTransform = (item) => ({
    id: item.id,
    body: item.body,
    parentId: item.parent_id,
    createdAt: convertDataSmart(item.createdAt) || '',
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt, //Необходимо добавить свойство isArchived на основе deletedAt
    isArchived: item.deletedAt? true : false, 

    author: item.author ? userTransform(item.author) : {},
    article: item.article ? articleTransform(item.article) : {}
})
