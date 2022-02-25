import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import useDebounce from '../../utils/customHooks/useDebounce';
import TextInputPrimary from '../../components/Form/Input/TextInputPrimary';

const useStyles = makeStyles((theme) => ({
}))

const MarkerSearchSection = ({ valueForSearch, handleSelectSearch }) => {

    const classes = useStyles();
    //Добавляем стейт для сохранения результатов текстового поиска мест 
    const [searchResults, setSearchResults] = useState([]);

    //Текущие наименование в поле инпут (не сохраняем в redux)
    const [currentCoordinateName, setCurrentCoordinateName] = useState(null);

    const debouncedCurrentCoordinateName = useDebounce(currentCoordinateName, 200);
    useEffect(() => {
        if(debouncedCurrentCoordinateName){
            //Осуществляем поиск, когда инфорамция загрузится
            ymaps.ready(() => {
                ymaps.suggest(currentCoordinateName || '')
                .then(items => {
                    setSearchResults(items)
                });
            })
        }
    }, [debouncedCurrentCoordinateName])

    const handleSelect = (selectedItem) => {
        setSearchResults([]);
        //геокодируем: название --> координаты
        if(selectedItem){
            ymaps.geocode(selectedItem, {results: 1})
            .then(res => {
                let firstGeoObject = res.geoObjects.get(0);
                let coords = firstGeoObject.geometry.getCoordinates();
                let coordinateName = firstGeoObject.getAddressLine();
                handleSelectSearch(coordinateName, coords[0], coords[1]);
            })
        }
        
    }

    return (
        <Autocomplete
            
            value={valueForSearch || ''}
            onChange={(e, newValue) => {
                handleSelect(newValue)
            }}

            inputValue={currentCoordinateName || ''}
            onInputChange={(e, newInputValue) => {
                setCurrentCoordinateName(newInputValue)
            }}

            options={searchResults ? searchResults.map((item) => (item.displayName)) : []}
            filterOptions={x => x}

            renderInput={(params) => 
                <TextInputPrimary 
                    className={classes.searchInput} 
                    containerRef={params.InputProps.ref} 
                    inputProps = {params.inputProps}
                    placeholder='Адрес места'
                />
            }

            autoHighlight={true}
            freeSolo={true}
        />
    )
}


export default MarkerSearchSection
