import { AppBar, Button, Container, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../utils/customHooks/useFollowLink';
import TabButton from '../components/Button/TabButton';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import logoShort from '../../assets/gramapica_logo_short.svg';
import LinkTransparent from '../components/Link/LinkTransparent';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.common.white,
        color: theme.palette.common.black,
        zIndex: 9,
    },

    toolBar: {
        padding: 0,
        margin: 0,
        minHeight: 0
    },

    navContainer: {
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    linkIcon: {
        // height: '1.2rem',
        // width: '1.2rem'
    },

    logoShort: {
        maxHeight: '3rem'
    }

}))

const NavigationToolbar = (props) => {
    
    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    const handleClick = (pathname) => {
        followLinkHandler(pathname)
    }

    return (
        <AppBar className={classes.appBar} position="sticky">
            <Toolbar className={classes.toolBar}>
            <Container className={classes.navContainer} maxWidth='xl'>

                    <IconButton>
                        <MenuRoundedIcon/>
                    </IconButton>
                    <LinkTransparent href="/">
                        <img className={classes.logoShort} src={logoShort}/>
                    </LinkTransparent>
                {/* <div className={classes.linkContainer}>
                    <TabButton 
                        state={props.currentPathname==='/' ? 'active' : 'non-active'}
                        onClick={() => { handleClick('/') }}
                    >Лента</TabButton>
                    <TabButton 
                        state={props.currentPathname==='/markers' ? 'active' : 'non-active'}
                        onClick={() => { handleClick('/markers') }}
                    >Места</TabButton>
                    <TabButton 
                        state={props.currentPathname==='/articles' ? 'active' : 'non-active'}
                        onClick={() => { handleClick('/articles') }}
                    >Статьи</TabButton>
                </div> */}
                
                <div className={classes.buttonContainer}>
                    <IconButton >
                        <SearchIcon className={classes.linkIcon} />
                    </IconButton>
                    <IconButton >
                        <NoteAddOutlinedIcon className={classes.linkIcon} />
                    </IconButton>
                    <IconButton >
                        <AccountCircleOutlinedIcon className={classes.linkIcon} />
                    </IconButton>
                    
                </div>
                
            </Container>
            </Toolbar>
        </AppBar>
        
    )
}

export default NavigationToolbar

 /* <TabsButton/> */