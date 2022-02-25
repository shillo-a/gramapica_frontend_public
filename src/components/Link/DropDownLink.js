import React, { useState } from 'react';
import { Menu, MenuItem, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: 'pointer',
        "&:hover": {
            color: theme.palette.primary.main,
        },
        textAlign: "center",
        zIndex: 10
    },
    linkIcon: {
        verticalAlign: 'middle'
    }
}))

const DropDownLink = (props) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuPick = (id) => {
        setAnchorEl(null);
        props.setMenu(id)
    }
    
    return (
        <>
            <span
                aria-controls="menu" 
                aria-haspopup="true"
                onClick={handleMenuOpen}
                className={clsx(classes.link, props.className)}
            >
                {props.menu.currentItem.name}
                <ArrowDropDownIcon className={classes.linkIcon}/>
            </span>

            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {props.menu.items.map(item => (
                    <MenuItem
                        key={item.id}
                        selected={item.id === props.menu.currentItem.id}
                        onClick={() => { handleMenuPick(item.id) }}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default DropDownLink