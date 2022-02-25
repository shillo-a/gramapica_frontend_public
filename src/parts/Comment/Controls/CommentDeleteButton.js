import React from 'react'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import LinkPrimary from '../../../components/Link/LinkPrimary';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deletePublishedArticleComment } from '../../../store/slices/publishedArticleCommentsSlice';
import { launchModal } from '../../../store/slices/globalModalSlice';

const useStyles = makeStyles((theme) => ({

    controlButton: {
        display: 'flex',
        alignItems: 'center', 
        marginRight: theme.spacing(1),
    },

    controlButton__icon: {
        ...theme.typography.subtitle2,
    },

    controlButton__text: {
        ...theme.typography.subtitle2,
        marginLeft: theme.spacing(0.5),
    },

}))

const CommentDeleteButton = ({ commentId }) => {

    const classes = useStyles()
    const dispatch = useDispatch();
    
    const handleDelete = async () => {
        const { payload: isConfirmed } = await dispatch(launchModal('deleteComment'));
        if(!isConfirmed){return}

        await dispatch(deletePublishedArticleComment(commentId));
    }

    return (
        <LinkPrimary 
            className={classes.controlButton}
            onClick={handleDelete}
        >
            <CloseRoundedIcon className={classes.controlButton__icon}/>
        </LinkPrimary>
    )
}

export default CommentDeleteButton
