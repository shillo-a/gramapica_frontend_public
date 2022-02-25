import { makeStyles } from '@material-ui/core';
import React from 'react';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper
    },

    spoilerIcon: {
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main
    },

    spoiler: {
        // padding: theme.spacing(0.5),
        // background: 'linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0, #fb3 75%, #58a 0)',
        // backgroundSize: '42.426406871px 42.426406871px'
    },

    textInput: {
        fontStyle: 'italic'
    }
    
}))

const SpoilerSection = ({ currentSection, handleTextChange }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <WarningRoundedIcon className={classes.spoilerIcon}/>
            
            <TextInputPrimary 
                className={classes.textInput}
                placeholder="Спойлер"
                noBorder={true}
                value={currentSection.body || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                
                autoFocus
            />
        </div>
        
    )
}

export default SpoilerSection;