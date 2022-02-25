import React, { useState } from 'react'

import { Grid, InputBase, makeStyles } from '@material-ui/core'
import clsx from 'clsx';

import Form from '../../components/Form/Form'
import TextInput from '../../components/Form/Input/TextInput'
import ButtonPrimary from '../../components/Button/ButtonPrimary'
import ButtonTertiary from '../../components/Button/ButtonTertiary'

const useStyles = makeStyles((theme) => ({
    commentFormContainer: {
        
    },

    commentTextInput: {
        // background: 'grey'
    },

    commentFormButton: {
        marginTop: theme.spacing(1),
 
    }

}))

const CommentForm = (props) => {

    const classes = useStyles();
    
    //Создаем стейт для хранения текущего комментария
    const [commentBody, setCommentBody] = useState(
        //Меняем стейт, если есть initialState for commentBody
        props.initialBody || ''
    );

    //проверяем, был ли введен текст, чтобы его можно было отправить
    const isTextAreaEmpty = commentBody.length === 0

    //Отдаем текст комментария
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(commentBody, props.parentCommentId);
        setCommentBody('');
    }

    //Определям данные для отражения в форме в зависимости от типа
    const [options, setOptions] = useState({
        write: {
            placeholder: 'Написать комментарий...',
            autoFocus: false,
            minRows: 1,
            showDeclineButton: false,
            buttonSendName: 'Отправить'
        },
        reply: {
            placeholder: 'Написать ответ...',
            autoFocus: true,
            minRows: 4,
            showDeclineButton: true,
            buttonSendName: 'Ответить'
        },
        edit: {
            placeholder: 'Редактировать комментарий...',
            autoFocus: true,
            minRows: 4,
            showDeclineButton: true,
            buttonSendName: 'Редактировать'
        }
    })

    return (
        <Form 
            className={clsx(classes.commentFormContainer, props.className)} 
            onSubmit={handleSubmit}
            onFocus={props.onFocus}
        >

            <TextInput 
                className={classes.commentTextInput}
                value={commentBody} 
                onChange={e => setCommentBody(e.target.value)}

                placeholder={options[props.type].placeholder} 
                minRows={props.minRows || options[props.type].minRows}    
                autoFocus={options[props.type].autoFocus}
            />

            <Grid container spacing={1}>

                {options[props.type].showDeclineButton &&
                    <Grid item>
                        <ButtonTertiary 
                            className={classes.commentFormButton}
                            onClick={props.handleCancel}
                        >Отменить</ButtonTertiary>
                    </Grid>
                }
                <Grid item>
                    <ButtonPrimary className={classes.commentFormButton} type="submit" disabled={isTextAreaEmpty}>{options[props.type].buttonSendName}</ButtonPrimary>
                </Grid>
            </Grid>


        </Form>
    )
}

export default CommentForm
