import { makeStyles, Typography, Divider } from '@material-ui/core';
import React, { useState } from 'react'

import AvatarSmall from '../../components/Avatar/AvatarSmall'
import LinkPrimary from '../../components/Link/LinkPrimary';
import { uploadsURL } from '../../utils/apis/config/apiUrls';


import CommentReplyForm from './InputForms/CommentReplyForm';
import CommentEditForm from './InputForms/CommentEditForm';
import CommentHeader from './Parts/CommentHeader';
import CommentBody from './Parts/CommentBody';
import CommentControl from './Parts/CommentControl';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        marginTop: theme.spacing(3),
        // '&:last-child': {
        //     marginBottom: 0
        // }
    },

    body: {
        marginTop: theme.spacing(1)
    },

    control: {
        marginTop: theme.spacing(1)
    },


    replyForm: {
        marginTop: theme.spacing(1)
    },

    editForm: {
        marginTop: theme.spacing(1)
    },

    showReplies: {
        ...theme.typography.caption,
        marginTop: theme.spacing(1),
        color: theme.palette.grey[700]
    },

    showReplies__button: {
        // color: theme.palette.primary.main,
    },

    repliesBlock: {
        display: 'flex',
        // flexWrap: 'wrap'
    }, 

    repliesBlockHidden: {
        display: 'none'
    },

    repliesBlockDivider: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(2.5),
        cursor: 'pointer',
        textAlign: 'left',
        "&:hover hr": {
            background: theme.palette.primary.main,
        }
    },

    repliesBlockDivider__divider: {
        height: '100%'
    },

    repliesBlock__replies: {
        flexGrow: 1
    }
    

}))

const CommentCard = ({ 
    comment,
    replies,
    getReplies,
    articleId,

    currentCommentType,
    setCurrentCommentType,
}) => {

    const classes = useStyles();

    //скрыть / отобразить ветку реплаев
    const [showRepliesTree, setShowRepliesTree] = useState(true)

    //статусы комментария для возможных действий с ним
    const commentHasChild = replies.length > 0;
    // const commentHasNotArchivedChild = replies.filter(item => item.isArchived !== true).length > 0;
    const commentArchived = comment.isArchived;
    
    const commentIsReplying = currentCommentType && currentCommentType?.type === 'reply' && comment.id === currentCommentType.parentId;
    const commentIsEditing = currentCommentType && currentCommentType?.type === 'edit' && comment.id === currentCommentType.parentId;

    return (
        <div className={classes.wrapper}>
            
            {/* ФОРМА КАЖДОГО КОММЕНАТРИЯ */}
            {!commentArchived ? 
                <>
                    <CommentHeader comment={comment}/>
                    <CommentBody className={classes.body} comment={comment}/>
                    <CommentControl 
                        className={classes.control} 
                        comment={comment}
                        replyHandler={() => setCurrentCommentType({type: 'reply', parentId: comment.id})}
                        editHandler={() => setCurrentCommentType({type: 'edit', parentId: comment.id})}
                    />
                </>
                :
                // Если у комментария есть дети, то показываем заглушку
                // Если детей нет, тогда вообще ничего не показываем
                (commentHasChild ?
                    <Typography className={classes.body__text}>Комментарий был похищен 🕵</Typography>:<></>
                )
                
            }

            {/* ФОРМА СОЗДАНИЯ ОТВЕТА НА КОММЕНТАРИй - REPLY*/}
            {commentIsReplying &&
                <CommentReplyForm
                    className={classes.replyForm}
                    articleId={articleId}
                    currentCommentType={currentCommentType}
                    setCurrentCommentType={setCurrentCommentType}
                />
            }

            {/* ФОРМА РЕДАКТИРОВАНИЯ КОММЕНТАРИЯ - EDIT*/}
            {commentIsEditing &&
                <CommentEditForm
                    className={classes.editForm}
                    comment={comment}
                    currentCommentType={currentCommentType}
                    setCurrentCommentType={setCurrentCommentType}
                />
            }

            {/* ИНФОРМАЦИЯ О РЕПЛАЯХ К КОММЕНТАРИЮ */}
            {commentHasChild &&
                <div 
                    className={classes.showReplies}
                    onClick={()=>{setShowRepliesTree(true)}}
                    hidden={showRepliesTree}
                >
                    <LinkPrimary className={classes.showReplies__button}>Развернуть ветку</LinkPrimary>
                </div>
            }

            {commentHasChild &&
                <div className={showRepliesTree ? classes.repliesBlock : classes.repliesBlockHidden}>

                    <div 
                        className={classes.repliesBlockDivider}
                        onClick={()=>{setShowRepliesTree(false)}}
                    >
                        <Divider
                            className={classes.repliesBlockDivider__divider}
                            orientation="vertical" 
                            flexItem
                        />
                    </div>

                    <div className={classes.repliesBlock__replies}>
                        {replies.map(item => ( //Проходимся по реплаям
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

                </div>
            }

        </div>
    )
}

export default CommentCard;
