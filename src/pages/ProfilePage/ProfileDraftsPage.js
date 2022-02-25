import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ArticleCard from '../../parts/Card/ArticleCard';
import ProfileTabStab from '../../components/StubBlocks/ProfileTabStab';
import { getDraftArticles, selectDraftArticles } from '../../store/slices/draftArticlesSlice';
import ProfileWrapper from './ProfileWrapper/ProfileWrapper';

const useStyles = makeStyles((theme) => ({

}))

const ProfileDraftsPage = ({ user, isUserOwner }) => {

    const classes = useStyles();
    const dispach = useDispatch();
    
    //Получаем информацию о черновиках пользователя
    const draftArticles = useSelector(selectDraftArticles)
    useEffect(() => {
        dispach(getDraftArticles())
    }, [])

    return (
        <ProfileWrapper user={user} isUserOwner={isUserOwner}>

            { draftArticles.length > 0 ? 
                <Grid container spacing={3}>
                    {draftArticles.map(item => (
                        <ArticleCard 
                            key={item.id} 
                            article={item}
                        />
                    ))}
                </Grid>
                :
                <ProfileTabStab type={'drafts'}/>
            }
            
        </ProfileWrapper>
    )
}

export default ProfileDraftsPage
