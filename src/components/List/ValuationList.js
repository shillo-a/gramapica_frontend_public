import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import ButtonPrimary from '../Button/ButtonPrimary';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

const useStyles = makeStyles((theme) => ({
    valuationList: {
        // display: 'flex',
        // justifyContent: 'space-between'
    },

    linkButton: {
        ...theme.typography.caption,
        padding:0,
        marginRight: theme.spacing(2),
        minWidth: 0,
        // for disabled button
        color: `inherit !important`,
        "&:hover": {
            color: `${theme.palette.primary.main} !important`,
            background: 'transparent'
        }
    },

    linkIcon: {
        marginRight: theme.spacing(0.5),
    },

    linkText: {
    },
}))


const ValuationList = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.valuationList}>
            <Button className={classes.linkButton}>
                <FavoriteBorderRoundedIcon className={classes.linkIcon}/>
                <div className={classes.linkText}>1</div> 
            </Button>

            <Button className={classes.linkButton}>
                <BookmarkBorderRoundedIcon className={classes.linkIcon}/>
                <div className={classes.linkText}>99</div> 
            </Button>

            <Button className={classes.linkButton}>
                <ChatBubbleOutlineRoundedIcon className={classes.linkIcon}/>
                <div className={classes.linkText}>122</div> 
            </Button>

            <Button className={classes.linkButton} disabled>
                <VisibilityRoundedIcon className={classes.linkIcon}/>
                <div className={classes.linkText}>11К</div> 
            </Button>
        </div>
    )
}

export default ValuationList
