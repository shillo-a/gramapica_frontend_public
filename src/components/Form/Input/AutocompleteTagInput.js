import { Chip, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react'

import TextInputPrimary from '../Input/TextInputPrimary';

const useStyles = makeStyles((theme) => ({
    tagInputContainer: {
        width: '100%'
    },

    tag: {
        backgroundColor: theme.palette.background.paper,
    }
}))

const AutocompleteTagInput = (props) => {

    //раскладываем props
    const {...styleProps} = props;

    const classes = useStyles();

    return (
        <div className={classes.tagInputContainer}>
            <Autocomplete
                {...styleProps}
                multiple
                freeSolo

                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Теги"
                        size="small"
                    />
                )}

                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip className={classes.tag} variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
            />
        </div>
    )
}

export default AutocompleteTagInput


// backgroundColor: theme.palette.background.paper,