import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import ArticleBlock from './ArticleParts/ArticleBlock';
import ArticleMapBlock from './ArticleParts/ArticleMapBlock';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        display: 'flex',
        overflowX: 'hidden'
    },

    articleBlock: {
        height: `calc(100vh - ${theme.navbarHeight}px)`,
        overflowY: 'auto',

        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },

    },

    // articleMapBlockContainer: {
        
    // }

}))

const ArticleMap = ({ articleBlock, articleAuthorDetailed, articleCommentBlock, articleMapBlock }) => {

    const classes = useStyles();
    
    return (
        <div className={classes.wrapper}>
            <Grid container>

                <Grid xs={12} md={6} lg={5} xl={4} item>
                <div className={classes.articleBlock}>
                    {articleBlock}
                    {articleAuthorDetailed}
                    {articleCommentBlock}
                </div>
                </Grid>

                <Grid xs={12} md={6} lg={7} xl={8} item>
                    {articleMapBlock}
                </Grid>
                
            </Grid>
        </div>
    )
}

export default ArticleMap