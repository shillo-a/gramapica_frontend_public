import React, { useEffect, useRef, useState } from 'react'

import {  makeStyles } from '@material-ui/core';
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';
import ImageInput from '../../components/Form/Input/ImageInput';
import { uploadsURL } from '../../utils/apis/config/apiUrls';


const useStyles = makeStyles((theme) => ({
    quoteContainer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2)
    },

    quoteHeader:{
        display: 'flex',
        flexDirection: 'row'
    },

    quoteAvatarContainer: {
        width: `70px`,
        height: `70px`,
        minHeight: `70px`,
        minWidth: '70px',
        marginRight: theme.spacing(2)
        
    },
    
    quotePersonContainer: {
        flexGrow: 1,
        // padding: theme.spacing(2, 2, 0, 0)
    },

    quoteContainerBody: {
        paddingTop: theme.spacing(2)
    },

    quoteBody: {
        
    },
}))

const QuoteSection = ({ currentSection, handleQuoteChange }) => {

    const classes = useStyles();
    const [preview, setPreview] = useState(null);

    // useEffect(()=>{
    //     //сохраняем изображение в БД ???
    //     //формируем наименование изображения ???
    //     preview && handleQuoteChange( {avatarFilename: 'unic avatar name'} )  
    // }, [preview])

    const handleDeleteAvatar = () => {
        handleQuoteChange( {avatarFilename: ''} );
    }

    return (
        <div className={classes.quoteContainer}>
            
            <div className={classes.quoteHeader}>

                <div className={classes.quoteAvatarContainer}>
                    <ImageInput 
                        type='quote'
                        deletable={true}

                        fileLocation={uploadsURL}
                        filename={currentSection?.avatarFilename || ''}
                        filenameChangeHandler={(filename) => {handleQuoteChange( {avatarFilename: filename} )}}
                        handleDelete={handleDeleteAvatar}
                    />
                </div>

                <div className={classes.quotePersonContainer}>
                    <TextInputPrimary 
                        placeholder="Автор"
                        value={currentSection?.personName || ''}
                        onChange={(e)=>{handleQuoteChange( {personName: e.target.value} )}}
                        // noBorder={true}
                        autoFocus
                    />
                    <TextInputPrimary 
                        placeholder="Профессия"
                        value={currentSection?.profession || ''}
                        onChange={(e)=>{handleQuoteChange( {profession: e.target.value} )}}
                        // noBorder={true}
                        autoFocus
                    />
                </div>

            </div>

            <div className={classes.quoteContainerBody}>
                <TextInputPrimary 
                    className={classes.quoteBody}
                    placeholder="Текст цитаты"
                    value={currentSection?.body || ''}
                    onChange={(e)=>{handleQuoteChange( {body: e.target.value} )}}
                    // noBorder={true}
                    autoFocus
                />
            </div>
            
        </div>
    )
}

export default QuoteSection

//avatarFilename
