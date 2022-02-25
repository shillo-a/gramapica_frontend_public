import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import TextInputSecondary from '../../../components/Form/Input/TextInputSecondary';
import { selectCurrentUser } from '../../../store/slices/authenticationSlice';
import { openModal } from '../../../store/slices/globalModalSlice';
import { postPublishedArticleComment } from '../../../store/slices/publishedArticleCommentsSlice';

const useStyles = makeStyles((theme) => ({
    input: {
        
    },

    inactiveInput: {
        background: theme.palette.grey[200]
    },

    buttons: {
        marginTop: theme.spacing(1)
    }
}))

const CommentWriteForm = ({
    className: parrentClassName,
    articleId,
    currentCommentType,
    setCurrentCommentType,
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Определяем, какой пользователь сейчас залогинен или залогинен ли
    const currentUser = useSelector(selectCurrentUser);

    //Локальный стейт для управления телом комментария
    const [commentBody, setCommentBody] = useState('');

    //Создаем новый комментарий (REDUX)
    const addCommentHandler = async () => {

        // 1. Проверяем, авторизован ли пользователь
        // 2. Если не авторизован, предлагаем ему выполнить вход
        if(!currentUser.id){
            dispatch(openModal('auth'))
            return
        }

        // 3. Если авторизован, создаем комментарий
        await dispatch(postPublishedArticleComment({articleId, comment: {
            parent_id: currentCommentType.parentId,
            body: commentBody
        }}))

        //4. отчищаем локальный стейт только в случае успешного создания комментария
        setCommentBody('')

        //5. Перемещемся вниз страницы, после успешного создания комментария
        // window.scrollToBottom()
    }

    const commentIsWriting = currentCommentType.parentId === null && currentCommentType?.type === 'write';

    return (
        <div
            className={parrentClassName}
            onFocus={() => setCurrentCommentType({ parentId: null, type: 'write' })}
        >

            <TextInputSecondary
                className={commentIsWriting? classes.input : classes.inactiveInput}
                minRows={commentIsWriting? 4: 1}

                placeholder="Написать комментарий..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            />

            <div className={classes.buttons}>
                <ButtonPrimary onClick={addCommentHandler}>
                    Отправить
                </ButtonPrimary>
            </div>

        </div>
    )
}

export default CommentWriteForm
