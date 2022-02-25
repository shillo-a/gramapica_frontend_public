import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import TextInputSecondary from '../../../components/Form/Input/TextInputSecondary';
import { openModal } from '../../../store/slices/globalModalSlice';

import { selectCurrentUser } from '../../../store/slices/authenticationSlice';
import { postPublishedArticleComment } from '../../../store/slices/publishedArticleCommentsSlice';

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(1)
    }
}))

const CommentReplyForm = ({
    className: parrentClassName,
    articleId,
    currentCommentType,
    setCurrentCommentType
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Определяем, какой пользователь сейчас залогинен или залогинен ли
    const currentUser = useSelector(selectCurrentUser);

    //Локальный стейт для управления телом комментария
    const [commentBody, setCommentBody] = useState('');

    //Управление нажатием кнопки "Отмена"
    const cancelHandler = () => {
        setCurrentCommentType({ parentId: null, type: 'write' })
    }

    //Управление добавлением реплая (комментария)
    const addCommentHandler = async () => {

        // 1. Проверяем, авторизован ли пользователь
        // 2. Если не авторизован, предлагаем ему выполнить вход
        if(!currentUser.id){
            dispatch(openModal('auth'))
            return
        }

        // 3. Если авторизован, создаем комментарий
        await dispatch(postPublishedArticleComment({articleId, comment: {
            parentId: currentCommentType.parentId,
            body: commentBody
        }}))

        //4. Сбрасываем CurrentCommentType
        setCurrentCommentType({ parentId: null, type: 'write' })
    }

    return (
        <div className={parrentClassName}>

            <TextInputSecondary
                minRows={4}
                placeholder="Написать ответ..."
                autoFocus
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            />

            <Grid container spacing={1} className={classes.buttons}>
                <Grid item>
                    <ButtonTertiary onClick={cancelHandler}>
                        Отменить
                    </ButtonTertiary>
                </Grid>

                <Grid item>
                    <ButtonPrimary onClick={addCommentHandler}>
                        Ответить
                    </ButtonPrimary>
                </Grid>
            </Grid>

        </div>
    )
}

export default CommentReplyForm
