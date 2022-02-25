import { Grid, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import ButtonPrimary from '../../../components/Button/ButtonPrimary';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import TextInputSecondary from '../../../components/Form/Input/TextInputSecondary';
import { putPublishedArticleComment } from '../../../store/slices/publishedArticleCommentsSlice';

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginTop: theme.spacing(1)
    }
}))

const CommentEditForm = ({
    className: parrentClassName,
    comment,
    currentCommentType,
    setCurrentCommentType
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Локальный стейт для управления телом комментария
    const [commentBody, setCommentBody] = useState(comment.body || '');

    //Управление нажатием кнопки "Отмена"
    const cancelHandler = () => {
        setCurrentCommentType({ parentId: null, type: 'write' })
    }

    const editCommentHandler = async () => {
        
        // 1. Реадктируем комментарий
        await dispatch(putPublishedArticleComment({commentId: comment.id, comment: {
            parentId: currentCommentType.parentId,
            body: commentBody
        }}))

        //2. Сбрасываем CurrentCommentType
        setCurrentCommentType({ parentId: null, type: 'write' })
    }

    return (
        <div className={parrentClassName}>

            <TextInputSecondary
                minRows={4}
                placeholder="Редактировать комментарий..."
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
                    <ButtonPrimary onClick={editCommentHandler}>
                        Редактировать
                    </ButtonPrimary>
                </Grid>
            </Grid>

        </div>
    )
}

export default CommentEditForm
