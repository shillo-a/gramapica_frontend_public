import { Divider, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { uploadsURL } from '../../../utils/apis/config/apiUrls';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import { useDispatch } from 'react-redux';

import { changeHighlightSection } from '../../../store/slices/localArticleSectionsSlice';
import useFollowLink from '../../../utils/customHooks/useFollowLink';
import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useDidUpdateEffect } from '../../../utils/customHooks/useDidUpdateEffect';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        cursor: themeProps => `${themeProps.highlightableMarkers && 'pointer' || 'cursor'}`,
        // background: '#FFF4F8',
        // padding: theme.spacing(2),  
        '&:hover $header':{
            color: theme.palette.primary.main,
            // background: '#FFF4F8',
            // border: '2px solid #FFF4F8',
            // boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
        }
    },

    header: {
        display: 'flex',
        alignItems: 'center'
    },

    header__icon: {
        color: theme.palette.primary.main,
        ...theme.typography.h4,
        marginRight: theme.spacing(2)
    },

    // divider: {
    //     background: '#FFF4F8',
    //     height: '2px',
    //     margin: theme.spacing(2, 0),
    // },

    name: {
        ...theme.typography.h6,
        fontWeight: 900,
        // paddingBottom: theme.spacing(0.5)
    },

    image: {
        padding: theme.spacing(1, 0)
    },

    image__photo: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },

    image__description: {
        ...theme.typography.caption,
        color: 'grey',
        textAlign: 'center'
    },

    description: {
        ...theme.typography.body1
    },

    place: {
        // paddingBottom: theme.spacing(1)
    },

    place__address: {
        display: 'inline',
        ...theme.typography.subtitle2,
        fontWeight: 900,
        
    },

    place__coordinateName: {
        display: 'inline',
        ...theme.typography.subtitle2,
    },

    // dividerTop: {
    //     marginBottom: theme.spacing(2),
    //     width: '50%',
    //     textAlign: 'center'
    // },

    // dividerBottom: {
    //     marginTop: theme.spacing(2)
    // }
}))

const MarkerSection = ({
    sectionId,
    sectionMarker,
    highlightableMarkers = false // позволять отображать маркеры наведением мыши, !ИСПОЛЬЗОВАТЬ
}) => {

    const themeProps = { highlightableMarkers };
    const classes = useStyles(themeProps);
    const dispatch = useDispatch();
    const followLinkHandler = useFollowLink();

    // Действие при наведении мыши на секцию с местом
    const handleMarkerHighlight = (moveType) => {
        highlightableMarkers && dispatch(changeHighlightSection({ sectionId, moveType }))
    }

    // Действие при клики по месту
    const handleMarkerClick = async () => {
        followLinkHandler(`?display=on-map#${markerSectionId}`, false)
    }
    
    // #${markerSectionId}
    // // Выполняем переход к секции
    const markerSectionId = `ms${sectionId}`;
    const markerSectionRef = useRef(null);
    const location = useLocation()
    const locationHash = location.hash

    const executeScroll = () => markerSectionRef.current.scrollIntoView() 
    useEffect(() => {
        if(`#${markerSectionId}` === locationHash){
            executeScroll()
        }
    }, [locationHash])
   
    return (
        <div className={classes.wrapper} 
            id={markerSectionId}
            ref={markerSectionRef}
            onClick={() => {handleMarkerClick()}}

            onMouseEnter={() => handleMarkerHighlight('enter')}
            onMouseLeave={() => handleMarkerHighlight('leave')}   
        >
            
            <div className={classes.header} >
                <RoomRoundedIcon className={classes.header__icon} fontSize='inherit'/>

                <div>
                    <Typography className={classes.name}>{sectionMarker.name}</Typography>

                    {sectionMarker.coordinate.name &&
                    <div className={classes.place}>
                            <Typography className={classes.place__address}>Адрес: </Typography>
                            <Typography className={classes.place__coordinateName}>{sectionMarker.coordinate.name}</Typography>
                    </div>
                    }
                </div>
            </div>
            
            {sectionMarker.markerImage.filename && 
                <div className={classes.image}>
                        <img className={classes.image__photo} src={`${uploadsURL}/${sectionMarker.markerImage.filename}`}/>
                        <Typography className={classes.image__description}>{sectionMarker.markerImage.description}</Typography>
                </div>
            }
            
            <Typography className={classes.description}>{sectionMarker.description}</Typography>
            
        </div>
    )
}

export default MarkerSection
