import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const DropDownButton = (props) => {

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
            <Button
                aria-controls="menu" 
                aria-haspopup="true"
                onClick={handleMenuOpen}
                className = {props.className}
            >
                {props.menu.currentItem.name}
                <ArrowDropDownIcon/>
            </Button>

            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                // disableScrollLock={true}
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

export default DropDownButton