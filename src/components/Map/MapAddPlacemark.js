import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { createRandomId } from '../../utils/functions/createRandomId';

import markImage from '../../assets/marker_image.svg';

const useStyles = makeStyles((theme) => ({
    mapBlockContainer:{
        height: '100%',
        width: '100%'
    }
}))

const MapAddPlacemark = ({ currentCoordinate, handleSelectSearch }) => {

    const classes = useStyles();
    const actionCatherRef = useRef();

    //одна отметка, которая будет отражаться на карте
    let currentPlacemark;

    //ф-ция создания метки
    const createPlacemark = (coords) => {
        return new ymaps.Placemark(coords, {}, {
            iconLayout: 'default#image',
            iconImageHref: markImage,
            iconImageSize: [35, 42.25],
            iconImageOffset: [-17.5, -42.25],
            draggable: true
        })
    }

    //ф-ция обратного геокодирования
    const reversGeocoderHandler = (coords) => {
        //геокодируем: координаты --> название 
        
        ymaps.geocode(coords, {results: 1})
        .then(res => {
            let firstGeoObject = res.geoObjects.get(0);
            // let coords = firstGeoObject.geometry.getCoordinates();
            let coordinateName = firstGeoObject.getAddressLine();
            handleSelectSearch(coordinateName, coords[0], coords[1])
            
        })
    }

    //ф-ция инициализации карты с основнмыи функциями
    //На этой карте всегда отражаем тольку одну метку
    const mapId = `${createRandomId()}-map`;
    const initMap = () => {

        let map = new ymaps.Map(mapId, {
            center: [55.70132382616057,37.807673012791376],
            zoom: 1,
            controls: ['zoomControl']
        },{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
        });

        map.behaviors.disable('scrollZoom');

        //Поиск места через клик по карте
        //Слушаем клик на карте (добавляем одну отметку)
        
        map.events.add('click', (e) => {

            let coords = e.get('coords')

            if(currentPlacemark){
                currentPlacemark.geometry.setCoordinates(coords);
                reversGeocoderHandler(coords);
            } else {
                currentPlacemark = createPlacemark(coords);
                map.geoObjects.add(currentPlacemark);
                reversGeocoderHandler(coords);
                currentPlacemark.events.add('dragend', () => {
                    coords = currentPlacemark.geometry.getCoordinates()
                    reversGeocoderHandler(coords)
                })
            }
            
        })

        //Поиск места через поисковую строку
        actionCatherRef.current.addEventListener('click', (e) => {
            
            let coords = [
                e.target.attributes.currentCoordinateLatitude.value, 
                e.target.attributes.currentCoordinateLongitude.value, 
            ]

            if(currentPlacemark){
                currentPlacemark.geometry.setCoordinates(coords);
            } else {
                currentPlacemark = createPlacemark(coords);
                map.geoObjects.add(currentPlacemark);

                reversGeocoderHandler(coords)

                currentPlacemark.events.add('dragend', () => {
                    coords = currentPlacemark.geometry.getCoordinates()
                    reversGeocoderHandler(coords)
                })
            }

            //через геокодер можно получить гео-объект!!!
            map.setCenter(coords, 15, { checkZoomRange: true });

        })
    }

    //Создаем карту при 1-ом рендере
    useEffect(() => {
        ymaps.ready(initMap);
    }, [])

    // Когда изменяется currentCoordinate (проверяем по latitude), отражаем его на карте
    // Для поиска места через поисковую строку
    // Имитирую клик по action-catcher
    useEffect(() => {
        if(currentCoordinate.latitude){
            ymaps.ready(()=>{
                actionCatherRef.current.setAttribute('currentCoordinateLatitude', currentCoordinate.latitude)
                actionCatherRef.current.setAttribute('currentCoordinateLongitude', currentCoordinate.longitude)
                actionCatherRef.current.click()
            })
        }
    }, [currentCoordinate.latitude])

    return (
        <>
            <span id={`action-catcher-${mapId}`} ref={actionCatherRef}/>
            <div id={mapId} className={classes.mapBlockContainer} />
        </>
    )
}

export default MapAddPlacemark

// .then(bounds => map.setBounds(bounds, {checkZoomRange: true}));
// //ф-ция определения адреса по координатам (обратное геокодирование)
// const getAddressByCoords = (coords) => {
//     console.log(coords)
// }

 // let bounds = map.geoObjects.getBounds()
            // map.setBounds(bounds, {checkZoomRange: true, zoomMargin: -100});

            // let bounds = currentPlacemark.properties.get('boundedBy');
            // map.setBounds(bounds, {checkZoomRange: true});
            
            // ymaps.geocode(currentCoordinateName, {results: 1})
            //     .then(res => {
            //         let firstGeoObject = res.geoObjects.get(0);
            //         let coords = firstGeoObject.geometry.getCoordinates();
            //         let bounds = firstGeoObject.properties.get('boundedBy');
                    
                    

            //         map.setBounds(bounds, {checkZoomRange: true});

            //         //Сохраняем данные в state
            //         // handleMapResult(coords[0], coords[1]);
            //     })