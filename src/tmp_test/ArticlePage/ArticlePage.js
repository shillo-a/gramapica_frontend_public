import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
import ArticleBlock from './ArticleBlock';
import CommentBlock from '../../components/Comment/CommentBlock';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({

    article: {
        margin: theme.spacing(3, 0),
        [theme.breakpoints.down('sm')]: {
            marginTop: 0
        },
    },

    article__block: {
        backgroundColor: theme.palette.background.paper,
        
    },

    commentBlockContainer: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1, 0),
        backgroundColor: theme.palette.background.paper,
    }
}))

const ArticlePage = ({ match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const articleId = match.params.articleId;

    return (
        <div className={classes.article}>
            <Container maxWidth='md' disableGutters={true} className={classes.article__block}>
            <Container maxWidth='sm' disableGutters={true}>
                <ArticleBlock articleId={articleId}/>  
            </Container>
            </Container>

            {/* <Container maxWidth='md' disableGutters={true} className={classes.commentBlockContainer}>
            <Container maxWidth='sm' disableGutters={true}>
                <CommentBlock/>
            </Container>
            </Container> */}
        </div>
 
    )
}

export default ArticlePage;

    //Получаем queryParams, в частности articleType
    // const locationSearch = useLocation().search;
    // const queryParams = new URLSearchParams(locationSearch); 
    // const viewType = queryParams.get('viewtype');
    