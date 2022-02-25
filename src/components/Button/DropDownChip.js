import React, { useState } from 'react';
import { Menu, MenuItem, Button, makeStyles, Chip } from '@material-ui/core';
import clsx from 'clsx';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    chip: {
        
    },
    chipLabel:{
        display:'flex',
        alignItems: 'center'
    }
}))

const DropDownChip = (props) => {

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
            <Chip
                aria-controls="menu" 
                aria-haspopup="true"
                onClick={handleMenuOpen}
                className={clsx(classes.chip, props.className)}
                color={props.menu.currentItem.id === 1 ? 'default' : 'primary' }
                label = {
                    
                    <div className={classes.chipLabel}>
                        {props.menu.currentItem.id === 1 ? props.description : props.menu.currentItem.name}
                        <ArrowDropDownIcon/>
                    </div>           
                }
            />

            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                placeholder="Тест"
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

export default DropDownChip