import {  makeStyles,  } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getUser, selectUser } from '../../store/slices/userSlice';

import BlockError404 from '../../components/StubBlocks/BlockError404'
import { Switch, Route } from 'react-router-dom';
import { useIsOwner } from '../../utils/customHooks/useIsOwner';

import ProfileDraftsPage from './ProfileDraftsPage';
import ProfileUserArticlesPage from './ProfileUserArticlesPage';
import BlockError403 from '../../components/StubBlocks/BlockError403';
import ProfileFavoriteArticlesPage from './ProfileFavoriteArticlesPage';
import ProfileUserCommentsPage from './ProfileUserCommentsPage';

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        margin: theme.spacing(3, 0)
    },
    profileDataContainer: {
        marginTop: theme.spacing(3)
    },
    profileTabsContainer: {

    },
    profileAdditionalDataContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}))

// Можно просматривать как свой профиль, так и чужой - будут отличаться доступные действия
// Необходимо определить это профиль пользователя или чужой
// При вхоже на страницу запрашиваем информацию по пользователю - по себе или по чужому

const ProfilePage = ({ match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    //Получаем из URL, поиск какого юзера осущеcтвляется
    const userKey = match.params.key;

    //Задаем БАЗУ pathname текущей страницы
    const currentPathnameBase = '/profile/:key'

    //Запрашиваем информацию по юзеру
    let user = useSelector(selectUser);
    useEffect(() => {
        dispatch(getUser(userKey))
    }, [userKey])

    //Проверяем, запросил ли пользователбю информацию по себе
    const isOwner = useIsOwner(user?.id);
    const isUserOwner = useIsOwner(user?.id);

    return (
        <>{user ?
            <Switch>

                <Route exact path={currentPathnameBase} render={(props) => 
                    <ProfileUserArticlesPage {...props} user={user} isUserOwner={isUserOwner}/>
                }/>

                <Route exact path={currentPathnameBase.concat('/comments')} render={(props) => 
                    <ProfileUserCommentsPage {...props} user={user} isUserOwner={isUserOwner}/>
                }/>

                <Route exact path={currentPathnameBase.concat('/favorites')} render={(props) => 
                    isOwner ? <ProfileFavoriteArticlesPage {...props} user={user} isUserOwner={isUserOwner}/> : <BlockError403 {...props}/>
                }/>

                <Route exact path={currentPathnameBase.concat('/drafts')} render={(props) => 
                    isOwner ? <ProfileDraftsPage {...props} user={user} isUserOwner={isUserOwner}/> : <BlockError403 {...props}/>
                }/>

            </Switch>
            // Выдаем ошибку 404, если пользователь не загрузился
            : <BlockError404/> 
            
        }</>
    )

}

export default ProfilePage

{/* <Route exact path={currentPathnameBase.concat('/reviews')} render={(props) => 
    isOwner ? <ProfileUserArticlesPage {...props} user={user} isUserOwner={isUserOwner}/> : <BlockError403 {...props}/>
}/> */}

{/* <Route exact path={currentPathnameBase.concat('/editor')} render={(props) => 
    isOwner ? <ProfileEditorPage {...props} user={user} isOwner={isOwner}/> : <BlockError403 {...props}/>
}/> */}

{/* <Route path={currentPathnameBase.concat('/settings')} render={(props) => 
    isOwner ? <ProfileSettingsPage {...props} user={user} isOwner={isOwner}/> : <BlockError403 {...props}/>
}/> */}