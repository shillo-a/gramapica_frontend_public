import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArticleCommentCard from '../../parts/Card/ArticleCommentCard';
import { clearPublishedArticleComments, getPublishedArticleUserComments, selectPublishedArticleUserComments } from '../../store/slices/publishedArticleCommentsSlice';
import ProfileWrapper from './ProfileWrapper/ProfileWrapper';

const useStyles = makeStyles((theme) => ({

}))

const ProfileUserCommentsPage = ({ user, isUserOwner }) => {

    const classes = useStyles();
    const dispach = useDispatch();

    //Получаем информацию о комментариях пользователя
    const publishedArticleUserComments = useSelector(selectPublishedArticleUserComments);
    useEffect(() => {
        dispach(getPublishedArticleUserComments(user.username))

        //unmount
        return () => {
            dispach(clearPublishedArticleComments())
        }
    },[])

    return (
        <ProfileWrapper user={user} isUserOwner={isUserOwner}>

            <Grid container spacing={3}>
            {publishedArticleUserComments && publishedArticleUserComments.map(item => (
                <Grid xs={12} item key={item.id}>
                    <ArticleCommentCard comment={item}/>
                </Grid>
            ))}
            </Grid>
            
        </ProfileWrapper>
    )
}

export default ProfileUserCommentsPage
