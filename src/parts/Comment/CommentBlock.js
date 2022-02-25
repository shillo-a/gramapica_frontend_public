import { makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPublishedArticleComments, getPublishedArticleComments, selectGetPublishedArticleCommentsStatus, selectPublishedArticleComments } from '../../store/slices/publishedArticleCommentsSlice';
import CommentHierarchy from './CommentHierarchy';
import {useDidUpdateEffect} from '../../utils/customHooks/useDidUpdateEffect'
import { changeCurrentCommentTypeSlice, selectCurrentCommentTypeSlice } from '../../store/slices/currentCommentTypeSlice';
import CommentWriteForm from './InputForms/CommentWriteForm';
import CommentsRefreshButton from './Controls/CommentsRefreshButton';
import { useLocation } from 'react-router-dom';
import { useOverallReduxLoadStatus } from '../../utils/customHooks/useOverallReduxLoadStatus';
import { succeeded } from '../../utils/apis/config/statuses';
import { selectGetPublishedArticle } from '../../store/slices/articleSlice';

const useStyles = makeStyles((theme) => ({

    wraper: {
        padding: theme.spacing(2, 2, 0, 2)
    },

    header: {
        ...theme.typography.h6,
        fontWeight: 900
    },

    input: {
        paddingTop: theme.spacing(2)
    },

    hierarchy: {
    },

    refresh: {
        marginTop: theme.spacing(2),
        textAlign: 'center'
    }

}))

const CommentBlock = ({ articleId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    //Получаем статус загрузки всех необходмых для компонента данных через Redux
    const componentReduxLoadStatus = useOverallReduxLoadStatus([
        selectGetPublishedArticleCommentsStatus
    ])

    // При открытии страницы, когда прогружается comment block, прокручиваем к нему
    // Получаем queryParams, в частности comments
    const location = useLocation()
    const locationSearch = location.search;
    const queryParams = new URLSearchParams(locationSearch); 
    const comment = queryParams.get('comment'); // null || 'all' || ${id}

    //Делаем скролл после загрузки необходимых данных
    const commentBlockRef = useRef();
    useEffect(()=>{
        if(componentReduxLoadStatus === succeeded.status && comment === 'all'){
            commentBlockRef.current.scrollIntoView() 
        }
    }, [componentReduxLoadStatus, comment])
    

    //Запрашиваем все комментарии по опубликованной статье (REDUX)
    const publishedArticleComments = useSelector(selectPublishedArticleComments);
    const publishedArticleCommentsNumber = publishedArticleComments.filter(item => item.isArchived !== true).length || 0;
    useEffect(() => {
        dispatch(getPublishedArticleComments(articleId))

        //unmount
        return () => {
            dispatch(clearPublishedArticleComments())
        }

    }, [])

    //Определяем тип нового комментария и какому родителю он принадлежит (write, edit, reply) - всегда выбрано одно (REDUX)
    const currentCommentType = useSelector(selectCurrentCommentTypeSlice);
    const setCurrentCommentType = (commentType) => {
        dispatch(changeCurrentCommentTypeSlice(commentType))
    }

    return (
        <div 
            className={classes.wraper}
            ref={commentBlockRef}
        >

            <Typography className={classes.header}>Комментарии - {publishedArticleCommentsNumber}</Typography>

            {/* ФОРМА СОЗДАНИЯ НОВОГО КОММЕНТАРИЯ - WRITE */}
            <CommentWriteForm
                className={classes.input}
                articleId={articleId}
                currentCommentType={currentCommentType}
                setCurrentCommentType={setCurrentCommentType}
            />

            {/* ОТОБРАЖЕНИЕ ИЕРАРХИИ КОММЕНТАРИЕВ - РЕКУРСИВНО */}
            {publishedArticleComments.length > 0 && 
                <CommentHierarchy 
                    className={classes.hierarchy}
                    comments={publishedArticleComments}
                    articleId={articleId}

                    currentCommentType={currentCommentType}
                    setCurrentCommentType={setCurrentCommentType}
                />
            }

            {/* ОТОБРАЖЕНИЕ КНОПКИ ОБНОВЛЕНИЯ КОММЕНТАРИЕВ */}
            <div className={classes.refresh}>
                <CommentsRefreshButton
                    articleId={articleId}
                />
            </div>
            
        </div>
    )
}

export default CommentBlock;


// const article = useSelector(selectArticle);
//     useEffect(() => {

//         if(getArticleOptionsStatus === succeeded.status){
//             if(isOwner){
//                 //owner может смотреть свою статью в любом статусе
//                 dispatch(getUserArticle(articleId))
//             } else {
//                 //любой пользователь может посмотреть опубликованную статью
//                 dispatch(getPublishedArticle(articleId))
//             }
//         }

//         return () => dispatch(clearArticle())
//     }, [getArticleOptionsStatus])