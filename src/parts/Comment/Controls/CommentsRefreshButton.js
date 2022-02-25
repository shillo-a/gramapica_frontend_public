import React from 'react'

import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import { useDispatch, useSelector } from 'react-redux';
import { getPublishedArticleNewComments, selectGetPublishedArticleNewCommentsStatus, selectPublishedArticleCommentsLastUpdateAt } from '../../../store/slices/publishedArticleCommentsSlice';
import CircularProgressPrimary from '../../../components/Progress/CircularProgressPrimary';
import { makeStyles } from '@material-ui/core';
import { loading } from '../../../utils/apis/config/statuses';

const useStyles = makeStyles((theme) => ({
    button: {
        height: '40px',
        width: '60px'
    }
}))


const CommentsRefreshButton = ({ articleId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const lastUpdatedAt = useSelector(selectPublishedArticleCommentsLastUpdateAt);

    const refreshHandler = () => {
        dispatch(getPublishedArticleNewComments({articleId, lastUpdatedAt}));
    }

    const getPublishedArticleNewCommentsStatus = useSelector(selectGetPublishedArticleNewCommentsStatus);

    return (
        <>
        {getPublishedArticleNewCommentsStatus.status === loading.status ?
            
            <ButtonTertiary className={classes.button}>
                <CircularProgressPrimary size="1rem"/>
            </ButtonTertiary>
            
            :

            <ButtonTertiary 
                className={classes.button}
                onClick={refreshHandler}
            >
                <RefreshRoundedIcon />
            </ButtonTertiary>

        }
        </>
    )
}

export default CommentsRefreshButton