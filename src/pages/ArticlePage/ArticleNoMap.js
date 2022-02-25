import { Container, makeStyles } from '@material-ui/core';
import React from 'react'
import ArticleAuthorDetailed from '../../parts/ArticleParts/ArticleAuthorDetailed';
import ArticleBlock from './ArticleParts/ArticleBlock';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        margin: theme.spacing(3, 0),
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        },
    },

    articleBlock: {
        backgroundColor: theme.palette.background.paper,
    },

    authorBlock: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
    },

    commentBlockContainer: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 0),
        backgroundColor: theme.palette.background.paper,
    }
}))

const ArticleNoMap = ({ articleBlock, articleAuthorDetailed, articleCommentBlock }) => {

    const classes = useStyles();
    
    return (
        <div className={classes.wrapper}>
            
            <Container maxWidth='md' disableGutters={true} className={classes.articleBlock}>
            <Container maxWidth='sm' disableGutters={true}>
                {articleBlock}
            </Container>
            </Container>

            <Container maxWidth='md' disableGutters={true} className={classes.authorBlock}>
            <Container maxWidth='sm' disableGutters={true}>
                {articleAuthorDetailed}
            </Container>
            </Container>
            
            <Container maxWidth='md' disableGutters={true} className={classes.commentBlockContainer}>
            <Container maxWidth='sm' disableGutters={true}>
                {articleCommentBlock}
            </Container>
            </Container>
            
        </div>
    )
}

export default ArticleNoMap
