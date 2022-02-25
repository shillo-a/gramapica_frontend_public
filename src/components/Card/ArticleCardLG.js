import { Button, Card, CardContent, CardMedia, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import noImageLG from '../../../public/no_image_lg.png';
import ButtonSecondary from '../Button/ButtonSecondary';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import ButtonPrimary from '../Button/ButtonPrimary';
import ValuationList from '../List/ValuationList';
import LinkPrimary from '../Link/LinkPrimary';
import LinkRegular from '../Link/LinkRegular';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import ImageCarousel from '../Carousel/ImageCarousel';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 0,
        padding: theme.spacing(2)
    },

    cardHeader: {
        paddingBottom: theme.spacing(2),
    },

    cardHeaderInfo: {
        ...theme.typography.subtitle2,
    },

    cardHeaderText: {
        ...theme.typography.h6,
        fontWeight: 900,
        lineHeight: '150%'
    },
    
    cardHeaderTagContainer: {

    },

    cardHeaderTag: {
        ...theme.typography.caption,
    },

    imageCarousel: {
        paddingBottom: theme.spacing(2),
    },

    cardContent: {
        paddingBottom: theme.spacing(2),
    },
    cardContentText: {
        marginBottom: theme.spacing(2),
    },

    cardContentButton: {
        
    },

    cardFooter: {
    },

}))

const ArticleCardLG = (props) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        
        <Grid xs={12} item>
        <div className={classes.cardContainer} >

            <div className={classes.cardHeader}>
                <Typography className={classes.cardHeaderInfo}>14 мая 2018 21:16 | <LinkPrimary>Иван Иванович</LinkPrimary></Typography>
                <LinkPrimary className={classes.cardHeaderText} href="/articles/1">Наименование статьи</LinkPrimary>
                <div className={classes.cardHeaderTagContainer}>
                    <LinkPrimary className={classes.cardHeaderTag}>Литература</LinkPrimary>{', '}
                    <LinkPrimary className={classes.cardHeaderTag}>Музыка</LinkPrimary>{', '}
                    <LinkPrimary className={classes.cardHeaderTag}>Картины</LinkPrimary>
                </div>
            </div>

            <ImageCarousel className={classes.imageCarousel}/>

            {/* <div className={classes.cardMedia}>
                <img className={classes.cardMediaImg} src={noImageLG}></img>
                <Typography className={classes.cardMediaCaption}>Рисунок 1. Сейчас отсутствует фотография к статье</Typography>
            </div> */}

            <div className={classes.cardContent}>
                <Typography className={classes.cardContentText}>Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи</Typography>
                <ButtonSecondary className={classes.cardContentButton} href="/articles/1">Узнать больше</ButtonSecondary>
            </div>

            <div className={classes.cardFooter}>
                <ValuationList/>
            </div>

        </div>
        </Grid>

    )
}

export default ArticleCardLG