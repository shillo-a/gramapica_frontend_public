import { Button, Divider, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';

import { launchModal } from '../../store/slices/globalModalSlice';
import { deleteDraftArticle } from '../../store/slices/draftArticlesSlice';
import DropDownWrapper from './DropDownParts/DropDownWrapper2';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

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

const DraftArticleDropDown = ({ articleId }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();


    const handleLinkEnter = (pathName) => {
        followLinkHandler(`${pathName}${articleId}`)
    }

    const handleDeleteArticle = async () => {
        const { payload: isConfirmed } = await dispatch(launchModal('deleteDraftArticle'));
        if(isConfirmed){
            dispatch(deleteDraftArticle(articleId));
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
                    onClick={() => handleLinkEnter('/write-article/')}
                >
                    Редактировать
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

export default DraftArticleDropDown
