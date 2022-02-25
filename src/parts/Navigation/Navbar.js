import React, { useState } from 'react'

import { AppBar, makeStyles, Toolbar, Container } from '@material-ui/core'

import NavbarLogo from './NavbarLogo';
import NavbarMenu from './NavbarMenu';
import NavbarControl from './NavbarControl';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.common.white,
        color: theme.palette.common.black,
        zIndex: 77777
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
        position: 'relative'
    },

}))

const Navbar = () => {
    
    const classes = useStyles();

    //Настройки для Side Menu
    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const toggleSideMenu = () => {
        setSideMenuOpen(prevState => !prevState)
    }

    return (
        <>

        <AppBar className={classes.appBar} position="sticky" elevation={3}> 
            <Toolbar className={classes.toolBar}>
            <Container className={classes.navContainer} maxWidth='xl'>

                <NavbarLogo
                    toggleSideMenu={toggleSideMenu}
                />

                <NavbarMenu
                    sideMenuOpen={sideMenuOpen}
                    toggleSideMenu={toggleSideMenu}
                />

                <NavbarControl/>

            </Container>
            </Toolbar>
        </AppBar>

        </>
    )
}

export default Navbar;


// <AppBar position="sticky" className={classes.appBar}>
        
//         {/* BASE TOOLBAR */}
//         <Toolbar className={classes.toolbar}>
//         <Container className={classes.navContainer} maxWidth='xl'>

//             <div className={classes.links}>
//                 {/* <Button className={classes.logoButton} onClick={() => followLinkHandler('/')}>
//                     <img className={classes.logo} src={logoLong}/>
//                     <img className={classes.logoShort} src={logoShort}/>
//                 </Button> */}
//                 {/* <DropDownButton menu={globalLocation} setMenu={setGlobalLocation}/> */}
//             </div>

//             <div className={classes.links}>
            
//                 <SearchInput className={classes.search} />
//                 <Button className={classes.linkSearchButton} onClick={handleSearch}>
//                     <SearchIcon className={classes.linkIcon}/>
//                 </Button>

//                 <Button onClick={handleCreateArticle} className={classes.linkButton}>
//                     <NoteAddOutlinedIcon className={classes.linkIcon}/>
//                     <div className={classes.linkText}>Новая статья</div>
//                 </Button>
                
//                 {currentUser.id ?
//                     <Button>
//                         <Avatar></Avatar>
//                     </Button>
//                     :
//                     <Button onClick={handleSignInUp} className={classes.linkButton}>
//                         <AccountCircleOutlinedIcon className={classes.linkIcon}/>
//                         <div className={classes.linkText}>Войти или зарегистрироваться</div>
//                     </Button>
//                 }
                
//             </div>

//         </Container>
//         </Toolbar>
        
//         {/* SEARCH TOOLBAR */}
//         <Toolbar className={classes.toolbar}>
//             {openSearch ? 
//                 <Container maxWidth='xl'>
//                     <SearchInput className={classes.searchToggle} autoFocus={true}/>
//                 </Container>
//             : <></>}
//         </Toolbar>

//         <Divider />

//         {/* NAVIGATION TOOLBAR */}
//         <NavigationToolbar  className={classes.toolbar} currentPathname={currentPathname}/>
        
//         </AppBar>
// appBar: {
//     background: theme.palette.common.white,
//     color: theme.palette.common.black,
//     zIndex: 9,
// },
// toolbar: {
//     padding: 0,
//     margin: 0,
//     minHeight: 0
// },

// navContainer: {
//     display: 'flex',
//     justifyContent: 'space-between'
// },
// logoButton: {
//     minWidth: '36px',
// },

// logo: {
//     maxHeight: '3rem',
//     [theme.breakpoints.down('xs')]: {
//         display: 'none'
//     },
// },

// logoShort: {
//     maxHeight: '3rem',
    
//     [theme.breakpoints.up('sm')]: {
//         display: 'none'
//     },
// },

// links:{
//     display: 'flex',
    
// },

// search: {
//     alignSelf: 'center',
//     [theme.breakpoints.down('sm')]: {
//         display: 'none'
//     },
    
// },

// linkSearchButton: {
//     minWidth: '36px',
//     [theme.breakpoints.up('md')]: {
//         display: 'none'
//     },
// },

// linkButton: {
//     minWidth: '36px',
// },

// linkIcon: {
//     marginRight: theme.spacing(1),
//     [theme.breakpoints.down('sm')]: {
//         marginRight: theme.spacing(0)
//     }
// },


// linkText: {
//     [theme.breakpoints.down('sm')]: {
//         display: 'none'
//     }
// },

// searchToggle: {
//     width: '100%',
//     padding: theme.spacing(1,0),
//     [theme.breakpoints.up('md')]: {
//         display: 'none'
//     },
// },