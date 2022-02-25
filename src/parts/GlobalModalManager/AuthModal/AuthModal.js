import { Divider, Grid, IconButton, makeStyles, Modal, Typography, Button, Breadcrumbs, Link } from '@material-ui/core'
import React, { useState } from 'react'

import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import AuthMap from '../../../../public/auth_map.png';

import LinkButton from '../../../components/Button/LinkButton';
import LinkRegular from '../../../components/Link/LinkRegular';
import RegisterBlock from './RegisterBlock';
import { useDispatch } from 'react-redux';
import { clearPostLogin, clearPostSignup } from '../../../store/slices/authenticationSlice';
import EnterBlock from './EnterBlock';
import ForgotBlock from './ForgotBlock';
import ChangePasswordBlock from './ChangePasswordBlock';

const useStyles = makeStyles((theme) => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    authContainer: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '590px',
        width: '620px',
        margin: theme.spacing(2),
        //to disable borders added by browser
        outline: 0,
    },

    authBanner: {
        backgroundImage: `url(${AuthMap})`,
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },

    authBannerLogo: {
        maxHeight: '2rem'
    },
    authBannerTitle: {
        ...theme.typography.h6,
        color: theme.palette.primary.main,
        
    },
    authBannerDescription: {
    },

    authMenu: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },

    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    backToAuth: {
        ...theme.typography.body1,
        float: 'left',
        display: 'flex',
    },

    cross: {
        float: 'right'
    },

    chooseBlock: {
        marginTop: '40px',
        alignSelf: 'center'
    },

    chooseText: {
        ...theme.typography.body1,
        color: theme.palette.primary.main,
        cursor: 'default',
    },

    chooseLink: {
        ...theme.typography.body1,
    },

    windowBlock: {
        marginTop: theme.spacing(2)
    },

    infoBlock: {
        marginTop: 'auto'
    },

    infoText: {
        ...theme.typography.caption,
        marginTop: theme.spacing(1),
    }
}))

const AuthModal = ({ isOpened, handleClose, handleConfirm, handleDecline }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Значения для отображения текущего View в модальном окне
    const [view, setView] = useState({
        currentId: 1,
        items: [
            {id: 1, name: 'Вход'},
            {id: 2, name: 'Регистрация'},
            {id: 3, name: 'Восстановить пароль'},
            {id: 4, name: 'Сменить пароль'}
        ]
    });

    const handleModalClose = () => {
        handleClose();
        setView(prevState => ({...prevState, currentId: 1}) )
        //Отчищаем все запросы, связанные с Авторизацией
        dispatch(clearPostSignup());
        dispatch(clearPostLogin());
    }

    const handleModalWindow = (currentId) => {
        setView(prevState => ({...prevState, currentId}) )
    }

    return (
        <Modal 
            open={isOpened} 
            onClose={handleModalClose} 
            className={classes.modal}
        >
            
            <div className={classes.authContainer}>
            <Grid container>
                <Grid xs={12} sm={5} item className={classes.authBanner}>
                    {/* <img className={classes.authBannerLogo} src={logoLong2}/>
                    <Typography className={classes.authBannerTitle}></Typography>
                    <Typography className={classes.authBannerDescription}></Typography> */}
                </Grid>

                <Grid xs={12} sm={7} item className={classes.authMenu}>

                    <div className={classes.navigation}>
                        {view.currentId === 3 || view.currentId === 4 ?
                            <LinkButton 
                                className={classes.backToAuth} 
                                onClick={() => handleModalWindow(1)}
                            >
                                <NavigateBeforeRoundedIcon/> К авторизации
                            </LinkButton>:<div></div>}

                        <IconButton className={classes.cross} onClick={handleModalClose}>
                            <ClearRoundedIcon />
                        </IconButton>
                    </div>
                    
                    <div className={classes.chooseBlock}>

                        { view.currentId === 1 || view.currentId === 2 ?
                            <Breadcrumbs>
                                {view.items
                                    .filter(item => item.id === 1 || item.id === 2)
                                    .map(item => {
                                        return item.id === view.currentId ?
                                        <Typography key={item.id} className={classes.chooseText}>{item.name}</Typography>
                                        :<LinkButton key={item.id} className={classes.chooseLink} onClick={() => handleModalWindow(item.id)}>{item.name}</LinkButton>
                                    })
                                }
                            </Breadcrumbs>
                            : <></>
                        }

                        { view.currentId === 3 || view.currentId === 4 ?
                            <Typography className={classes.chooseText}>
                                {view.items.find(item => item.id === view.currentId).name}
                            </Typography>
                            : <></>
                        }

                    </div>

                    <div className={classes.windowBlock}>
                        { view.currentId === 1 ? <EnterBlock handleModalWindow={handleModalWindow} handleModalClose={handleModalClose}/> : <></> }
                        { view.currentId === 2 ? <RegisterBlock handleModalClose={handleModalClose}/> : <></> }
                        { view.currentId === 3 ? <ForgotBlock handleModalClose={handleModalClose}/> : <></> }
                        { view.currentId === 4 ? <ChangePasswordBlock handleModalClose={handleModalClose}/> : <></> }
                    </div>
                    
                    <div className={classes.infoBlock}>
                        <Divider/>
                        <Typography className={classes.infoText}>
                            Авторизуясь, вы соглашаетесь с {' '}
                            <LinkRegular>правилами пользования сайтом</LinkRegular> и даёте {' '}
                            <LinkRegular>согласие на обработку персональных данных</LinkRegular>.
                        </Typography>
                    </div>
                    
                </Grid>

            </Grid>
            </div>
           
            
      
        </Modal>
    
    )
}


export default AuthModal
