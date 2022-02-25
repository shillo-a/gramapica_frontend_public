import { Button, Divider, makeStyles } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';

import { launchModal } from '../../store/slices/globalModalSlice';
import { deleteDraftArticle } from '../../store/slices/draftArticlesSlice';
import DropDownWrapper from './DropDownParts/DropDownWrapper';
import ShareIcon from '@material-ui/icons/Share';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import { frontendURL } from '../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({
 
    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    },

    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    },

    menuButtonIcon: {
        width: '18px',
        height: '18px',
        color: 'lightgrey',
        marginRight: theme.spacing(1)
    },

}))

const ShareArticleDropDown = ({ articleId }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    const copyLinkHandler = (e) => {
        navigator.clipboard.writeText(frontendURL + `/articles/${articleId}`);
    }

    return (

        <DropDownWrapper

            childrenButton = {
                <ShareIcon/>
            }

            childrenPopper = {<>

                
                <Button className={classes.menuButton}
                    onClick={(e) => copyLinkHandler(e)}
                >
                    <LinkRoundedIcon className={classes.menuButtonIcon}/>
                    Копировать ссылку
                </Button>

                <Divider/>
                <Button className={classes.menuButton}
                    
                >
                    <MailOutlineRoundedIcon className={classes.menuButtonIcon}/>
                    Отправить на почту
                </Button>

            </>}
            
        />

    )
}

export default ShareArticleDropDown
