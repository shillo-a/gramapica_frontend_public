import { makeStyles } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'

import ImageInput from '../../components/Form/Input/ImageInput';
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';
import { uploadsURL } from '../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2)
    },
    image: {
        display: 'block',
        height: '100%',
        width: '100%'
    },
    imageDescription: {
        marginTop: theme.spacing(1),
        ...theme.typography.body2,
    },
}))

const ImageSection = ({ currentSection, handleImageChange }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <ImageInput
                type='regular'
                autoOpen={true}

                fileLocation={uploadsURL}
                filename={currentSection.filename}
                filenameChangeHandler={(filename) => {handleImageChange( {filename: filename} )}}
            />

            { currentSection.filename && 
                <TextInputPrimary 
                        className={classes.imageDescription}

                        placeholder="Описание"
                        value={currentSection.description || ''}
                        onChange={(e)=>{handleImageChange( {description: e.target.value} )}}
            
                        // noBorder={true}
                        // autoFocus
                />
            }
            
        </div>
    )
}

export default ImageSection



// useEffect(()=>{
    //     //сохраняем изображение в БД ???
    //     //формируем наименование изображения ???
    //     preview && handleImageChange({filename: 'unic image name'})
    // }, [preview])
    
    // console.log(currentSection)