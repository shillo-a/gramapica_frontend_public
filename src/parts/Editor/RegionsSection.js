import { Chip, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTags, putDraftArticleRegions, putDraftArticleTags, setChangeHappenedRightNow } from '../../store/slices/currentArticleSlice';
import { getRegions, selectRegions } from '../../store/slices/regionsSlice';
import { getTags, selectTags } from '../../store/slices/tagSlice';
import useDebounce from '../../utils/customHooks/useDebounce';
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
        ...theme.typography.body2,
    },
    sectionRightButtons: {
        minWidth: '1.5rem'
    },
    tag: {
        color: 'red'
    }
}))

const RegionsSection = ({ currentArticleRegions }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    // Загружаем все доступные регионы (справочник) при первом рендере (Redux)
    // Загружаются в preload для всего приложения, не надо - useEffect(()=>{dispatch(getRegions())}, [])
    const regions = useSelector(selectRegions)


    //Local state
    const [currentArticleRegionsLocal, setCurrentArticleRegionsLocal] = useState(currentArticleRegions);
    
    //Redux --> Local
    useEffect(()=>{
        if(currentArticleRegions !== currentArticleRegionsLocal){
            setCurrentArticleRegionsLocal(currentArticleRegions)
        }
    }, [currentArticleRegions])

    //Фиксируем, что прямо сейчас были изменения (делаем это по действию - change)
    const handleChangeCurrentArticleRegionsLocal = (regions) => {
        setCurrentArticleRegionsLocal(regions);
        dispatch(setChangeHappenedRightNow());
    }

    //Отложенная загрузка в Redux state
    const debouncedCurrentArticleRegionsLocal = useDebounce(currentArticleRegionsLocal, 1000);
    useEffect(()=>{
        if(currentArticleRegions !== currentArticleRegionsLocal){
            dispatch(putDraftArticleRegions(currentArticleRegionsLocal)) //put regions
        }
    },[debouncedCurrentArticleRegionsLocal])

    return (
        <div className={classes.sectionContainer}>
            <div className={classes.sectionLeftButtons}></div>
            <div className={classes.sectionContent}>

                <Autocomplete
                    multiple
                    options={regions}
                    getOptionLabel={(option) => option.description}
                    noOptionsText={'Подходящие регионы не найдены'}
                    getOptionSelected={(option, value) => option.id === value.id}
                    filterSelectedOptions
                    
                    renderInput={(params) => 
                        <TextField 
                            {...params}
                            variant="outlined"
                            placeholder='Регионы'
                        />
                    }

                    renderTags={(value, getRegionProps) =>
                        value.map((option, index) => (
                            <Chip 
                                color="default"
                                className={classes.tag}
                                label={option.description} 
                                {...getRegionProps({ index })} 
                            />
                        ))
                    }

                    value={currentArticleRegionsLocal}
                    onChange={(e, newValue) => {
                        handleChangeCurrentArticleRegionsLocal(newValue)
                    }}

                />

            </div>
            <div className={classes.sectionRightButtons}></div>
        </div>
    )
}

export default RegionsSection;