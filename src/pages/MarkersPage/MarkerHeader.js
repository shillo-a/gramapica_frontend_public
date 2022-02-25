import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGlobalLocation, selectGlobalLocationPP } from '../../store/slices/globalLocationSlice';

import { Grid, makeStyles, Typography } from '@material-ui/core';

import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';

import DropDownLink from '../../components/Link/DropDownLink';

import ButtonTertiary from '../../components/Button/ButtonTertiary';

import useFollowLink from '../../utils/customHooks/useFollowLink'

const useStyles = makeStyles((theme) => ({
    header: {
        margin: theme.spacing(2, 0, 1, 0),
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    headerText: {
        ...theme.typography.h4
    },
    headerButtons: {
        display: 'flex',
        justifyContent: 'flex-end',

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(1),
            justifyContent: 'flex-start',
        },
    },
    filterButton: {
        // display: 'flex',
        // justifyContent: 'space-between',
    },
    mapButton: {
        minWidth:0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    listButton: {
        minWidth:0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    dropDownLink: {
        ...theme.typography.h4
    },
    chooseButton: {
        // marginTop: theme.spacing(1)
    }
}))

const MarkerHeader = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const followLinkHandler = useFollowLink();

    //Данные для выпадающего меню DropDownButton
    const globalLocationPP = useSelector(selectGlobalLocationPP);
    const setGlobalLocation = (id) => {
        dispatch(changeGlobalLocation(id))
    }
    
    return (
        <div className={classes.header}>

            <Typography className={classes.headerText}>
                Культовые места в {' '}
                <DropDownLink className={classes.dropDownLink} menu={globalLocationPP} setMenu={setGlobalLocation} />
            </Typography>     

            <div>
                <Grid className={classes.headerButtons} container spacing={1}>
                    <Grid item>
                        <ButtonTertiary className={classes.filterButton}>Фильтры (1)</ButtonTertiary>
                    </Grid>
                    <Grid item>

                        <ButtonTertiary 
                            className={classes.listButton}
                            onClick={() => followLinkHandler('/markers')}
                            state={ props.view === 'list' ? 'active' : 'non-active'}
                        ><SubjectRoundedIcon/></ButtonTertiary>

                        <ButtonTertiary 
                            className={classes.mapButton} 
                            onClick={() => followLinkHandler('/markers/on-map')}
                            state={ props.view === 'on-map' ? 'active' : 'non-active'}
                        ><PlaceOutlinedIcon/></ButtonTertiary>

                        
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MarkerHeader
