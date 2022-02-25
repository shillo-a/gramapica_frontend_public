import React from 'react';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import ButtonTertiary from '../../components/Button/ButtonTertiary';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';

import useFollowLink from '../../utils/customHooks/useFollowLink';


const useStyles = makeStyles((theme) => ({
    articleViewSwitch: {
        display:'flex',
        flexDirection: 'column',
        // justifyContent: 'left'
    },
}))

const ArticleViewSwitch = ({ className: parentClassName }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    //Определяем "корневое расположение"
    const currentPathname = useLocation().pathname.split("/", 3).join("/")
    //Определяем открыта карта или список
    const currentView = useLocation().pathname.split("/", 4)[3] || 'list'
    //Определяем какие заданы queryParams, не сбрасываем их!
    const locationSearch = useLocation().search;

    return (
        <div className={clsx(parentClassName, classes.articleViewSwitch)}>
            <ButtonTertiary 
                className={classes.listButton}
                onClick={() => followLinkHandler(currentPathname + locationSearch)}
                state={ currentView==='list' ? 'active': 'non-active' }
            ><DescriptionOutlinedIcon/></ButtonTertiary>

            <ButtonTertiary 
                className={classes.mapButton} 
                onClick={() => followLinkHandler(`${currentPathname}/on-map` + locationSearch)}
                state={ currentView==='on-map' ? 'active': 'non-active' }
            ><PlaceOutlinedIcon/></ButtonTertiary>
        </div> 
    )
}

export default ArticleViewSwitch
