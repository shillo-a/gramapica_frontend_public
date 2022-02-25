import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';

import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';

const useStyles = makeStyles((theme) => ({
    anchorLink: {
        all: 'unset'
    },

    sectionWrapper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        ...theme.typography.caption,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },

    icon: {
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1),
    },

    sectionText: {
        wordWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }

}))

const HelpSectionWrapper = ({ section }) => {

    const classes = useStyles();

    const [icons, setIcons] = useState(
        [
            {type: 'subheader', icon: <TextFieldsRoundedIcon className={classes.icon}/>, signature: 'заголовок'},
            {type: 'text', icon: <SubjectRoundedIcon className={classes.icon}/>, signature: 'текст'},
            {type: 'marker', icon: <RoomRoundedIcon className={classes.icon}/>, signature: 'место'},
            {type: 'image', icon: <PhotoCameraRoundedIcon className={classes.icon}/>, signature: 'фото'},
            {type: 'quote', icon: <FormatQuoteRoundedIcon className={classes.icon}/>, signature: 'цитата'},
            {type: 'spoiler', icon: <WarningRoundedIcon className={classes.icon}/>, signature: 'спойлер'},
        ]
    )

    // react-router-hash-link

    return (
        <HashLink 
            className={classes.anchorLink}
            smooth to={`#${section.id}editor`}
        >
        <div className={classes.sectionWrapper}>
        
            {section && section.typeName === 'subheader' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section.header}</div>
                </>:<></>
            }

            {section && section.typeName === 'text' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section?.body || ''}</div>
                    
                </>:<></>
            }

            {section && section.typeName === 'spoiler' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section.body}</div>
                </>:<></>
            }

            {section && section.typeName === 'image' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section.sectionImage.description}</div>
                </>:<></>
            }

            {section && section.typeName === 'quote' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section.sectionQuote?.body || ''}</div>
                </>:<></>
            }

            {section && section.typeName === 'marker' ?
                <>
                    {icons.find(item => item.type === section.typeName).icon}
                    <div className={classes.sectionText}>{section.sectionMarker.name}</div>
                </>:<></>
            }
      
        </div>
        
        </HashLink>
    )
}

export default HelpSectionWrapper

