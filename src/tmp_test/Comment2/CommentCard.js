import React, { useState } from 'react';
import { Avatar, Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import LinkPrimary from '../../components/Link/LinkPrimary';

import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme) => ({
    commentContainer: {
        marginTop: theme.spacing(2),
    },
    commentHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    },
    commentAvatar: {
        marginRight: theme.spacing(1),
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        flexBasis: 'content',

     
    },
    commentHeaderInfo: {
    },
    username: {
        ...theme.typography.subtitle2,
        fontWeight: 900,
        
    },
    createdAt: {
        ...theme.typography.caption
    },

    commentBody: {
        marginBottom: theme.spacing(1)
    },

    commentBodyText: {
        ...theme.typography.subtitle2,
        whiteSpace: 'pre-line'
    },

    commentButtons: {
        ...theme.typography.subtitle2,
        display: 'flex',
        flexWrap: 'wrap',
    },

    commentButton: {
        marginRight: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center', 
        color: 'grey'
    },
    commentButtonIcon: {
        ...theme.typography.subtitle2,
        
    },
    commentButtonText: {
        ...theme.typography.subtitle2,
        marginLeft: theme.spacing(0.5),
    },

    openTreeButtonContainer: {
        ...theme.typography.caption,
        marginTop: theme.spacing(1),
        color: 'grey'
    },

    openTreeButton: {
        color: theme.palette.primary.main,
    },

    repliesBlock: {
        display: 'flex',
        flexWrap: 'wrap'
    },

    repliesBlockHidden: {
        display: 'none'
    },

    repliesDividerContainer: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(2.5),
        cursor: 'pointer',
        textAlign: 'left',
        "&:hover hr": {
            background: theme.palette.primary.main,
        }
    },

    repliesDivider: {
        height: '100%'
    },

    commentReplies: {
        flexGrow: 1
    },

    commentForm: {
        marginTop: theme.spacing(1)
    }

}))

const CommentCard = (props) => {

    const classes = useStyles();

    //скрыть / отобразить ветку
    const [showTree, setShowTree] = useState(true);

    //статусы для возможных действий
    const commentIsMine = props.currentUserId === props.comment.userId;
    const commentArchived = props.comment.isArchived;
    const commentHasChild = props.replies.length > 0;
    const commentHasNotArchivedChild = props.replies.some(item => item.isArchived !== true);
    const commentIsReplying = props.activeComment && props.activeComment.type === 'reply' && props.comment.id === props.activeComment.id;
    const commentIsEditing = props.activeComment && props.activeComment.type === 'edit' && props.comment.id === props.activeComment.id;

    //Изменение формата значений
    //Необходимо сделать более сложный формат - см vc.ru
    const createdAt = new Date(props.comment.createdAt).toLocaleString('ru-RU', {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })

    return(
        <div className={clsx(props.className, classes.commentContainer)}>

            {!commentArchived &&
                <div className={classes.commentHeader}>
                    <Avatar className={classes.commentAvatar}/>
                    <div className={classes.commentHeaderInfo}>
                        <LinkPrimary className={classes.username}>{props.comment.username}</LinkPrimary>
                        <Typography className={classes.createdAt}>{createdAt}</Typography>
                    </div>
                </div>
            }
            
            {!commentArchived ?
                <div className={classes.commentBody}>
                    <Typography className={classes.commentBodyText}>{props.comment.body}</Typography>
                </div>
                :
                <>{commentArchived && 
                    <Typography className={classes.commentBodyText}>Комментарий был похищен 🕵</Typography>
                }</>
            }

            {!commentArchived &&
                <div className={classes.commentButtons}>
                    <LinkPrimary 
                        className={classes.commentButton}
                        onClick = {() => {
                            props.setActiveComment({id: props.comment.id, type: 'reply'})
                        }}
                    >
                        <ChatBubbleOutlineOutlinedIcon className={classes.commentButtonIcon}/>
                        <Typography className={classes.commentButtonText}>Ответить</Typography>
                    </LinkPrimary>

                    { commentIsMine &&
                        <LinkPrimary 
                            className={classes.commentButton}
                            onClick = {() => {
                                props.setActiveComment({id: props.comment.id, type: 'edit'})
                            }}
                        ><CreateRoundedIcon className={classes.commentButtonIcon}/></LinkPrimary>
                    } 

                    { commentIsMine &&
                        <LinkPrimary 
                            className={classes.commentButton}
                            onClick={()=> props.deleteComment(props.comment.id)}
                        ><CloseRoundedIcon className={classes.commentButtonIcon}/></LinkPrimary>
                    }
                </div>
            }

            {/* ФОРМА СОЗДАНИЯ ОТВЕТА НА КОММЕНТАРИй */}
            { commentIsReplying &&
                <CommentForm 
                    type='reply'
                    className={classes.commentForm}
                    parentCommentId={props.comment.id} //текущий комментарий будет родителем для реплая
                    handleSubmit={props.postComment}
                    handleCancel={
                        () => props.setActiveComment({id: null, type: 'write'})
                    }
                />
            }

            {/* ФОРМА РЕДАКТИРОВАНИЯ КОММЕНТАРИЯ */}
            { commentIsEditing &&
                <CommentForm 
                    type='edit'
                    className={classes.commentForm}
                    parentCommentId={props.comment.id} //изменяем текущий комментарий (parentId = currentId)
                    initialBody={props.comment.body}
                    handleSubmit={props.updateComment}
                    handleCancel={
                        () => props.setActiveComment({id: null, type: 'write'})
                    }
                />
            }
            
            {commentHasChild && (
                <div 
                    className={classes.openTreeButtonContainer} 
                    hidden={showTree}
                    onClick={()=>{setShowTree(true)}}
                >
                    <LinkPrimary className={classes.openTreeButton}>Развернуть ветку</LinkPrimary>
                </div>   
            )}

            {commentHasChild && (
                <div className={showTree ? classes.repliesBlock : classes.repliesBlockHidden} >
                    
                    <div 
                        className={classes.repliesDividerContainer} 
                        hidden={!showTree}
                        onClick={()=>{setShowTree(false)}}>

                        <Divider 
                            className={classes.repliesDivider} 
                            orientation="vertical" 
                            flexItem
                        />
                    </div>
                        
                    <div className={classes.commentReplies}>
                        {props.replies.map(item => (
                            <CommentCard 
                                key={item.id}
                                comment={item}
                                getReplies={props.getReplies}
                                replies={props.getReplies(item.id)} // calculate replies on the fly recursively
                                currentUserId={props.currentUserId}

                                deleteComment={props.deleteComment}
                                postComment={props.postComment}
                                updateComment={props.updateComment}
                                activeComment={props.activeComment}
                                setActiveComment={props.setActiveComment}
                            />
                        ))}
                    </div>
                    
                </div>
            )}

       </div>
    )
}

export default CommentCard



// {comment.body}