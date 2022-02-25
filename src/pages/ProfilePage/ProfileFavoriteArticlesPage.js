import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProfileWrapper from './ProfileWrapper/ProfileWrapper';
import ProfileTabStab from '../../components/StubBlocks/ProfileTabStab';
import { getFavoriteArticles, selectFavoriteArticles } from '../../store/slices/favoriteArticlesSlice';
import ArticleCard from '../../parts/Card/ArticleCard';

const useStyles = makeStyles((theme) => ({

}))

const ProfileFavoriteArticlesPage = ({ user, isUserOwner }) => {

    const classes = useStyles();
    const dispach = useDispatch();

    //Получаем информацию об избранных статьях пользователя
    const favoriteArticles = useSelector(selectFavoriteArticles);
    useEffect(() => {
        if(isUserOwner){
            dispach(getFavoriteArticles())
        }   
    }, [])

    return (
        <ProfileWrapper user={user} isUserOwner={isUserOwner}>

            { favoriteArticles.length > 0 ? 
                <Grid container spacing={3}>
                    {favoriteArticles.map(item => (
                        <ArticleCard 
                            key={item.id} 
                            article={item}
                        />
                    ))}
                </Grid>
                :
                <ProfileTabStab type={'favoriteArticles'}/>
            }
            
        </ProfileWrapper>
    )
}

export default ProfileFavoriteArticlesPage
