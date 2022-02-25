import { Button, Card, CardContent, CardMedia, Chip, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';


import ImageCarousel from '../Carousel/ImageCarousel';

const useStyles = makeStyles((theme) => ({

    markerCard: {
        "&:hover": {
        }
        
    },
    
    markerDivider: {
        marginBottom: theme.spacing(2)
    },

    markerCardName: {
        ...theme.typography.h6,
        fontWeight: 900,
    },

    markerCardAddress: {
        marginBottom: theme.spacing(2),
        ...theme.typography.caption,
    },

    imageCarousel: {
        marginBottom: theme.spacing(2),
    },

    markerCardContent: {
        marginBottom: theme.spacing(2),
    },

    markerCardContentText: {
        // marginBottom: theme.spacing(2),
    },
}))

const MarkerCardLG = (props) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <Grid item xs={12}>
        <div className={classes.markerCard} >

            <Divider className={classes.markerDivider}/>
            <Typography className={classes.markerCardName}>Наименование места 1</Typography>
            <Typography className={classes.markerCardAddress}>г. Москва, улица Ленина, д.7</Typography>

            <div className={classes.markerCardContent}>
                <ImageCarousel className={classes.imageCarousel}/>
                <Typography className={classes.markerCardContentText}>Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи Краткое описание статьи</Typography>
            </div>
            
        </div>
        </Grid>
    )
}

export default MarkerCardLG

