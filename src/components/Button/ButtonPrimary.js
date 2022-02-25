import React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core/';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        position: 'relative',
    },

    button: {

    },
    
    icon: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    }
}))

const ButtonPrimary = (props) => {

    //раскладываем props
    const { loading, className, ...buttonProps } = props;

    const classes = useStyles();

    return (
        <div className={clsx(classes.buttonContainer, className)}>
            <Button 
                {...buttonProps}
                className={classes.button}
                variant="contained" 
                color="primary"
                disabled={loading}
            />
            {loading && 
                <CircularProgress 
                    size='24px'
                    className={classes.icon}
                />
            }
        </div>
    )
}

export default ButtonPrimary


  // border: `1px solid ${theme.palette.grey[300]}`,
        // background: theme.palette.background.paper,
        // color: theme.palette.grey[900],
        // "&:hover": { 
        //     border: `1px solid ${theme.palette.grey[900]}`,
        //     background: theme.palette.background.paper,
        // }