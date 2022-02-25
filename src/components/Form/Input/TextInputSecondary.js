import React from 'react';
import { InputBase, makeStyles, Paper, TextField } from '@material-ui/core';
import clsx from 'clsx';
import IconButtonPrimary from '../../Button/IconButtonPrimary';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
    textInputContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'top',
    },

    textInput: {
        padding: theme.spacing(1, 2),
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        // borderRadius: 5,
        '&:hover': {
            outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.grey[500]}`,
            zIndex: 9999
        },
        
    },
    
    root: {
        outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.grey[300]}`
    },

    focused: {
        outline: themeProps => themeProps.noBorder ? '' : `1px solid ${theme.palette.primary.main} !important`,
        zIndex: 9999
    },


}));


const TextInputSecondary = (props) => {
    
    //раскладываем props
    const {noBorder, containerRef, inputProps, ...styleProps} = props;
    const themeProps = {noBorder: noBorder};
    
    const classes = useStyles(themeProps);

    return (
        <div className={classes.textInputContainer} ref={containerRef}>
            <InputBase 
                {...styleProps}
                {...inputProps}
                multiline={true}
                color='primary'
                classes={{root: classes.root, focused: classes.focused}}
                className={clsx(classes.textInput, props.className)}
            />
        </div>
           
    )
}

export default TextInputSecondary;

{/* <IconButtonPrimary size='small'>
                <ClearRoundedIcon/>
            </IconButtonPrimary> */}

// sx={{ ml: 1, flex: 1 }}
//         placeholder="Search Google Maps"
//         inputProps={{ 'aria-label': 'search google maps' }}

{/* <TextField 
{...styleProps} 
className={clsx(classes.textField, props.className)}
variant="outlined" 
size="small"
InputProps={{
    className: clsx(classes.inputProps, inputClassName),
    classes:{
        notchedOutline: classes.notchedOutline,
        }
}}
multiline

/>  */}



// textField: {
//     width: '100%',
    
//     backgroundColor: theme.palette.background.paper,
//     [`& fieldset`]: {
//         borderRadius: 0
//     },
// },
// inputProps: {
//     padding: theme.spacing(0, 'auto'),
// },
// notchedOutline: {
//     border: themeProps => themeProps.noBorder ? 'none' : ''
// }