import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import useFollowLink from '../../utils/customHooks/useFollowLink';

import LinkPrimary from '../../components/Link/LinkPrimary';

import clsx from 'clsx';
import AvatarExtraSmall from '../../components/Avatar/AvatarExtraSmall';

import DraftArticleDropDown from '../../parts/DropDown/DraftArticleDropDown';
import { uploadsURL } from '../../utils/apis/config/apiUrls';
import UserArticleDropDown from '../DropDown/UserArticleDropDown';

const useStyles = makeStyles((theme) => ({
    wrapper: {
    },

    headline: {
        ...theme.typography.subtitle2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        
    },

    headlineInfo: {
        display: 'flex',
        alignItems: 'center',

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },

    headlineInfoUser: {
        display: 'flex',
        alignItems: 'center',

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },

    headlineInfoUser__avatar: {
        marginRight: theme.spacing(1)
    },

    headlineInfoUser__name: {
        marginRight: theme.spacing(1),
        ...theme.typography.subtitle2,
        fontWeight: 900,

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',

    },

    headlineInfoDate: {
        ...theme.typography.subtitle2,
        color: 'grey',
    
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    
    headlineControll: {
        display: 'flex',
        alignItems: 'center'
    },

    headlineControll__status: {
        ...theme.typography.caption,
        fontWeight: 900,
        textTransform: 'lowercase',
        backgroundColor: '#fffbe0',
        padding: theme.spacing(0.5),
        borderRadius: '1px',
        marginRight: theme.spacing(0.5),

        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },

    name: {
        ...theme.typography.h5,
        fontWeight: 900,
        lineHeight: '140%',
        whiteSpace: 'pre-line',
        wordWrap: 'break-word'
    },
    
    tags: {
        
    },

    tag: {
        ...theme.typography.caption,
        fontWeight: 900,
        // marginRight: theme.spacing(1)
    },

}))

const ArticleHeader = ({ 
    className: parentClassName, 
    article,
    isArticleOwner,

    clickableName=true, //по умолчанию
    showStatus=true
}) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <div className={clsx(classes.wrapper, parentClassName)}>

            <div className={classes.headline}>
                
                <div className={classes.headlineInfo}>
                    <LinkPrimary 
                        className={classes.headlineInfoUser}
                        onClick={()=>{followLinkHandler(`/profile/${article.author?.username}`)}}
                    >
                        <AvatarExtraSmall 
                            className={classes.headlineInfoUser__avatar} 
                            src={article.author?.avatarFilename && `${uploadsURL}/${article.author?.avatarFilename}`}
                        />
                        <Typography className={classes.headlineInfoUser__name}>{article.author?.username}</Typography>
                    </LinkPrimary>
                    <Typography className={classes.headlineInfoDate}>{article.updatedAt}</Typography>
                </div>
                
                {showStatus && <div className={classes.headlineControll}>

                    {article.status === 'draft' && isArticleOwner && <>
                        <div className={classes.headlineControll__status}>{article.statusDescription}</div>
                        <DraftArticleDropDown articleId={article.id}/>
                    </>}

                    {article.status !== 'draft' && isArticleOwner && <>
                        <div className={classes.headlineControll__status}>{article.statusDescription}</div>
                        <UserArticleDropDown articleId={article.id}/>
                        {/* Можно разделить на (но пока в этом нет необходимости):
                            ModerationArticleDropDown
                            PublishedArticleDropDown
                            RejectedArticleDropDown */}
                    </>}
                    
                    {!isArticleOwner && <></>} 
            
                </div>}

            </div>

            {clickableName ?
                <LinkPrimary 
                    className={classes.name}
                    onClick={()=>{followLinkHandler(`/articles/${article.id}`)}}
                >
                    {article.name || "Без названия"}
                </LinkPrimary>
                : 
                <Typography
                    className={classes.name}
                >
                    {article.name || "Без названия"}
                </Typography>
            }
            
            <div className={classes.tags}>
                {/* Можно сделать проще через css! last-child */}
                { article.tags &&
                    article.tags.map((item, index, array) => (
                        <LinkPrimary key={item.id} className={classes.tag}>
                            {item.name}
                            {array.length - 1 === index ? '' : ' • '} 
                        </LinkPrimary>
                    ))
                }
            </div>

            {/* Стилизовать отображение регионов */}
            <div className={classes.tags}>
                { article.regions &&
                    article.regions.map((item, index, array) => (
                        <LinkPrimary key={item.id} className={classes.tag}>
                            {item.description}
                            {array.length - 1 === index ? '' : ' • '} 
                        </LinkPrimary>
                    ))
                }
            </div>

        </div>
    )
}


export default ArticleHeader;