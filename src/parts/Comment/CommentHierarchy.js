import { makeStyles } from '@material-ui/core';
import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authenticationSlice';
import CommentCard from '../Comment/CommentCard';

const useStyles = makeStyles((theme) => ({

    wrapper: {
    }

}))

const CommentHierarchy = ({ 
    className: parrentClassName, 
    comments,
    articleId,

    currentCommentType,
    setCurrentCommentType,
}) => {

    const classes = useStyles();

    //1. Выбираем "корневые" комментарии
    const rootComments = comments.filter(item => item.parentId === null);

    //2. Создаём функцию для нахождения реплаев к комментариям "on the fly"
    const getReplies = (commentId) => {
        return comments.filter(item => item.parentId === commentId);
    }

    return (
        <div className={clsx(classes.wrapper, parrentClassName)}>
            {rootComments.map(item => ( //Проходимся по корневым комментариям
                <CommentCard 
                    key={item.id}
                    comment={item}
                    replies={getReplies(item.id)} //получаем реплаи "on the fly"
                    getReplies={getReplies} //передаем функцию, чтобы получать реплаи дальше по цепочке
                    articleId={articleId}
                    
                    currentCommentType={currentCommentType}
                    setCurrentCommentType={setCurrentCommentType}
                />
            ))}
        </div>
    )
}

export default CommentHierarchy
