import { Button, Card, CardContent, CardMedia, Chip, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ArticleViewSwitch from './ArticleViewSwitch'
import ArticleHeader from '../../../parts/ArticleParts/ArticleHeader'
import ArticleContent from '../../../parts/ArticleParts/ArticleContent';
import ArticleValuation from '../../../parts/ArticleParts/ArticleValuation';
import ArticleAuthorDetailed from '../../../parts/ArticleParts/ArticleAuthorDetailed';
import { useState } from 'react';
import { useDidUpdateEffect } from '../../../utils/customHooks/useDidUpdateEffect';
import { createRandomId } from '../../../utils/functions/createRandomId';
import ArticleTotalViews from '../../../parts/ArticleParts/ArticleTotalViews';


const useStyles = makeStyles((theme) => ({

    wrapper: {
        boxSizing: 'border-box',
        padding: theme.spacing(2),
    },

    articleHeader: {
        display: 'flex',
        marginBottom: theme.spacing(1),
    },

    articleHeader__base: {
        flexGrow: 1,
        marginRight: theme.spacing(0.5)
    },

    articleHeader__viewSwitch: {
        flexGrow: 0
    }

}))

const ArticleBlock = ({ article, isOwner }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.wrapper} >

            <div className={classes.articleHeader}>
                <ArticleHeader 
                    className={classes.articleHeader__base}
                    article={article} 
                    isOwner={isOwner}

                    clickableName={false}
                    showStatus={false}
                />

                <ArticleViewSwitch
                    className={classes.articleHeader__viewSwitch}
                />
            </div>
          
            <ArticleContent
                sections={article.sections} 
                highlightableMarkers={true}
            />

            <ArticleTotalViews
                totalViews={article?.totalViews}
            />

            <ArticleValuation article={article}/>

        </div>
    )
}

export default ArticleBlock

        //Получаем общедоступные сведения о статье (например, автор статьи)
        
        
        // if(viewType === 'writing'){
        //     //owner может смотреть свою статью в любом статусе
        //     dispatch(getUserArticle(articleId))
        // } else {
        //     //только для опубликованных статей
        //     console.log('getArticle')
        // }
        // //При смене articleId всегда предварительно чистим store в Redux
        // return () => {
        //     dispatch(clearCurrentArticle());
        // }




// articleHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: theme.spacing(2)
// },
// articleHeaderMain: {

// },

// articleHeaderInfo: {
//     ...theme.typography.subtitle2,
// },

// articleHeaderText: {
//     ...theme.typography.h5,
//     fontWeight: 900,
//     lineHeight: '150%'
// },

// articleHeaderTagContainer: {

// },

// articleHeaderTag: {
//     ...theme.typography.caption,
// },

// mapButton: {
// },

// listButton: {
// },

// articlePlacesNumber: {
//     marginBottom: theme.spacing(2),
// },

// articlePlacesNumberText: {
//     ...theme.typography.subtitle1,
//     fontWeight: 900,
// },

// imageCarousel: {
//     marginBottom: theme.spacing(2)
// },

// articleContent: {
//     marginBottom: theme.spacing(2),
// },
// articleContentText: {
//     // marginBottom: theme.spacing(2),
// },

// articleContentButton: {
    
// },

// articleFooter: {
// },
// articleFooterSources: {
//     ...theme.typography.caption,
//     color: 'grey',
//     marginBottom: theme.spacing(2),
// },

// articleMarkers: {

// },





// article__viewSwitch: {
//     // margin: theme.spacing(2, 0)
// },



{/* <div className={classes.articleHeader}>
                
<div className={classes.articleHeaderMain}>
    <Typography className={classes.articleHeaderInfo}>14 мая 2018 21:16 | <LinkPrimary>Иван Иванович</LinkPrimary></Typography>
    <LinkPrimary className={classes.articleHeaderText} href="/articles/1">Наименование статьи</LinkPrimary>
    
    <div className={classes.articleHeaderTagContainer}>
        <LinkPrimary className={classes.articleHeaderTag}>Литература</LinkPrimary>{', '}
        <LinkPrimary className={classes.articleHeaderTag}>Музыка</LinkPrimary>{', '}
        <LinkPrimary className={classes.articleHeaderTag}>Клипы</LinkPrimary>{', '}
        <LinkPrimary className={classes.articleHeaderTag}>Живопись</LinkPrimary>
    </div>
</div>

<ArticleViewSwitch/>

</div>

<ImageCarousel className={classes.imageCarousel}/>

<div className={classes.articleContent}>
<Typography className={classes.articleContentText}>Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи</Typography>
</div>

{/* <div className={classes.articlePlacesNumber}>

<Typography className={classes.articlePlacesNumberText}>7 интересных мест</Typography>
<Divider/>
</div> */}

// <Grid container>
// <div className={classes.articleMarkers}>
// <MarkerCardLG/>
// <MarkerCardLG/>
// <MarkerCardLG/>
// </div>
// </Grid>


// <div className={classes.articleFooter}>
// <Typography className={classes.articleFooterSources}>Источники: google.com</Typography>
// <ValuationList/>
// </div> */}