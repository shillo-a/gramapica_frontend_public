import { Grid, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import ButtonPrimary from '../../components/Button/ButtonPrimary'
import ButtonTertiary from '../../components/Button/ButtonTertiary'
import TextInputSecondary from '../../components/Form/Input/TextInputSecondary'

const useStyles = makeStyles((theme) => ({
    test: {
        marginTop: theme.spacing(1)
    }
}))

const CommentInputForm = ({ 
    className: parrentClassName,
    currentCommentType,
    setCurrentCommentType,

    onFocus

}) => {

    const classes = useStyles();

    //Локальный стейт для управления 
    const [commentBody, setCommentBody] = useState('');
    
    //Управление отменой при создании комментария
    const cancelHandler = () => {
        setCommentBody('');
    }

    //Создаем новый комментарий (REDUX)
    //Изменяем существующий комментарий (REDUX)
    const sendHandler = () => {
        console.log('send')
    }

    
    return (
        <div
            className={parrentClassName}
            onFocus={onFocus}
        >

            <TextInputSecondary
                minRows={4}
                placeholder="Написать комментарий..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            />

            <Grid container spacing={1} className={classes.test}>
                <Grid item>
                    <ButtonTertiary onClick={cancelHandler}>
                        Отменить
                    </ButtonTertiary>
                </Grid>

                <Grid item>
                    <ButtonPrimary onClick={sendHandler}>
                        Отправить
                    </ButtonPrimary>
                </Grid>
            </Grid>

        </div>
    )
}

export default CommentInputForm
