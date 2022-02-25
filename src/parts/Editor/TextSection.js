import { makeStyles } from '@material-ui/core';
import React from 'react'
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';

const useStyles = makeStyles((theme) => ({
    textInput: {
    }
}))

const TextSection = ({ currentSection, handleTextChange }) => {

    const classes = useStyles();

    return (
        <TextInputPrimary 
            className={classes.textInput}
            placeholder="Текст"
            noBorder={true}
            value={currentSection.body || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            autoFocus
        />
    )
}

export default TextSection



// noBorder={true}