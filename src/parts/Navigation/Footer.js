import { BottomNavigation, BottomNavigationAction, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom';
import LinkPrimary from '../../components/Link/LinkPrimary';

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        marginTop: 'auto',
    },
    footer: {
        // marginTop: theme.spacing(6),
        // minHeight: '100px',
        background: '#434343',
        color: 'white',
        padding: theme.spacing(3),
        ...theme.typography.caption
    },
    links: {
        display: 'flex',
        
        
    },
    link: {
        marginRight: theme.spacing(2)
    },
    rights: {

    },

}))

const Footer = () => {

    const classes = useStyles();

    
    //Получаем queryParams, в частности articleType
    const locationSearch = useLocation().search;
    const queryParams = new URLSearchParams(locationSearch); 
    const display = queryParams.get('display');

    //Определяем, есть ли в queryParams, display "on-map"
    const mapIndicator = display === 'on-map'

    return (
        <>
        {/* Нужно сделать регулярное выражение!!! */}
        {!mapIndicator ? 
            <div className={classes.footerContainer}>
                <footer className={classes.footer}>
                    <div className={classes.links}>
                            <LinkPrimary className={classes.link}>О проекте</LinkPrimary>
                            <LinkPrimary className={classes.link}>Все места</LinkPrimary>
                            <LinkPrimary className={classes.link}>Все статьи</LinkPrimary>
                            <LinkPrimary className={classes.link}>Оставить отзыв</LinkPrimary>
                            <LinkPrimary className={classes.link}>Пользовательское соглашение</LinkPrimary>
                    </div>
                    <div className={classes.rights}>
                        Все права защищены. При использовании материалов прямая гиперссылка на сайт gramapica.com обязательна. © 2020-2021
                    </div>
                </footer>
            </div>
            : <></>
        }
        </>
    )
}

export default Footer
