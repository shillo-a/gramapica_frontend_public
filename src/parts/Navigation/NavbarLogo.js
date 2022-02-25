import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, makeStyles } from '@material-ui/core'

import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import logoLong from '../../assets/gramapica_logo_long.svg';
import logoShort from '../../assets/gramapica_logo_short.svg';

import LinkTransparent from '../../components/Link/LinkTransparent';
import { changeCurrentRegion, selectRegions } from '../../store/slices/regionsSlice';
import RegionDropDown from '../DropDown/RegionDropDown';


const useStyles = makeStyles((theme) => ({
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    menu: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },

    logo: {
        maxHeight: '3rem',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },

    logoShort: {
        maxHeight: '3rem',
        
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },

    regionMenu: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }

}))

const NavbarLogo = ({ toggleSideMenu }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Данные для выпадающего меню с Регионами DropDownButton
    const regions = useSelector(selectRegions);
    const setCurrentRegion = (name) => {
        dispatch(changeCurrentRegion(name))
    }
 
    return (
        <div className={classes.logoContainer}>
        
            <IconButton 
                className={classes.menu}
                onClick={toggleSideMenu}
            >
                <MenuRoundedIcon/>
            </IconButton>

            <LinkTransparent href="/" title="Gramapica">
                <img className={classes.logo} src={logoLong}/>
                <img className={classes.logoShort} src={logoShort}/>
            </LinkTransparent>

            <RegionDropDown
                className={classes.regionMenu} 
                regions={regions}
                setCurrentRegion={setCurrentRegion}
            />

        </div>
    )
}

export default NavbarLogo
