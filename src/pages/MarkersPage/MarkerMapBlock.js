import React, { useState } from 'react';

import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

import MarkerBlock from './MarkerBlock';
import MarkerMap from './MarkerMap';
import MarkerHeader from './MarkerHeader';
import FilterForm from './FilterForm';
import MarkerCardXS from '../../components/Card/MarkerCardXS';

const useStyles = makeStyles((theme) => ({
    
}))

const MarkerMapBlock = () => {

    const themeProps = { heightAppBar: 96.98 };
    const classes = useStyles();

    return (

        <div className={classes.articleContainer}>

            <Grid container className={classes.articleGridContainer}>
                <Grid xs={12} md={3} item>

                    <Container>
                        <MarkerHeader view='on-map'/>
                        <FilterForm/>
                        <Grid container spacing={2}>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                            <Grid xs={12} item><MarkerCardXS/></Grid>
                        </Grid>
                    </Container>
                    
                </Grid>
                <Grid xs={12} md={9} item>
                    <MarkerMap themeProps={themeProps}/>
                </Grid>
            </Grid>
        </div>

        
            

    )
}

export default MarkerMapBlock