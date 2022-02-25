import { makeStyles, ThemeProvider, Typography } from '@material-ui/core'
import React from 'react'
import { uploadsURL } from '../../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        display: 'flex',
    },

    imageContainer: {
        height: '100px',
        width: '100px',
        marginRight: theme.spacing(2),
        flexGrow: 1
    },

    image: {
        display: 'block',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        
    },

    infoContainer: {
        flexGrow: 0
    },

    name: {
        // ...theme.typography.caption,
        // fontWeight: 900
    },

    addres: {
        // ...theme.typography.caption,
    }

}))

const PrimaryMarkerBaloon = ({ articleMarkers }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper} >
            
            {articleMarkers.markerImage.filename &&
                <div className={classes.imageContainer} >
                    <img 
                        className={classes.image} 
                        src={`${uploadsURL}/${articleMarkers.markerImage.filename}`}
                    />
                </div>
            }
            
            <div className={classes.infoContainer}>
                <Typography className={classes.name}>{articleMarkers.name}</Typography>
                <Typography className={classes.addres}>{articleMarkers.coordinate.name}</Typography>
            </div>
            
        </div>
    )
}

export default PrimaryMarkerBaloon;