import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import noImageLG from '../../../public/no_image_lg.png';
import LinkPrimary from '../Link/LinkPrimary';
import ValuationListShort from '../List/ValuationListShort';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 0,
        padding: theme.spacing(2)
    },

    cardHeader: {
        marginBottom: theme.spacing(2),
        display: 'flex'
    },
    cardHeaderMedia: {
    },
    mediaImage: {
    },
    cardHeaderText: {
        ...theme.typography.subtitle2
    },

    cardFooter: {
    },
}))

const ArticleCardXS = () => {

    const classes = useStyles();

    return (
        <Grid xs={12} item>
        <div className={classes.cardContainer}>

            <div className={classes.cardHeader}>
                {/* <div className={classes.cardHeaderMedia}>
                    <img className={classes.mediaImage} src={noImageLG}/>
                </div> */}
                <LinkPrimary className={classes.cardHeaderText}>Наименование прекрасной статьи в пять слов</LinkPrimary>
            </div>
            <div className={classes.cardFooter}>
                <ValuationListShort/>
            </div>

        </div>
        </Grid>
    )
}

export default ArticleCardXS
