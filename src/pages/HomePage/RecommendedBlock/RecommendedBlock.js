import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ArticleCardXS from '../../../components/Card/ArticleCardXS';

const useStyles = makeStyles((theme) => ({
    header: {
        ...theme.typography.subtitle1,
        fontWeight: 900,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    popularTodayArticleLists: {
        position: 'sticky',
        top: theme.spacing(1)
    }
}))


const RecommendedBlock = () => {

    const classes = useStyles();

    return (
        <div className={classes.popularTodayArticleLists}>
            <Typography className={classes.header}>Рекомендуем</Typography>
            
            <Grid container spacing={2}>
                <ArticleCardXS/>
                <ArticleCardXS/>
                <ArticleCardXS/>
                <ArticleCardXS/>
                <ArticleCardXS/>
            </Grid>
            
        </div>
    )
}

export default RecommendedBlock
