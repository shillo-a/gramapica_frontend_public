import { Button, Container, Divider, Drawer, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { changeGlobalLocation, selectGlobalLocation } from '../../store/slices/globalLocationSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import DropDownButton from '../../components/Button/DropDownButton';
import TabButton from '../../components/Button/TabButton';
import NavbarLogo from './NavbarLogo';

const useStyles = makeStyles((theme) => ({

    menuContainer: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',

        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    
    sideMenuDrawer: {
    },

    sideMenuContainer: {
        width: 250,
        display: 'flex',
        flexDirection: 'column'
    },

    sideMenuLogoContainer: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    sideMenuButtonLocation: {
        justifyContent: "flex-start",
        width: '100%'
    },

    sideMenuButton: {
        justifyContent: "flex-start",
        width: '100%'
    },
}))

// margin: 10px auto;

const NavbarMenu = ({ sideMenuOpen, toggleSideMenu }) => {
    
    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    //Перечень всех вкладок
    const [menuLinks, setMenuLinks] = useState([
        {id: 1, name: 'Лента', link: '/'},
        {id: 2, name: 'Места', link: '/markers'},
        {id: 3, name: 'Статьи', link: '/articles'},
    ])

    //Определяем, какая сейчас открыта вкладка
    const currentPathname = useLocation().pathname
    
    const handleSwitchTab = (pathname) => {
        followLinkHandler(pathname)
    }

    const handleSwitchTabSide = (pathname) => {
        followLinkHandler(pathname)
        toggleSideMenu()
    }

    //Данные для выпадающего меню Регионов
    const globalLocation = useSelector(selectGlobalLocation);
    const setGlobalLocation = (id) => {
        dispatch(changeGlobalLocation(id))
    }

    return (
        <>
        {/* COMMON MENU */}
        <div className={classes.menuContainer}>
            {menuLinks.map(item => (
                <Button 
                    key={item.id}
                    color={currentPathname===item.link ? 'primary' : 'default'}
                    onClick={() => { handleSwitchTab(item.link) }}
                >{item.name}</Button>
            ))}
        </div>
        
        {/* SIDE MENU */}
        <Drawer 
            className={classes.sideMenuDrawer}
            anchor="left" 
            open={sideMenuOpen}
            onClose={toggleSideMenu}
        >
            <div className={classes.sideMenuContainer}>
            <Container className={classes.sideMenuLogoContainer}>
                <NavbarLogo toggleSideMenu={toggleSideMenu}/>
                
                <Divider/>

                <DropDownButton 
                    className={classes.sideMenuButtonLocation} 
                    menu={globalLocation} 
                    setMenu={setGlobalLocation}
                />

                <Divider/>

                {menuLinks.map(item => (
                    <div key={item.id}>
                        <Button 
                            className={classes.sideMenuButton}
                            onClick={() => { handleSwitchTabSide(item.link) }}
                            color={currentPathname===item.link ? 'primary' : 'default'}
                        >{item.name}</Button>
                    </div>
                ))}
            </Container>
            </div>
        
        </Drawer>
            
        </>
    )
}

export default NavbarMenu


{/* <TabButton 
                state={currentPathname==='/markers' ? 'active' : 'non-active'}
                onClick={() => { handleSwitchTabSide('/markers') }}
            >Места</TabButton> */}