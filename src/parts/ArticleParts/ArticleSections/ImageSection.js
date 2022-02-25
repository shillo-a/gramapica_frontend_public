import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {uploadsURL} from '../../../utils/apis/config/apiUrls'

const useStyles = makeStyles((theme) => ({
    wrapper: {},

    image: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },

    description: {
        ...theme.typography.caption,
        color: 'grey',
        textAlign: 'center'
    }

}))

const ImageSection = ({ sectionImage }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <img 
                className={classes.image} 
                src={sectionImage.filename && `${uploadsURL}/${sectionImage.filename}`}
            />
            <Typography className={classes.description}>{sectionImage.description}</Typography>
        </div>
        
    )
}

export default ImageSection
