import { makeStyles, Typography, Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import IconButtonPrimary from '../../Button/IconButtonPrimary';

import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CircularProgressPrimary from '../../Progress/CircularProgressPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { getTags, selectGetTagsStatus } from '../../../store/slices/tagSlice';
import { succeeded } from '../../../utils/apis/config/statuses';
import { postUpload } from '../../../store/slices/uploadsSlice';
import { createRandomId } from '../../../utils/functions/createRandomId';


const useStyles = makeStyles((theme) => ({

    wrapper: {
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

    imageInput__icon: {
        color: theme.palette.primary.main
    },

    imageInput__text: {
        color: theme.palette.primary.main,
        fontWeight: 900
    },

    imageInput__button: {
        display: 'none'
    },

    imageDelete__button: {
        position: 'absolute',
        top: '0px',
        right: '0px'
    },

    imageDelete__icon:{
        height: '18px',
        width: '18px'
    },
    
    image: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },

    imagePreview: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },

    imagePreview__progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10'
    },

    imagePreview__image: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',

        filter: 'brightness(50%)'
    }

}))

const ImageInput = ({  
    type, 
    autoOpen=false, 
    deletable=false, 

    fileLocation, 
    filename, 
    filenameChangeHandler,
    handleDelete
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const imageInputRef = useRef();

    //показываем preview на время загрузки файла
    const [preview, setPreview] = useState();

    //Асинхронная функция демонстрации preview
    const showPreview = (image) => {
        const reader = new FileReader();
        reader.onloadend = () => {
           setPreview(reader.result);
        }
        reader.readAsDataURL(image);
    }

    ////// !!! //////
    //Здесь, навреное, пригодился бы RxJS, подумать на перспективу
    const handleImageLoad = async (currentImage) => {

        //1. Проверяем, точно ли загружено изображение, если нет, то делаем СБРОС - можно выкинуть ошибку
        if(!currentImage || currentImage.type.substr(0,5) !== "image"){
            return
        }

        //2. Создаем и показываем preview на время загрузки файла
        showPreview(currentImage);
        
        //3. Загружаем изображение на сервер, предварительно превращаем в FormData
        let currentImageFD = new FormData();
        currentImageFD.append('image', currentImage)
        const { payload: file } = await dispatch(postUpload( {file: currentImageFD, uploadId: createRandomId()} ))
        
        //4. Передаем название файла в стейт для загрузки
        if(file?.filename){
            filenameChangeHandler(file.filename)
        }
        
    }

    //5. Отчищаем preview, когда появляется filename
    useEffect(()=>{
        if(filename){
            setPreview();
        }
    }, [filename])
    ////// !!! //////

    //Функция загрузки через input
    const fileInputChangeHandler = (e) => {
        const currentImage = e.target.files[0];
        handleImageLoad(currentImage);
    }

    //Функция загрузчки через drag&drop
    const dropHandler = (e) => {
        e.preventDefault();
        const currentImage = e.dataTransfer.files[0];
        handleImageLoad(currentImage);
    }

    //При первом render-е сразу открываем окно для загрузки изображения
    useEffect(()=>{
        //Если нет изображения или preview
        if(!preview && !filename){
            //только для обычных фото
            autoOpen === true && 
            imageInputRef.current.click()
        }
    }, [])

    return (
        <div className={classes.wrapper}> 

        {preview || filename ?
            <>
                {preview ?
                    <div className={classes.imagePreview}>
                        <div className={classes.imagePreview__progress}>
                            <CircularProgressPrimary size="2rem"/>
                        </div>
                        <img className={classes.imagePreview__image} src={preview}/> 
                    </div> //from preview
                    :
                    <>
                    {deletable &&
                        <IconButtonPrimary
                            className={classes.imageDelete__button}
                            size="small"
                            onClick={handleDelete}
                        >
                        <ClearRoundedIcon className={classes.imageDelete__icon}/>
                        </IconButtonPrimary>
                    }
                    <img className={classes.image} src={`${fileLocation}/${filename}`}/> 
                    </> //from server
                }
            </>
            :
            <>
                <div className={classes.imageInput}
                    onClick={(e)=>{imageInputRef.current.click()}}
                    // onDragStart={(e)=>e.preventDefault()}
                    // onDragLeave={(e)=>e.preventDefault()}
                    onDragOver={(e)=>e.preventDefault()}
                    onDrop={(e)=>dropHandler(e)}
                >
                    <Grid container spacing={1} className={classes.imageInput}>
                        {type === 'regular' &&
                            <>
                                <Grid item><InsertPhotoOutlinedIcon className={classes.imageInput__icon}/></Grid>
                                <Grid item><Typography className={classes.imageInput__text}>Загрузите изображение</Typography></Grid>
                            </>
                        }
                        {type === 'quote' &&
                            <>
                                <Grid item><PersonRoundedIcon className={classes.imageInput__icon}/></Grid>
                            </>
                        }
                        {type === 'avatar' &&
                            <>
                                <Grid item><PersonRoundedIcon className={classes.imageInput__icon}/></Grid>
                            </>
                        }
                    </Grid>
                    
                </div>
                <input 
                    className={classes.imageInput__button} 
                    type='file' 
                    accept="image/*" 
                    // encType='multipart/form-data' //большого смысла в этом нет
                    name="image"
                    ref={imageInputRef} 
                    onChange={(e)=>{fileInputChangeHandler(e)}}
                />
            </>
        }

        </div>
    )
}

export default ImageInput


   // await dispatch(getTags())
        // const getTagsStatus = useSelector(selectGetTagsStatus);

        // if(getTagsStatus.status === succeeded.status){
        //     setPreview(null)
        // }

        // console.log(1)
        // console.log(3)
        // await timeout(3000);
        // setPreview(null)

        

        // //2. Создаем и показываем preview на время загрузки файла
        // await new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.onloadend = async () => {
        //         await setPreview(reader.result)
        //     }
        //     resolve()
        //     reader.readAsDataURL(currentImage);
        // })

        // 

        // //4. Сохраняем название изображения в Redux Store --> БД
        // filenameChangeHandler('12336990-vertical-oriented-image-of-famous-eiffel-tower-in-paris-france-.jpg')

        // //5. Отчищаем Preview
        // setPreview(null)