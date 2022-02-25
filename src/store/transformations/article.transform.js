import { convertDataSmart } from "../../utils/functions/convertDataSmart";
import { articleReviewTransform } from "./articleReview.transform";
import { articleRegionTransform } from "./region.transform";
import { sectionTransform } from "./section.transform";
import { tagTransform } from "./tag.transform";
import { userTransform } from "./user.transform";

export const articleTransform = (item) => ({
    id: item.id,
    name: item.name || '',
    status: item.article_status?.name || '',
    statusDescription: item.article_status?.description || '',
    updatedAt: convertDataSmart(item.updatedAt) || '',

    author: item.author ? userTransform(item.author) : {},

    reviews: item.article_reviews ? item.article_reviews.map(item => articleReviewTransform(item)) : [],

    tags: item.article_tags ? item.article_tags.map(item => tagTransform(item)) : [],

    sections: item.sections ? item.sections.map(item => sectionTransform(item)) : [],

    regions: item.article_regions ? item.article_regions.map(item => articleRegionTransform(item)) : [],

    //Подсчет итоговых значений
    totalViews: item.article_total?.total_views || 0,
    totalCommentsNum: item.comments?.length || 0
})


   //Было бы хорошо это реализовать в Backend (сразу при выгрузке из БД)
    // likesNum: item.article_reviews?.filter(item => item.is_like === true).length || 0,
    // favoritesNum: item.article_reviews?.filter(item => item.is_favorite === true).length || 0,
    // commentsNum: item.comments?.length || 0,

    // authorUsername: item.author?.username || '',
    // authorAvatarFilename: item.author?.avatar_filename || '',
    // authorId: item.author?.id || '',

// article_reviews

// is_favorite: true
// is_like: true