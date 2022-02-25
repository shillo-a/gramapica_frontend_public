import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    progress: {
        position: 'fixed', 
        bottom:'0%',
        width:'100%',
        opacity: 1,
    }
}))

const GlobalLoaderManager = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Данные для отражения состояния загрузки
    const isOpened = useSelector(state => state.globalLoader.isOpened);

    return (
        <> {
            isOpened &&
            <LinearProgress className={classes.progress}/>
        }</>
    )
}

export default GlobalLoaderManager
