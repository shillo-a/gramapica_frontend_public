import { Button, Divider, makeStyles } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';

import { launchModal } from '../../store/slices/globalModalSlice';
import { deleteDraftArticle } from '../../store/slices/draftArticlesSlice';
import DropDownWrapper from './DropDownParts/DropDownWrapper';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';

const useStyles = makeStyles((theme) => ({
 
    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    }

}))

const PublishedArticleDropDown = ({ articleId }) => {

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

            childrenButton = {
                <MoreHorizRoundedIcon />
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

export default PublishedArticleDropDown
