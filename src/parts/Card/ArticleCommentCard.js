import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import LinkPrimary from '../../components/Link/LinkPrimary';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import CommentBody from '../Comment/Parts/CommentBody';
import CommentControl from '../Comment/Parts/CommentControl';
import CommentHeader from '../Comment/Parts/CommentHeader';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0',
        padding: theme.spacing(2)
    },

    articleHeader: {
        fontWeight: 900
    },

    commentHeader: {
        marginTop: theme.spacing(1)
    },

    commentBody: {
        marginTop: theme.spacing(1)
    },

    commentControl: {
        marginTop: theme.spacing(1)
    },

}))

const ArticleCommentCard = ({ comment }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <div className={classes.wrapper}>
            <LinkPrimary
                onClick={()=>{followLinkHandler(`/articles/${comment?.article?.id}`)}}
            >
                <Typography className={classes.articleHeader}>{ comment?.article?.name }</Typography>
            </LinkPrimary>
            
            <CommentHeader className={classes.commentHeader} comment={comment}/>
            <CommentBody className={classes.commentBody} comment={comment}/>
            <CommentControl 
                className={classes.commentControl} 
                comment={comment}
                replyHandler={()=>{followLinkHandler(`/articles/${comment?.article?.id}?comment=${comment.id}&mode=reply`)}}
                editHandler={()=>{followLinkHandler(`/articles/${comment?.article?.id}?comment=${comment.id}&mode=edit`)}}
            />
            
        </div>
    )
}

export default ArticleCommentCard
