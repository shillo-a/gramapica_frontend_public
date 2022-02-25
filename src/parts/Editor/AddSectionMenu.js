import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import IconButtonPrimary from '../../components/Button/IconButtonPrimary';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import TextFieldsRoundedIcon from '@material-ui/icons/TextFieldsRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import { addSection, postDraftArticleSection } from '../../store/slices/currentArticleSlice';
import { useDispatch } from 'react-redux';
import { createRandomId } from '../../utils/functions/createRandomId';

const useStyles = makeStyles((theme) => ({
    addSectionContainer: {
        textAlign: 'center'
    },
    addSectionContainerGrid:{
        display: 'inline-block'
        
    },
    addSectionContainerHeader: {
        ...theme.typography.caption,
        marginBottom: theme.spacing(1)
    }


}))

const AddSectionMenu = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAddSection = async (typeName) => {
        dispatch(postDraftArticleSection({typeName, tmpSectionId: createRandomId()}))
    }
    
    //кнопки с вариантами добавления секций
    //Загрузить возможные варианты секций из Backend
    const [buttons, setButtons] = useState(
        [
            {type: 'subheader', icon: <TextFieldsRoundedIcon/>, signature: 'заголовок'},
            {type: 'text', icon: <SubjectRoundedIcon/>, signature: 'текст'},
            {type: 'marker', icon: <RoomRoundedIcon/>, signature: 'место'},
            {type: 'image', icon: <PhotoCameraRoundedIcon/>, signature: 'фото'},
            {type: 'quote', icon: <FormatQuoteRoundedIcon/>, signature: 'цитата'},
            {type: 'spoiler', icon: <WarningRoundedIcon/>, signature: 'спойлер'},
            
        ]
    )

    return (
        <div className={classes.addSectionContainer}>
            <div className={classes.addSectionContainerGrid}>
            
            <Typography className={classes.addSectionContainerHeader}>добавить:</Typography>

            <Grid container spacing={1}>
                {buttons.length > 0 && 
                    buttons.map(item => (
                        <Grid item key={item.type}>
                            <IconButtonPrimary 
                                signature={item.signature} 
                                onClick={() => handleAddSection(item.type)}>
                                {item.icon}
                            </IconButtonPrimary>
                        </Grid>
                    ))
                }
            </Grid>

            </div>
        </div>
    )
}

export default AddSectionMenu


