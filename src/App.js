import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { Container, createTheme , CssBaseline, LinearProgress, makeStyles, ThemeProvider } from '@material-ui/core';

import HomePage from './pages/HomePage/HomePage';
import Navbar from './parts/Navigation/Navbar';
import MarkersPage from './pages/MarkersPage/MarkersPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import Footer from './parts/Navigation/Footer';
import GlobalLoaderManager from './components/Progress/GlobalLoaderManager';
import GlobalModalManager from './parts/GlobalModalManager/GlobalModalManager';
import GlobalAlertManager from './parts/GlobalAlertManager/GlobalAlertManager';
import WriteArticlePage from './pages/WriteArticlePage/WriteArticlePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { usePreloadData } from './utils/customHooks/usePreloadData';
import { createRandomId } from './utils/functions/createRandomId';
import AuthSettingsPage from './pages/AuthSettingsPage/AuthSettingsPage';
import TestingPage from './pages/TestingPage/TestingPage';
import { Dns } from '@material-ui/icons';

//Тема Material UI для настоящего приложения
const appTheme = createTheme ({
    typography: {
        fontFamily: `'Raleway', sans-serif`,
        // fontWeightLight: 500,
        // fontWeightRegular: 500,
        // fontWeightMedium: 500,

        button: {
            // fontWeight: 600,
            textTransform: 'none'
        },
    },
    palette: {
        background: {
            default: '#F2F4F6'
        },
        primary: {
            main: '#FF2B6C'
        },
        text: {
            primary: '#262626'
        }
        
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
    },

    //custom theme properties
    navbarHeight: 61,

    transitions: { create: () => 'none' },

    props: {

        MuiButtonBase: {
          disableRipple: true
        }

      }
})

const useStyles = makeStyles((theme) => ({
    app: {
        // Необходимо для отображения footer-а
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden' //Material UI имеет проблему, из-за которой Grid некорректно работает - negative margin, это дополнение устраняет проблему
    }
}))

const App = () => {
    const classes = useStyles();

    //Загружаем начальные данные для приложения - без начальной загрузки приложение будет работать некорректно
    const dataIsLoaded = usePreloadData();
    
    return (
        <ThemeProvider theme={appTheme}>
        <CssBaseline/>
        
        { dataIsLoaded &&
            <div className={classes.app}>
                <Navbar/>
                
                <Switch>
                    <Route exact path={[
                        "/", 
                        '/top', "/top/:sortSubtype(day|week|month|year|all)",
                        "/new"
                    ]} component={HomePage}/>

                    <Route path="/auth/settings" component={AuthSettingsPage}/> {/*Управление настройками текущего пользователя*/}          
                    <Route path="/profile/:key" component={ProfilePage}/> {/*Имеет внутренний Swtich*/}      

                    <Route exact path="/articles/:articleId" component={ArticlePage}/> {/*Просмотр статьи - текстом/ на карте*/}   

                    <Route exact path="/write-article/:articleId" component={WriteArticlePage}/> 

                    <Route path="/markers" component={MarkersPage}/>
                    <Route exact path="/articles" component={ArticlesPage}/>

                    <Route exact path="/testing" component={TestingPage}/>
                    
                    {/* <Route path='*' component={NotFound} /> */}
                    <Redirect to='/'/>
                </Switch>

                {/* Глобальный компонент отражения процесса загрузки */}
                <GlobalLoaderManager/>
                
                {/* Глобальный компонент управления модальными окнами */}
                <GlobalModalManager/>

                {/* Глобальный компонент управления алёртами */}
                <GlobalAlertManager/>

                <Footer/>
            </div>
        }

        </ThemeProvider>
    )
}

export default App;


// //Управление модальным окном "Подтверждение действия"
//     //Вызов ДИАЛОГОВОГО ОКНА удаления комментария
//     const [open, setOpen] = useState(false);
//     const handleClose = () => { setOpen(false) }


            {/* CONFIRM MODAL WINDOW */}
            