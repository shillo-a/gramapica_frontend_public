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

const useStyles = makeStyles((theme) => ({
 
    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    }

}))

const SelectTopArticlesDropDown = ({ currentSortSubtype }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    const sotrSubtypeList = [
        {id: '0', name: '', description: 'Популярное', pathName: ''},
        {id: '1', name: 'day', description: 'За день', pathName: '/day'},
        {id: '2', name: 'week', description: 'За неделю', pathName: '/week'},
        {id: '3', name: 'month', description: 'За месяц', pathName: '/month'},
        {id: '4', name: 'year', description: 'За год', pathName: '/year'},
        {id: '5', name: 'all', description: 'За все время', pathName: '/all'},
    ]

    return (

        <DropDownWrapper
            placement={'bottom-start'}

            childrenButton = {
                <ButtonTertiary>
                    {sotrSubtypeList.find(item => item.name === currentSortSubtype).description}
                    <ArrowDropDownRoundedIcon/>
                </ButtonTertiary> 
            }

            childrenPopper = {
                sotrSubtypeList.map(item => (
                    currentSortSubtype !== item.name &&
                    <Button 
                        className={classes.menuButton} 
                        key={item.id}
                        onClick={()=>{followLinkHandler('/top' + item.pathName)}}
                    >{item.description}</Button>
                ))
            }
        />
        
    )

}

export default SelectTopArticlesDropDown
