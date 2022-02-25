import { makeStyles } from '@material-ui/core';
import React from 'react'
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';

const useStyles = makeStyles((theme) => ({
    textInput: {
        ...theme.typography.subtitle1,
        fontWeight: 900,
        // lineHeight: '120%'
    }
}))

const SubheaderSection = ({ currentSection, handleHeaderChange }) => {

    const classes = useStyles();

    return (
        <TextInputPrimary
            className={classes.textInput}
            placeholder="Заголовок" 
            noBorder={true}
            value={currentSection.header || ''}
            onChange={(e) => handleHeaderChange(e.target.value)}
            
            autoFocus
        />
    )
}

export default SubheaderSection
