import { Button, Divider, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';

import { launchModal } from '../../store/slices/globalModalSlice';

import DropDownWrapper from './DropDownParts/DropDownWrapper2';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

import { deleteUserArticle, putUserArticleStatus } from '../../store/slices/userArticlesSlice'

const useStyles = makeStyles((theme) => ({
 
    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    },

    linkButton: {
        ...theme.typography.caption,
        padding:0,
        minWidth: 0,
        // for disabled button
        color: `inherit !important`,
        "&:hover": {
            color: `${theme.palette.primary.main} !important`,
            background: 'transparent'
        }
    },

}))

const UserArticleDropDown = ({ articleId }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleStatusChange = async () => {
        const { payload: isConfirmed } = await dispatch(launchModal('changeStatusToDraft'));
        if(isConfirmed){
            dispatch(putUserArticleStatus({articleId, statusName: 'draft'}));
        } 
    }

    const handleDeleteArticle = async () => {
        const { payload: isConfirmed } = await dispatch(launchModal('deleteUserArticle'));
        if(isConfirmed){
            dispatch(deleteUserArticle(articleId));
        } 
    }

    return (

        <DropDownWrapper

            placement={'bottom-end'}

            childrenButton = {
                <IconButton 
                    size='small'
                    className={classes.linkButton}
                >
                    <MoreHorizRoundedIcon/>
                </IconButton>     
            }

            childrenPopper = {<>
                <Button
                    className={classes.menuButton}
                    onClick={() => handleStatusChange()}
                >
                    Вернуть в черновики
                </Button>

                <Divider/>
                <Button
                    className={classes.menuButton}
                    onClick={() => handleDeleteArticle()}
                >
                    Удалить
                </Button>
            </>}
            
        />
    )
}

export default UserArticleDropDown
