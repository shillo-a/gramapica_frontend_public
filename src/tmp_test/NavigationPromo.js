import React from 'react';

import { AppBar, Container, Divider, IconButton, makeStyles, Toolbar } from '@material-ui/core';

import logoLong from '../../assets/gramapica_logo_long.svg';
import logoShort from '../../assets/gramapica_logo_short.svg';

import LinkTransparent from '../components/Link/LinkTransparent';
import { useDispatch, useSelector } from 'react-redux';
import { changeGlobalLocation, selectGlobalLocation } from '../store/slices/globalLocationSlice';
import DropDownButton from '../components/Button/DropDownButton';
import LinkPrimary from '../components/Link/LinkPrimary';
import LinkRegular from '../components/Link/LinkRegular';

import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.common.white,
        color: theme.palette.common.black,
        zIndex: 20,
        borderBottom: 'solid 0.1rem lightgrey'
    },

    toolBar: {
        padding: 0,
        margin: 0,
        minHeight: 0
    },

    navContainer: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        },
    },

    

    promoContainer: {
    }
}))

const NavigationPromo = (props) => {

    const { className: parentClassName } = props

    const classes = useStyles();
    const dispatch = useDispatch();

    //Данные для выпадающего меню DropDownButton
    const globalLocation = useSelector(selectGlobalLocation);
    const setGlobalLocation = (id) => {
        dispatch(changeGlobalLocation(id))
    }

    return (
        <AppBar className={clsx(classes.appBar,parentClassName)} position="static" elevation={0}> 
            <Toolbar className={classes.toolBar}>
            <Container className={classes.navContainer} maxWidth='xl'>

                <div className={classes.logoContainer} title="Gramapica">
                    
                    <LinkTransparent href="/">
                        <img className={classes.logo} src={logoLong}/>
                    </LinkTransparent>

                    <DropDownButton menu={globalLocation} setMenu={setGlobalLocation}/>
                </div>

                {/* Рандомная рекламная статья, должны меняться случайным образом*/}
                <div className={classes.promoContainer}>
                    <LinkPrimary href="/">
                        Cамые страшные места из книг 🎃
                    </LinkPrimary>
                </div>
                
                
            </Container>
            
            </Toolbar>
        </AppBar>
    )
}

export default NavigationPromo
