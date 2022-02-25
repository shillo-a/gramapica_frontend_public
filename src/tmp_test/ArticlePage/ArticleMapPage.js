import { Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import CommentBlock from '../../components/Comment/CommentBlock';
import ArticleBlock from './ArticleBlock';
import ArticleMapBlock from './ArticleMapBlock';

const useStyles = makeStyles((theme) => ({

    articleMapContainer: {
        display: 'flex',
        overflowX: 'hidden'
    },

    articleBlockContainer: {
        height: themeProps => `calc(100vh - ${themeProps.heightAppBar}px)`,
        overflowY: 'auto',

        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },

    },

    articleMapBlockContainer: {
        
    }
}))

const ArticlePage = () => {

    //В идеале необходимо сделать автоматическое получение высоты!
    const themeProps = { heightAppBar: 96.98 };
    const classes = useStyles(themeProps);

    return (
        <div className={classes.articleMapContainer}>
            <Grid container>

                <Grid xs={12} md={6} lg={5} xl={4} item>
                <div className={classes.articleBlockContainer}>
                    <ArticleBlock/>
                    {/* <CommentBlock/> */}
                </div>
                </Grid>

                <Grid xs={12} md={6} lg={7} xl={8} item>
                <div className={classes.articleMapBlockContainer}>
                    <ArticleMapBlock themeProps={themeProps}/>
                </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default ArticlePage;

