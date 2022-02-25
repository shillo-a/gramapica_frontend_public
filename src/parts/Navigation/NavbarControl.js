import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { Avatar, IconButton, makeStyles } from '@material-ui/core'

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

import { selectCurrentUser } from '../../store/slices/authenticationSlice';
import { openModal } from '../../store/slices/globalModalSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';


import ProfileDropDown from '../DropDown/ProfileDropDown';
import { addCurrentArticle, postDraftArticle } from '../../store/slices/currentArticleSlice';
import { createRandomId } from '../../utils/functions/createRandomId';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        marginLeft: 'auto'
    },
    linkIcon: {
        width: '28px',
        height: '28px'
    },
    
}))

const NavbarControl = () => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    //Определяем, какой пользователь сейчас залогинен или залогинен ли
    const currentUser = useSelector(selectCurrentUser);

    //Управление модальным окном "Вход/ Регистрация" через глобальный модальный объект
    const handleUserSignUpIn = () => { 
        if(!currentUser.id){
            dispatch(openModal('auth'))
        }
        
    }

    //Создание новой статьи
    const handleNewArticle = async () => {

        // Если пользователь не авторизован, ему необходимо выполнить вход
        if(!currentUser.id){
            dispatch(openModal('auth'))
            return
        }

        // Если превышен лимит создания черновиков, выдаем ошибку (можно перевести на страницу черновиков)

        //Если авторизован, то создаём новую статью в Backend
        const { payload: article } = await dispatch(postDraftArticle());
        followLinkHandler(`/write-article/${article.id}`)
    
    }

    return (
        <div className={classes.buttonContainer}>

            <IconButton
                title="Поиск"
                onClick={() => followLinkHandler('/search')} 
            >
                <SearchIcon className={classes.linkIcon} />
            </IconButton>

            <IconButton
                title="Написать статью"
                onClick={() => handleNewArticle()} 
            >
                <NoteAddOutlinedIcon className={classes.linkIcon} />
            </IconButton>

            <span title="Профиль">
            {currentUser.id ?
                <ProfileDropDown currentUser={currentUser}/>
                :
                <IconButton onClick={() => handleUserSignUpIn()}>
                    <AccountCircleOutlinedIcon className={classes.linkIcon}/>
                </IconButton>
            
            }
            </span>
            
        </div>
    )
}

export default NavbarControl;

   // //Как только создается черновик, переводим пользователя на новую страницу
    // const articleId = useSelector(selectCurrentArticleId)
    // useEffect(()=>{
    //     if(articleId){
    //         followLinkHandler(`/write-article/${articleId}`)
    //     }
    // }, [articleId])
 // Если пользователь авторизован, создаем черновик новой статьи
//  dispatch(postDraftArticle())