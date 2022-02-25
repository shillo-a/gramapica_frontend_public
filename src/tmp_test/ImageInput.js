import { makeStyles, Typography, Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import IconButtonPrimary from '../../Button/IconButtonPrimary';

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const useStyles = makeStyles((theme) => ({
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    imageInput: {
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#FFF0F4',
        "&:hover": {
            backgroundColor: '#FED6E2',
        }
    },

    imageInputIcon: {
        color: theme.palette.primary.main
    },

    imageInputText: {
        color: theme.palette.primary.main,
        fontWeight: 900
    },

    imageInputButton: {
        display: 'none'
    },

    imageDeleteButton: {
        position: 'absolute',
        top: '0px',
        right: '0px'
    },

    imageDeleteIcon:{
        height: '18px',
        width: '18px'
    },
    image: {
        display: 'block',
        
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
}))

const ImageInput = ({ preview, setPreview, type, autoOpen=false, deletable=false, handleDelete }) => {

    const classes = useStyles();

    const imageInputRef = useRef();
    const [currentImage, setCurrentImage] = useState(null);
    
    //Функция загрузки через input
    const handleCurrentImageLoad = (e) => {
        const currentImage = e.target.files[0];
        if(currentImage && currentImage.type.substr(0,5) === "image"){
            setCurrentImage(currentImage)
        } else {
            setCurrentImage(null)
        }
    }

    //Функция загрузки через drag&drop
    const onDropHandler = (e) => {
        e.preventDefault();
        const currentImage = e.dataTransfer.files[0];
        if(currentImage && currentImage.type.substr(0,5) === "image"){
            setCurrentImage(currentImage)
        } else {
            setCurrentImage(null)
        }
    }

    //Асинхронно изменяем формате загруженной картинки
    useEffect(()=>{
        if(currentImage){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(currentImage);
        } else {
            setPreview(null)
        }
    }, [currentImage])


    //При первом render-е сразу открываем окно для загрузки изображения
    useEffect(()=>{
        //только для обычных фото
        autoOpen === true && 
        imageInputRef.current.click()
    }, [])
    
    console.log(currentImage)

    return (
        <div className={classes.imageContainer}> 
        {preview ? 
            <>
                {deletable &&
                    <IconButtonPrimary
                        className={classes.imageDeleteButton}
                        size="small"
                        onClick={handleDelete}
                    >
                        <ClearRoundedIcon className={classes.imageDeleteIcon}/>
                    </IconButtonPrimary>
                }
                <img className={classes.image} src={preview ? preview : null}/>
            </>
            :
            <>
                <div className={classes.imageInput}
                    onClick={(e)=>{imageInputRef.current.click()}}
                    // onDragStart={(e)=>e.preventDefault()}
                    // onDragLeave={(e)=>e.preventDefault()}
                    onDragOver={(e)=>e.preventDefault()}
                    onDrop={(e)=>onDropHandler(e)}
                >
                    <Grid container spacing={1} className={classes.imageInput}>
                        {type === 'regular' ?
                            <>
                                <Grid item><InsertPhotoOutlinedIcon className={classes.imageInputIcon}/></Grid>
                                <Grid item><Typography className={classes.imageInputText}>Загрузите изображение</Typography></Grid>
                            </>
                            :
                            <>
                                <Grid item><PersonRoundedIcon className={classes.imageInputIcon}/></Grid>
                            </>
                        }
                    </Grid>
                    
                </div>
                <input 
                    className={classes.imageInputButton} 
                    type='file' 
                    accept="image/*" 
                    encType='multipart/form-data' //большого смысла в этом нет
                    ref={imageInputRef} 
                    onChange={(e)=>{handleCurrentImageLoad(e)}}
                />
            </>
        }
        </div>
    )
}

export default ImageInput
