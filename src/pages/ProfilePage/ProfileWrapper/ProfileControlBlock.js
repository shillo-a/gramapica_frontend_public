import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocation } from 'react-router';

import TabButton from '../../../components/Button/TabButton'
import useFollowLink from '../../../utils/customHooks/useFollowLink';
import { useIsOwner } from '../../../utils/customHooks/useIsOwner';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(0, 2),
        overflow: 'auto',
        whiteSpace: 'nowrap'
    },

    button: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0
        }
    },

}))

const ProfileControlBlock = ({ user, isUserOwner }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    //Определяем, какая сейчас открыта вкладка
    const currentTabPathname = useLocation().pathname.split('/')[3] || ''
    const currentPathnameBase = useLocation().pathname.split('/', 3).join('/')

    const [menuLinks, setMenuLinks] = useState([
        {id: 1, name: 'Статьи', link: '/', showAll: true},
        {id: 2, name: 'Комментарии', link: '/comments', showAll: true},
        {id: 3, name: 'Закладки', link: '/favorites', showAll: false},
        // {id: 4, name: 'Оценки', link: '/reviews', showAll: false},
        {id: 5, name: 'Черновики', link: '/drafts', showAll: false},
    ])

    return (
        <div className={classes.wrapper}>

            {menuLinks.map(item => {

                if(isUserOwner || item.showAll){
                    return (
                        <TabButton 
                            className={classes.button}
                            key={item.id}
                            state={'/'.concat(currentTabPathname)===item.link ? 'active' : 'non-active'}
                            onClick={() => followLinkHandler(`${currentPathnameBase}${item.link}`)}
                        >
                            {item.name}
                            {item.link === '/drafts' && user.draftArticlesNum > 0 && ` (${user.draftArticlesNum})`}
                        </TabButton>
                    )
                }
                
            })}

        </div>
    )
}

export default ProfileControlBlock


