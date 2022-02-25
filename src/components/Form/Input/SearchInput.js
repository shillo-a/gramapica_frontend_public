import React from 'react';
import { Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    textField: {
        // width: '100%',
        padding: 0,
        margin: 0
    }
}));

const SearchInput = (props) => {
    const classes = useStyles();

    return (
 
    <TextField 
            {...props} 
            variant="outlined"
            type="search" 
            placeholder="Поиск"
            size="small"
            className={clsx(classes.textField, props.className)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />

    )
}

export default SearchInput;


SearchIcon