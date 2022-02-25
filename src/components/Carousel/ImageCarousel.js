import { IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import clsx from 'clsx';

import noImageLG from '../../../public/no_image_lg.png';
import { transitionEnd } from 'dom-helpers';

const useStyles = makeStyles((theme) => ({

    media: {
        textAlign: 'center'
    },
    carouselContainer: {
        position: 'relative'
    },

    mediaButtons: {
        position: 'absolute',
        width: '100%',
        top: '50%',
        transform: 'translate(0%, -50%)',
        display: 'flex',
        justifyContent: 'space-between'

    },

    mediaButton: {
        margin: theme.spacing(1),
        
    },

    imagesNumber: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        ...theme.typography.caption,
        background: `rgb(255, 255, 255, 0.7)`,
        margin: theme.spacing(2),
        padding: theme.spacing(0.5),
    },

    mediaImage: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',

    },

    mediaCaption: {
        ...theme.typography.caption,
        textAlign: 'center',
        marginTop: theme.spacing(0.6),
    },

}))

const ImageCarousel = (props) => {

    const classes = useStyles();

    //TMP, заменить, когда будет выгрузка данных
    const imgNum = 5;

    return (
        <div className={clsx(classes.media, props.className)}>

            <div className={classes.carouselContainer}>
                <img className={classes.mediaImage} src={noImageLG}/>

                {imgNum > 1 ?
                    <>
                    <div className={classes.mediaButtons}>
                        <IconButton className={classes.mediaButton} ><ArrowBackIosRoundedIcon/></IconButton>
                        <IconButton className={classes.mediaButton}><ArrowForwardIosRoundedIcon/></IconButton>
                    </div>
                    <div className={classes.imagesNumber}>{`${imgNum} фото`}</div>
                    </>:<></>
                }
                
            </div>
            <Typography className={classes.mediaCaption}>Рисунок 1. Сейчас отсутствует фотография к статье</Typography>

        </div>
    )
}

export default ImageCarousel
