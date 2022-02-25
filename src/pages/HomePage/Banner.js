import { makeStyles, Grid, Typography, Container} from '@material-ui/core';
import React from 'react';

import AuthMapLong from '../../../public/auth_map_long.png';
import MapRoundedIcon from '@material-ui/icons/MapRounded';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import useFollowLink from '../../utils/customHooks/useFollowLink';

const useStyles = makeStyles((theme) => ({
    bannerContainer: {
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
    },

    bannerText: {
        height: '200px',
        padding: theme.spacing(0,2),

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    headerText: {
        ...theme.typography.h6,
        fontWeight: 900
    },

    bodyText: {
        marginTop: theme.spacing(1)
    },

    bannerImage: {
        height: '200px',
        backgroundImage: `url(${AuthMapLong})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'stretch',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}))

const Banner = () => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <div className={classes.bannerContainer}>
            <Grid container>
                <Grid xs={12} sm={6} className={classes.bannerText} item>
                    <Typography className={classes.headerText}>Ваша карта культовых мест</Typography>
                    <Typography className={classes.bodyText}>Узнайте о реальных местах из любимых книг, картин, песен и видеоклипов, а также о тайных и необычных местах родного города</Typography>   
                </Grid>
                <Grid xs={12} sm={6} className={classes.bannerImage} item>
                    <ButtonPrimary onClick={() => followLinkHandler('/markers/on-map')}>Открыть карту</ButtonPrimary>
                </Grid>
            </Grid>
        </div>

    )
}

export default Banner
