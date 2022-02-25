import { makeStyles } from '@material-ui/core';
import React from 'react'
import { HashLink } from 'react-router-hash-link';

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
        cursor: 'pointer',
        
    },

    icon: {
        height: '23.99px'
        // color: theme.palette.primary.main,
        // marginRight: theme.spacing(1),
    },

    sectionText: {
        wordWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontWeight: 900
    }

}))

const HelpHeaderSection = ({ articleName }) => {

    const classes = useStyles();

    return (
        <HashLink 
            className={classes.anchorLink}
            smooth to={`#top`}
        >
        <div className={classes.sectionWrapper}>
            <div className={classes.icon}/>
            <div className={classes.sectionText}>{articleName}</div>
        </div>
        </HashLink>
    )
}

export default HelpHeaderSection
