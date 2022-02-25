import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Paper, makeStyles, Grid } from '@material-ui/core';

import Banner from './Banner';
import FeedBlock from './FeedBlock/FeedBlock';
import RecommendedBlock from './RecommendedBlock/RecommendedBlock';
import RegionDropDown from '../../parts/DropDown/RegionDropDown';
import { changeCurrentRegion, selectRegions } from '../../store/slices/regionsSlice';
import RegionDropDownText from '../../parts/DropDown/RegionDropDownText';
import { useLocation } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
    },
    header__text: {
        ...theme.typography.h4,
        fontWeight: 900,
    },
    dropDownLink: {
        ...theme.typography.h4,
        padding: 0
    },
    mainArticles: {
        marginTop: theme.spacing(1),
    },
    recommendedBlock: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        
    }
}))

const HomePage = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Данные для выпадающего меню с Регионами DropDownButton
    const regions = useSelector(selectRegions);
    const setCurrentRegion = (name) => {
        dispatch(changeCurrentRegion(name))
    }

    //Определяем, какой сейчас URL
    const currentURL = useLocation().pathname;

    return (
        <Container maxWidth='md' disableGutters={true}>

            {/* Показываем банер только для главной страницы (ьез выбранных сортировок) */}
            { currentURL === '/' &&
                <Banner/>
            }
            
            <div className={classes.header}>
                <Typography className={classes.header__text}>
                    Подборки культовых мест в{' '}
                    <RegionDropDownText
                        regions={regions}
                        setCurrentRegion={setCurrentRegion}
                    />

                </Typography>     
            </div>

            <div className={classes.mainArticles}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} className={classes.feedBlock}>
                        <FeedBlock/>
                    </Grid>
                    <Grid item xs={12} md={4} className={classes.recommendedBlock}>
                        <RecommendedBlock/>
                    </Grid>
                </Grid>
            </div>

        </Container>
    )
}

export default HomePage
