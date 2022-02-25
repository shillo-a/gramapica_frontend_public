import {Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import ButtonSecondary from '../../components/Button/ButtonSecondary';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useIsOwner } from '../../utils/customHooks/useIsOwner';
import ArticleContent from '../ArticleParts/ArticleContent';
import ArticleHeader from '../ArticleParts/ArticleHeader';
import ArticleValuation from '../ArticleParts/ArticleValuation';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0',
        padding: theme.spacing(2)
    },

    header: {
        marginBottom: theme.spacing(1),
    },

    body: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginBottom: theme.spacing(2),
    }

}))

const ArticleCard = ({ article }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    const isArticleOwner = useIsOwner(article.author.id);
    
    return (
        
        <Grid xs={12} item>
        <div className={classes.wrapper} >

            <ArticleHeader 
                className={classes.header}
                article={article}
                isArticleOwner={isArticleOwner}

                clickableName={true} // Не обязательно и так по умолчанию
                showStatus={true} // Не обязательно и так по умолчанию
            />

            <ArticleContent
                className={classes.body}
                sections={article.sections}
                highlightableMarkers={false}
            />

            <ButtonSecondary 
                className={classes.button}
                onClick={()=>{followLinkHandler(`/articles/${article.id}`)}}
            >Узнать больше</ButtonSecondary>

            <ArticleValuation 
                article={article}
            />
            
        </div>
        </Grid>

    )
}

export default ArticleCard;

{/* <ImageCarousel className={classes.imageCarousel}/> */}

{/* <div className={classes.cardMedia}>
    <img className={classes.cardMediaImg} src={noImageLG}></img>
    <Typography className={classes.cardMediaCaption}>Рисунок 1. Сейчас отсутствует фотография к статье</Typography>
</div> */}

{/* <div className={classes.cardContent}>
    <Typography className={classes.cardContentText}>Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи</Typography>
    <ButtonSecondary className={classes.cardContentButton} href="/articles/1">Узнать больше</ButtonSecondary>
</div> */}

{/* <div className={classes.cardFooter}>
    <ValuationList/>
</div> */}