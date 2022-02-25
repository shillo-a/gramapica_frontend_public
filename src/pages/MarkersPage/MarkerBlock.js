import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGlobalLocation, selectGlobalLocationPP } from '../../store/slices/globalLocationSlice';

import { Container, Grid, makeStyles } from '@material-ui/core';

import FilterForm from './FilterForm'
import MarkerCardXS from '../../components/Card/MarkerCardXS';
import MarkerHeader from './MarkerHeader';

const useStyles = makeStyles((theme) => ({
   
}))

const MarkerBlock = () => {

    const classes = useStyles();
    
    return (
        <Container maxWidth='md'>
        
            <MarkerHeader view='list'/>
            <FilterForm/>

            <Grid container spacing={2}>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                <Grid xs={12} sm={6} md={4} item><MarkerCardXS/></Grid>
                
            </Grid>
        
        </Container>
    )
}

export default MarkerBlock
