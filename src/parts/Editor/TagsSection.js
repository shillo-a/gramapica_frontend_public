import { Chip, makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTags, putDraftArticleTags, setChangeHappenedRightNow } from '../../store/slices/currentArticleSlice';
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

const TagsSection = ({ currentArticleTags }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    //Загружаем все доступные теги (справочник) при первом рендере (Redux)
    const tags = useSelector(selectTags)
    useEffect(()=>{
        dispatch(getTags())
    }, [])

    //Local state
    const [currentArticleTagsLocal, setCurrentArticleTagsLocal] = useState(currentArticleTags);

    //Redux --> Local
    useEffect(()=>{
        if(currentArticleTags !== currentArticleTagsLocal){
            setCurrentArticleTagsLocal(currentArticleTags)
        }
    }, [currentArticleTags])

    //Фиксируем, что прямо сейчас были изменения (пропускам initial render)
    // useDidUpdateEffect(() => {
    //     dispatch(setChangeHappenedRightNow());
    // }, [currentArticleTagsLocal])

     //Фиксируем, что прямо сейчас были изменения (делаем это по действию - change)
     const handleChangeCurrentArticleTagsLocal = (tags) => {
        setCurrentArticleTagsLocal(tags);
        dispatch(setChangeHappenedRightNow());
    }

    //Отложенная загрузка в Redux state
    const debouncedCurrentArticleTagsLocal = useDebounce(currentArticleTagsLocal, 1000);
    useEffect(()=>{
        if(currentArticleTags !== currentArticleTagsLocal){
            // dispatch(changeTags(currentArticleTagsLocal))
            dispatch(putDraftArticleTags(currentArticleTagsLocal)) //put tags
        }
    },[debouncedCurrentArticleTagsLocal])
    
    return (
        <div className={classes.sectionContainer}>
            <div className={classes.sectionLeftButtons}></div>
            <div className={classes.sectionContent}>

                <Autocomplete
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option.name}
                    noOptionsText={'Подходящие теги не найдены'}
                    getOptionSelected={(option, value) => option.id === value.id}
                    filterSelectedOptions
                    
                    renderInput={(params) => 
                        <TextField 
                            {...params}
                            variant="outlined"
                            placeholder='Теги'
                        />
                    }

                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip 
                                color="default"
                                className={classes.tag}
                                label={option.name} 
                                {...getTagProps({ index })} 
                            />
                        ))
                    }

                    value={currentArticleTagsLocal}
                    onChange={(e, newValue) => {
                        handleChangeCurrentArticleTagsLocal(newValue)
                    }}

                />

            </div>
            <div className={classes.sectionRightButtons}></div>
        </div>
    )
}

export default TagsSection;