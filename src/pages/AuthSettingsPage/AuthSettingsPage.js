import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useLocation } from 'react-router';
import TabButton from '../../components/Button/TabButton';
import LinkPrimary from '../../components/Link/LinkPrimary';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import MainSettingsTab from './MainSettingsTab';
import BlockError404 from '../../components/StubBlocks/BlockError404';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authenticationSlice';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(3, 0),
    },

    control: {
        backgroundColor: theme.palette.background.paper,
        
    },

    controlHeader: {
        padding: theme.spacing(2)
    },

    controlHeaderLink: {
        display: 'flex',
        alignItems: 'center',
        ...theme.typography.body1,
        color: '#262626'
    },

    controlHeader__title: {
        ...theme.typography.h5,
        fontWeight: '900',
        
    },

    controlButtons: {
        padding: theme.spacing(0, 2),
        marginBottom: theme.spacing(2),
        
    },

    controlButtons_button: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0
        }
    },
}))

const AuthSettingsPage = () => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    //Получаем инофрмацию по текущему пользователю
    const currentUser = useSelector(selectCurrentUser);

    //Определяем, какая сейчас открыта вкладка
    const currentTabPathname = useLocation().pathname.split('/')[3] || '';
    const currentPathnameBase = useLocation().pathname.split('/', 3).join('/');

    const [menuLinks, setMenuLinks] = useState([
        {id: 1, name: 'Профиль', link: '/main'},
        // {id: 2, name: 'Уведомления', link: '/notifications'},
        // {id: 3, name: 'Другое', link: '/others'}
    ])

    const isCurrentTabPathnameExists = menuLinks.some(item => item.link === `/${currentTabPathname}`)

    return (
        <>{isCurrentTabPathnameExists ?

            <div className={classes.wrapper}>
            <Container maxWidth='md' disableGutters={true}>

                <div className={classes.control}>
                    
                    <div className={classes.controlHeader}
                        onClick={() => followLinkHandler(`/profile/${currentUser.username}`)}
                    >
                        <LinkPrimary className={classes.controlHeaderLink}>
                            <NavigateBeforeRoundedIcon className={classes.controlHeaderLink__icon}/>
                            {currentUser.username}
                        </LinkPrimary>
                        
                        <Typography className={classes.controlHeader__title}>
                            Настройки
                        </Typography>
                    </div>
                    
                    <div className={classes.controlButtons}>
                        {menuLinks.map(item => {
                            return (
                                <TabButton 
                                    className={classes.controlButtons_button}
                                    key={item.id}
                                    state={'/'.concat(currentTabPathname)===item.link ? 'active' : 'non-active'}
                                    onClick={() => followLinkHandler(`${currentPathnameBase}${item.link}`)}
                                >
                                    {item.name}
                                </TabButton>
                            )
                        })}
                    </div>

                </div>
                
                {currentTabPathname === 'main' && 
                    <MainSettingsTab currentUser={currentUser}/>
                }
            </Container>
            </div>

        :<BlockError404/>}</>
   )
}

export default AuthSettingsPage

{/* <div className={classes.content}>
            <Grid container spacing={3}>

                <Grid item xs={12} md={8} className={classes.tabs}>
                    {children}
                </Grid>

                <Grid item xs={12} md={4} className={classes.addons}>
                    <ProfileAnalytics/>
                </Grid>

            </Grid>
            </div> */}