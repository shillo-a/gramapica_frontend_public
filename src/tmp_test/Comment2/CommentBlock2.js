import { Button, Dialog, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {failed, idle, loading, succeeded} from '../../utils/apis/config/statuses';
import commentApi from '../../utils/apis/comment.api';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

import { launchModal } from '../../store/slices/globalModalSlice';
import { launchAlert } from '../../store/slices/globalAlertSlice';
import { hideLoader, openLoader } from '../../store/slices/globalLoaderSlice';


const useStyles = makeStyles((theme) => ({
    commentContainer: {
        margin: theme.spacing(2)
    },
    commentBlockHeader: {
        ...theme.typography.h6,
        fontWeight: 900
    },
    commentFormBlock: {
        margin: theme.spacing(2, 0)
    },
    commentCard: {
        // margin: theme.spacing(3, 0)
    }
}))


// hideLoader

const CommentBlock2 = ({ articleId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //tmp информация о текущем пользователе
    const currentUserId = "1";
    
    const [comments, setComments] = useState([]);
    //Выбираем "корневые" комментарии
    const rootComments = comments.filter(item => item.parentId === null)

    //Управление формой для комментариев (write, edit, reply, none)
    //Определяем комментарий, который будет edit или reply
    const [activeComment, setActiveComment] = useState({id: null, type: 'write'})
    const commentIsWriting = activeComment.id === null && activeComment.type === 'write';

    //GC - get comments
    const [statusGC, setStatusGC] = useState(idle);
    const getComments = () => {

        setStatusGC(loading);
        //Запускаем отражение Loadera
        dispatch(openLoader());

        commentApi.getComments()
            .then(response => {
                setComments(response.data.sort((a,b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) ))
                setStatusGC(succeeded)
                //Запускаем закрытие Loadera
                dispatch(hideLoader());
            })
            .catch(error => {
                setStatusGC({...failed, message: error.message})
                //Запускаем закрытие Loadera
                dispatch(hideLoader());
            })
    }

    //Создаём функцию для нахождения реплаев к комментарию
    const getReplies = (commentId) => {
        return comments.filter(item => item.parentId === commentId)
    }
   
    useEffect(() => {
        getComments()
    }, [])

    //PC - post comment (функция для создания комментария)
    const [statusPC, setStatusPC] = useState(idle);
    const postComment = (commentBody, parentId) => {
        setStatusPC(loading);
        commentApi.postComment(commentBody, parentId)
            .then(response => {
                setStatusPC(succeeded);
                setComments([response.data, ...comments])

                //обновляем вид овтетов на комментарии
                setActiveComment({id: null, type: 'write'})
            })
            .catch(error => {
                setStatusPC({...failed, message: error.message})
            })
    }
    
    //DC - delete comment (функция для АРХИВАЦИИ комментария)
    const [statusDC, setStatusDC] = useState(idle);
    const deleteComment = async (commentId) => {
       
        //Вызываем модальное окно для получения подтверждения
        const { payload: isConfirmed } = await dispatch(launchModal('deleteComment'));

        //Выполняем действие, если получено подтверждение
        if(isConfirmed) {
            setStatusDC(loading);
            commentApi.deleteComment(commentId)
                .then(response => {
                    setStatusDC(succeeded);

                    const updatedComments = comments.map(item => {
                        if(item.id === commentId){
                            return {...item, isArchived: true}
                        }
                        return item
                    })

                    setComments(updatedComments)

                    //обновляем вид овтетов на комментарии
                    setActiveComment({id: null, type: 'write'})

                    //делаем Alert при успешно удалении
                    dispatch(launchAlert({body: 'Комментарий успешно удален', type:'success'}))
                })
                .catch(error => {
                    setStatusDC({...failed, message: error.message})
                })
        }
    }

    //UC - update comment (функция для изменения тела комментария)
    const [statusUC, setStatusUC] = useState(idle);
    const updateComment = (commentBody, commentId) => {
        setStatusUC(loading);
        commentApi.updateComment(commentBody, commentId)
            .then(response => {
                setStatusUC(succeeded);

                const updatedComments = comments.map(item => {
                    if(item.id === commentId){
                        return {...item, body: commentBody}
                    }
                    return item
                });
                
                setComments(updatedComments);

                //обновляем вид овтетов на комментарии
                setActiveComment({id: null, type: 'write'})

                //делаем Alert при успешно редактировании
                dispatch(launchAlert({body: 'Комментарий успешно отредактирован', type:'success'}))
            })
            .catch(error => {
                setStatusUC({...failed, message: error.message})
            })
    }

    return (
        <div className={classes.commentContainer}>

            <Typography className={classes.commentBlockHeader}>Комментарии - {comments.filter(item => item.isArchived != true).length}</Typography>

            {/* ФОРМА СОЗДАНИЯ НОВОГО КОММЕНТАРИЯ */}
            <CommentForm className={classes.commentFormBlock} 
                type='write'
                parentCommentId={null}
                handleSubmit={postComment}

                minRows={ commentIsWriting ? 4 : null }
                onFocus={()=>{
                    setActiveComment({id: null, type: 'write'})
                }}
                
            />
            
            {/* ОТОБРАЖЕНИЕ КОММЕНТАРИЕВ */}
            <div className={classes.comments}>
                {rootComments.map(item => (
                    <CommentCard 
                        className={classes.commentCard} 
                        key={item.id} 
                        comment={item} 
                        getReplies={getReplies}
                        replies={getReplies(item.id)} // calculate replies on the fly
                        currentUserId={currentUserId}
                        
                        deleteComment={deleteComment}
                        postComment={postComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                    /> 
                ))}
            </div>

        </div>
    )


}

export default CommentBlock2

