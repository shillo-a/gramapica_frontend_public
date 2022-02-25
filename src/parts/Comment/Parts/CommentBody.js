import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({

    body__text: {
        ...theme.typography.subtitle2,
        whiteSpace: 'pre-line',
        wordWrap: 'break-word'
    },

}))

const CommentBody = ({ className: parentClassName, comment }) => {
    
    const classes = useStyles();

    return (
        <div className={clsx(classes.body, parentClassName)}>
            <Typography className={classes.body__text}>{comment?.body}</Typography>
        </div>
    )
}

export default CommentBody
