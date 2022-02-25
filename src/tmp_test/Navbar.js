import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeGlobalLocation, selectGlobalLocation } from '../../store/slices/globalLocationSlice';

import { AppBar, makeStyles, Toolbar, Container, Divider, Button, LinearProgress , Avatar} from '@material-ui/core'

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';

import logoLong from '../../assets/gramapica_logo_long.svg';
import logoShort from '../../assets/gramapica_logo_short.svg';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import AuthModal from '../Modal/AuthModal/AuthModal';
import DropDownButton from '../Button/DropDownButton';
import SearchInput from '../Form/Input/SearchInput';
import NavigationToolbar from './NavigationToolbar';

import { openModal } from '../../store/slices/globalModalSlice';
import { postPureDraftArticle } from '../../store/slices/currentArticleSlice';
import { selectCurrentUser } from '../../store/slices/authenticationSlice';
import NavigationPromo from './NavigationPromo';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.common.white,
        color: theme.palette.common.black,
        zIndex: 9,
    },
    toolbar: {
        padding: 0,
        margin: 0,
        minHeight: 0
    },

    navContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoButton: {
        minWidth: '36px',
    },

    logo: {
        maxHeight: '3rem',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },

    logoShort: {
        maxHeight: '3rem',
        
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    
    links:{
        display: 'flex',
        
    },
    
    search: {
        alignSelf: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        
    },

    linkSearchButton: {
        minWidth: '36px',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    
    linkButton: {
        minWidth: '36px',
    },

    linkIcon: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(0)
        }
    },
    

    linkText: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },

    searchToggle: {
        width: '100%',
        padding: theme.spacing(1,0),
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
}))

const Navbar = () => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    //Определяем, какая сейчас открыта вкладка
    const currentPathname = useLocation().pathname
    
    //Определяем, какой пользователь сейчас залогинен или залогинен ли
    const currentUser = useSelector(selectCurrentUser);

    //Управление модальным окном "Вход/ Регистрация" черег глобальный модальный объект
    const handleSignInUp = () => { 
        dispatch(openModal('auth'))
    }

    //Управление выпадающим поиском
    const [openSearch, setOpenSearch] = useState(false);
    const handleSearch = () => { 
        openSearch ? setOpenSearch(false) : setOpenSearch(true);
     };

    

    //Создание новой статьи
    //Добавить проверку авторизован ли пользователь!!!
    //Если пользователь не авторизован, то показать всплывающее окно
    const articleId = useSelector(state => state.currentArticle.data.articleId)
    const handleCreateArticle = async () => {
        dispatch(postPureDraftArticle())
    }
    useEffect(()=>{
        if(articleId){
            followLinkHandler(`/write-article/${articleId}`)
        }
    }, [articleId])

    return (
        <>
        <NavigationPromo/>
        <NavigationToolbar/>

        <AppBar position="sticky" className={classes.appBar}>
        
        {/* BASE TOOLBAR */}
        <Toolbar className={classes.toolbar}>
        <Container className={classes.navContainer} maxWidth='xl'>

            <div className={classes.links}>
                {/* <Button className={classes.logoButton} onClick={() => followLinkHandler('/')}>
                    <img className={classes.logo} src={logoLong}/>
                    <img className={classes.logoShort} src={logoShort}/>
                </Button> */}
                {/* <DropDownButton menu={globalLocation} setMenu={setGlobalLocation}/> */}
            </div>

            <div className={classes.links}>
            
                <SearchInput className={classes.search} />
                <Button className={classes.linkSearchButton} onClick={handleSearch}>
                    <SearchIcon className={classes.linkIcon}/>
                </Button>

                <Button onClick={handleCreateArticle} className={classes.linkButton}>
                    <NoteAddOutlinedIcon className={classes.linkIcon}/>
                    <div className={classes.linkText}>Новая статья</div>
                </Button>
                
                {currentUser.id ?
                    <Button>
                        <Avatar></Avatar>
                    </Button>
                    :
                    <Button onClick={handleSignInUp} className={classes.linkButton}>
                        <AccountCircleOutlinedIcon className={classes.linkIcon}/>
                        <div className={classes.linkText}>Войти или зарегистрироваться</div>
                    </Button>
                }
                
            </div>

        </Container>
        </Toolbar>
        
        {/* SEARCH TOOLBAR */}
        <Toolbar className={classes.toolbar}>
            {openSearch ? 
                <Container maxWidth='xl'>
                    <SearchInput className={classes.searchToggle} autoFocus={true}/>
                </Container>
            : <></>}
        </Toolbar>

        <Divider />

        {/* NAVIGATION TOOLBAR */}
        <NavigationToolbar  className={classes.toolbar} currentPathname={currentPathname}/>
        
        </AppBar>
        </>
    )
}

export default Navbar;