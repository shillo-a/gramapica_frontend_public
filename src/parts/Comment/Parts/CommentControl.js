import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import LinkPrimary from '../../../components/Link/LinkPrimary';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import CommentDeleteButton from '../Controls/CommentDeleteButton';
import { useIsOwner } from '../../../utils/customHooks/useIsOwner';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({

    control: {
        display: 'flex',
        flexWrap: 'wrap',
        color: theme.palette.grey[700]
    },

    controlButton: {
        display: 'flex',
        alignItems: 'center', 
        marginRight: theme.spacing(1),
    },

    controlButton__icon: {
        ...theme.typography.subtitle2,
    },

    controlButton__text: {
        ...theme.typography.subtitle2,
        marginLeft: theme.spacing(0.5),
    },

}))

const CommentControl = ({
    className: parentClassName, 
    comment,
    replyHandler,
    editHandler

}) => {
    
    const classes = useStyles();

    const isOwner = useIsOwner(comment.author.id); //Текущий пользовтаель владелец комментария

    return (
        <div className={clsx(classes.control, parentClassName)}>
            <LinkPrimary 
                className={classes.controlButton}
                onClick={replyHandler}
            >
                <ChatBubbleOutlineOutlinedIcon className={classes.controlButton__icon}/>
                <Typography className={classes.controlButton__text}>Ответить</Typography>
            </LinkPrimary>

            { isOwner && <>
                <LinkPrimary className={classes.controlButton}>
                    <CreateRoundedIcon 
                        className={classes.controlButton__icon}
                        onClick={editHandler}
                    />
                </LinkPrimary>

                <CommentDeleteButton commentId={comment?.id}/>
            </>}
        </div>
    )
}

export default CommentControl
