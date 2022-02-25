import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import AvatarSmall from '../../../components/Avatar/AvatarSmall';
import LinkPrimary from '../../../components/Link/LinkPrimary';
import { uploadsURL } from '../../../utils/apis/config/apiUrls';

import clsx from 'clsx';
import useFollowLink from '../../../utils/customHooks/useFollowLink';

const useStyles = makeStyles((theme) => ({

    header: {
        display: 'flex',
        alignItems: 'center',
    },

    header__avatar: {
        marginRight: theme.spacing(1),
    },
    
    header__username: {
        ...theme.typography.subtitle2,
        fontWeight: 900,
        lineHeight: '15px'
    },

    header__timestamp: {
        ...theme.typography.caption,
        lineHeight: '15px'
    }

}))

const CommentHeader = ({ className: parentClassName, comment }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <div className={clsx(classes.header, parentClassName)}>
            <LinkPrimary
                onClick={()=>{followLinkHandler(`/profile/${comment.author?.username}`)}}
            >
                <AvatarSmall className={classes.header__avatar} src={comment?.author?.avatarFilename && `${uploadsURL}/${comment.author.avatarFilename}`}/>
            </LinkPrimary>
            <div>
                <LinkPrimary
                    onClick={()=>{followLinkHandler(`/profile/${comment.author?.username}`)}}
                >
                    <Typography className={classes.header__username}>{comment?.author?.username}</Typography>
                </LinkPrimary>
                <Typography className={classes.header__timestamp}>{comment?.createdAt}</Typography>
            </div>
        </div>
    )
}

export default CommentHeader
