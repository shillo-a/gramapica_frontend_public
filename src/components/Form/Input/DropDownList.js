import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
    list: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        maxHeight: '192px',
        background: 'white',
        overflow: 'auto',
        boxShadow: theme.shadows[5],
        zIndex: 9999
    }
}))

const DropDownList = ({ items, handleSelect }) => {

    const classes = useStyles();

    return (
        <>
        {items.length > 0 ?
            <List className={classes.list}>
                {items.map((item, index) => (
                    <ListItem button key={index} onClick={() => handleSelect(item.displayName)}>
                        <ListItemText primary={item.displayName} />
                    </ListItem>
                ))}
                
            </List>
            :
            <></>
        }
        </>
    )
}

function checkEquality(prevProps, nextProps){
    return prevProps.items === nextProps.items
}

export default React.memo(DropDownList, checkEquality)
