import { Button, Chip, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import LinkPrimary from '../Link/LinkPrimary';

import noImageLG from '../../../public/no_image_lg.png';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import ValuationList from '../List/ValuationList';
import LinkTransparent from '../Link/LinkTransparent';
import ButtonTertiary from '../Button/ButtonTertiary';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative'
    },
    cardTag: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 10
    },

    cardMedia: {
        height: '150px'
    },

    cardMediaImg: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },

    cardHeader: {
        padding: theme.spacing(2),
    },

    cardHeaderText: {
        ...theme.typography.h6,
        fontWeight: 900
    },

    cardHeaderInfo: {
        ...theme.typography.caption,
    },

    cardFooter: {
        padding: theme.spacing(0, 2, 2, 2),
    },

}))

const MarkerCardXS = () => {

    const classes = useStyles();

    return (
        // <Grid xs={12} sm={6} md={4} item>
        <div className={classes.cardContainer}>

            <div className={classes.cardTag}>
                <ButtonTertiary>Из книги</ButtonTertiary>
            </div>

            <div className={classes.cardMedia}>
                <img className={classes.cardMediaImg} src={noImageLG}></img>
            </div>

            <div className={classes.cardHeader}>
                <LinkPrimary className={classes.cardHeaderText} href="/markers/1">Наименование места</LinkPrimary>
                <Typography className={classes.cardHeaderInfo}>г. Москва, улица Ленина, д.7</Typography>
            </div>

            <div className={classes.cardFooter}>
                <ValuationList/>
            </div>

        </div>
        // </Grid>
    )
}

export default MarkerCardXS
