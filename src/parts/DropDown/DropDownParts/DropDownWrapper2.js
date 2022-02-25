import { Button, ClickAwayListener, IconButton, makeStyles, Popper } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useFollowLink from '../../../utils/customHooks/useFollowLink';


const useStyles = makeStyles((theme) => ({
    popper: {
        zIndex: 100000
    },

    menu: {
        border: '1px solid lightgrey',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '150px',

        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        borderRadius: '5px'
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

    linkButton__icon: {
        
    },

}))

const DropDownWrapper = ({ childrenButton, childrenPopper, placement }) => {

    const classes = useStyles();

    // Настройки для Popper
    const [anchorEl, setAnchorEl] = useState(null);
    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'article-popper' : undefined;
    
    return (
        <>
        {React.cloneElement(childrenButton, {'aria-describedby': id, onClick: handleToggle})}

        <Popper
            id={id} 
            open={open} 
            anchorEl={anchorEl}
            placement={placement}
            className={classes.popper}

            // Не совсем правильно, каждый раз когда нажимем на Popper, убираем его
            onClick={() => setAnchorEl(null)}
        >
            <ClickAwayListener onClickAway={handleToggle}>
            <div className={classes.menu}>

                {childrenPopper}

            </div>
            </ClickAwayListener>

        </Popper>
        </>
    )
}

export default DropDownWrapper


        // <IconButton 
        //     size='small'
        //     aria-describedby={id}
        //     onClick={handleToggle}
        //     className={classes.linkButton}
        // >
            
        //     React.{childrenButton} 

        // </IconButton>