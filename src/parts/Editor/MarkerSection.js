import React, { useEffect, useState } from 'react'

import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';
import ImageInput from '../../components/Form/Input/ImageInput';
import { makeStyles } from '@material-ui/core';

import MapAddPlacemark from '../../components/Map/MapAddPlacemark'
import MarkerSearchSection from './MarkerSearchSection';
import { uploadsURL } from '../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({
    markerContainer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2)
    },
    textContainer: {
    },
    imageContainer: {
        position: 'relative',
        paddingTop: theme.spacing(2),
        
    },
    image: {
        display: 'block',
        height: '100%',
        width: '100%'
    },
    imageDescription: {
        marginTop: theme.spacing(1),
        ...theme.typography.body2,
    },
    
    mapContainer: {
        
        marginTop: theme.spacing(2),
    },
    mapAddressNameInput: {
        ...theme.typography.body2,
    },

    markerNameInput: {
        ...theme.typography.subtitle1,
        fontWeight: 900,
    },

    searchResultsContainer: {
        position: 'relative',
    },
    map: {
        marginTop: theme.spacing(1),
        height: '250px'
    },

}))

const MarkerSection = ({ currentSection, handleMarkerChange }) => {

    const classes = useStyles();

    const handleDeleteMarkerImage = () => {
        handleMarkerChange( {markerImageFilename: ''} );
        handleMarkerChange( {markerImageDescription: ''} ); 
    }

    //Управляем сохранением координат в результате поиска
    function handleSetCoordinate(coordinateName, coordinateLatitude, coordinateLongitude){
        handleMarkerChange({coordinateName, coordinateLatitude, coordinateLongitude})
    }

    //Управляем сохранением границ в результате поиска

    return (
        <div className={classes.markerContainer}>
            
            <TextInputPrimary 
                className={classes.markerNameInput}
                placeholder="Наименование места"
                // noBorder={true}
                value={currentSection.sectionMarker?.name || ''}
                onChange={(e) => handleMarkerChange({name: e.target.value})}
                
                autoFocus
            />

            <TextInputPrimary 
                placeholder="Краткое описание"
                // noBorder={true}
                value={currentSection.sectionMarker?.description || ''}
                onChange={(e) => handleMarkerChange({description: e.target.value})}
                
                // autoFocus
            />
            
            <div className={classes.mapContainer}>
                
                <MarkerSearchSection
                    valueForSearch={currentSection.sectionMarker?.coordinate.name || ''}
                    handleSelectSearch={handleSetCoordinate}
                />
                
                <div className={classes.map}>
                    <MapAddPlacemark
                        currentCoordinate={currentSection.sectionMarker?.coordinate}
                        handleSelectSearch={handleSetCoordinate}
                    />
                </div>

            </div>

            <div className={classes.imageContainer}>
                <ImageInput 
                    type='regular'
                    deletable={true}

                    fileLocation={uploadsURL}
                    filename={currentSection.sectionMarker.markerImage?.filename}
                    filenameChangeHandler={(filename) => {handleMarkerChange( {markerImageFilename: filename} )}}
                    handleDelete={handleDeleteMarkerImage}
                />

                {currentSection.sectionMarker.markerImage?.filename && 
                    <TextInputPrimary 
                        className={classes.imageDescription}
                        placeholder="Описание"
                        // noBorder={true}
                        value={currentSection.sectionMarker.markerImage?.description || ''}
                        onChange={(e)=>{handleMarkerChange( {markerImageDescription: e.target.value} )}}
                        autoFocus
                    />
                }
            </div>

        </div>
    )
}

export default MarkerSection


