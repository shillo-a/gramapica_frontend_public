import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles} from '@material-ui/core';

import MarkerBlock from './MarkerBlock';
import MarkerMapBlock from './MarkerMapBlock'

const useStyles = makeStyles((theme) => ({
    
}))

const MarkersPage = () => {

    const classes = useStyles();

    return (
        <Switch>
            <Route exact path="/markers" component={MarkerBlock}/>
            <Route exact path="/markers/on-map" component={MarkerMapBlock}/>
        </Switch>
    )
}

export default MarkersPage