import { Button, Divider, makeStyles } from '@material-ui/core';
import React from 'react';

import useFollowLink from '../../utils/customHooks/useFollowLink';
import { useDispatch } from 'react-redux';

import { launchModal } from '../../store/slices/globalModalSlice';
import { deleteDraftArticle } from '../../store/slices/draftArticlesSlice';
import DropDownWrapper from './DropDownParts/DropDownWrapper2';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import ButtonTertiary from '../../components/Button/ButtonTertiary';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import LinkButton from '../../components/Button/LinkButton';

const useStyles = makeStyles((theme) => ({

    mainButton: {
        ...theme.typography.h4,
        fontWeight: 900,
        cursor: 'pointer',
        "&:hover": {
            color: theme.palette.primary.main,
        },
        textAlign: "center",
        // zIndex: 10
    },
    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    }

}))

const RegionDropDownText = ({ regions, setCurrentRegion }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    const currentRegionDescription = regions.find(item => item.isCurrent === true).descriptionPP

    return (

        <DropDownWrapper
            placement={'bottom'}

            childrenButton = {
                <span
                    className={classes.mainButton}
                >
                    {currentRegionDescription}
                    <ArrowDropDownRoundedIcon/>
                </span> 
            }

            childrenPopper = {
                regions.map(item => (
                    !item.isCurrent &&
                    <Button 
                        className={classes.menuButton} 
                        key={item.id}
                        onClick={()=>{setCurrentRegion(item.name)}}
                    >{item.descriptionPP}</Button>
                ))
            }
        />
        
    )

}

export default RegionDropDownText
