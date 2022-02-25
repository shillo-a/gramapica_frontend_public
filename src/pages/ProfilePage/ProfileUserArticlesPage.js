import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProfileTabStab from '../../components/StubBlocks/ProfileTabStab';
import ArticleCard from '../../parts/Card/ArticleCard';
import { getUserArticles, getUserPublishedArticles, selectUserArticles } from '../../store/slices/userArticlesSlice';
import ProfileWrapper from './ProfileWrapper/ProfileWrapper';


const useStyles = makeStyles((theme) => ({

}))

const ProfileUserArticlesPage = ({ user, isUserOwner }) => {
    
    const classes = useStyles();
    const dispach = useDispatch();
    
    //Получаем информацию о статьях пользователя
    const userArticles = useSelector(selectUserArticles);
    useEffect(() => {
        if(isUserOwner){
            dispach(getUserArticles())
        } else {
            dispach(getUserPublishedArticles(user.username))
        }  
    }, [])

    return (
        <ProfileWrapper user={user} isUserOwner={isUserOwner}>

            { userArticles.length > 0 ? 
                <Grid container spacing={3}>
                    {userArticles.map(item => (
                        <ArticleCard 
                            key={item.id} 
                            article={item}
                        />
                    ))}
                </Grid>
                :
                <ProfileTabStab type={'articles'}/>
            }
            
        </ProfileWrapper>
    )
}

export default ProfileUserArticlesPage
