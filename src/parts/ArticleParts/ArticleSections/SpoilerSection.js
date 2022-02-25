import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'

import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import LinkPrimary from '../../../components/Link/LinkPrimary';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2),
        background: '#FFF4F8',
        display: 'flex',
        alignItems: 'center',
        // padding: theme.spacing(0.5),
        // background: 'linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0, #fb3 75%, #58a 0)',
        // backgroundSize: '42.426406871px 42.426406871px',
        // boxShadow: 'inset 0 0 0 200px rgba(255, 255, 255, 0.3)',
        // filter: 'blur(3px)',
        // overflow: 'hidden'
    },

    spoilerIcon: {
        color: theme.palette.primary.main,
        ...theme.typography.h4,
        marginRight: theme.spacing(2)
        
    },

    spoiler: {
        ...theme.typography.body1,
        marginBottom: theme.spacing(1)
    },

    spoiler__hideButton: {
        fontWeight: 900
    },

    spoiler__showButton: {
        fontWeight: 900
    }
}))

const SpoilerSection = ({ spoilerText }) => {

    const classes = useStyles();

    const [showSpoiler, setShowSpoiler] = useState(false);
    const handleToggleShowSpoiler = () => {
        setShowSpoiler(prevState => !prevState)
    }

    return (
        <div className={classes.wrapper}> 
            <ReportProblemRoundedIcon className={classes.spoilerIcon} fontSize='inherit'/>
            
            <div>
                { showSpoiler && <>
                    <Typography className={classes.spoiler}>{spoilerText}</Typography>
                    <LinkPrimary 
                        className={classes.spoiler__hideButton}
                        onClick={handleToggleShowSpoiler}
                    >Скрыть спойлер</LinkPrimary>
                </> }

                { !showSpoiler &&
                    <LinkPrimary 
                        className={classes.spoiler__showButton}
                        onClick={handleToggleShowSpoiler}
                    >Показать спойлер</LinkPrimary>
                }
            </div>
            
        </div>
    )
}

export default SpoilerSection


{/* <div>
                    Спойлер: <Typography className={classes.spoiler}>{section.body}</Typography>
                </div>:<></> */}

                // background: 'red'
        // width: '100%',
        // boxShadow: 'inset 0 0 0 200px rgba(255, 255, 255, 0.3)',
        // filter: 'blur(10px)',
        // overflow: 'hidden'