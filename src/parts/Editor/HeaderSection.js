import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeArticleName, selectCurrentArticleName, setChangeHappenedRightNow } from '../../store/slices/currentArticleSlice';
import useDebounce from '../../utils/customHooks/useDebounce';
import useMountFinished from '../../utils/customHooks/useMountFinished';
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';
import { createRandomId } from '../../utils/functions/createRandomId';
import { useDidUpdateEffect } from '../../utils/customHooks/useDidUpdateEffect';

const useStyles = makeStyles((theme)=>({
    sectionContainer: {
        display: 'flex'
    },
    sectionLeftButtons: {
        minWidth: '1.5rem'
    },
    sectionContent: {
        margin: theme.spacing(0, 1),
        flexGrow:1
    },
    textInput: {
        ...theme.typography.h5,
        fontWeight: 900,
    },
    sectionRightButtons: {
        minWidth: '1.5rem'
    }
}))

const HeaderSection = ({ currentArticleName }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Local state
    const [currentArticleNameLocal, setCurrentArticleNameLocal] = useState(currentArticleName);
    
    //Redux state --> Local state
    useEffect(()=>{
        if(currentArticleName !== currentArticleNameLocal){
            setCurrentArticleNameLocal(currentArticleName)
        }
    }, [currentArticleName])

    //Фиксируем, что прямо сейчас были изменения (делаем это по действию - change)
    const handleChangeCurrentArticleNameLocal = (articleName) => {
        setCurrentArticleNameLocal(articleName)
        dispatch(setChangeHappenedRightNow());
    }

    //Local state --> Redux state (отложенная загрузка)
    const debouncedCurrentArticleNameLocal = useDebounce(currentArticleNameLocal, 1000);
    useEffect(()=>{
        if(currentArticleName !== currentArticleNameLocal){
            dispatch(changeArticleName(currentArticleNameLocal))
        }
    }, [debouncedCurrentArticleNameLocal])

    

    return (
        <div className={classes.sectionContainer}>
            <div className={classes.sectionLeftButtons}></div>
            <div className={classes.sectionContent}>
                <TextInputPrimary
                    className={classes.textInput}
                    placeholder="Заголовок статьи" 
                    noBorder={true}
                    value={currentArticleNameLocal}
                    onChange={(e) => {handleChangeCurrentArticleNameLocal(e.target.value)}}
                />
            </div>
            <div className={classes.sectionRightButtons}></div>
        </div>
    )
}

export default HeaderSection;