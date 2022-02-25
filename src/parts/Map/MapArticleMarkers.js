import { makeStyles } from '@material-ui/core';
import React, { useEffect, useRef } from 'react'
import { createRandomId } from '../../utils/functions/createRandomId';
import markerPoint from '../../assets/marker_point.svg';
import PrimaryMarkerBaloon from './Baloon/PrimaryMarkerBaloon';
import ReactDOM from 'react-dom';

import ReactDOMServer from 'react-dom/server';

const useStyles = makeStyles((theme) => ({
    map: {
        height: '100%'
    }
}))

const MapArticleMarkers = ({ articleMarkers }) => {
    
    const classes = useStyles();
    const actionCatherRef = useRef();

    //ф-ция создания метки
    const createPlacemark = (articleMarker) => {

        let coords = articleMarker?.coordinate && [articleMarker.coordinate.latitude, articleMarker.coordinate.longitude];
        
        let newPlacemark = new ymaps.Placemark(coords, {
            iconContent: ''
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: markerPoint,
            iconImageSize: [22, 22],
            iconImageOffset: [-11, -22],
            iconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: balck; font-weight: bold; background: white; width: 100px; margin: 10px;">$[properties.iconContent]</div>') 
        })

        newPlacemark.events
        .add('mouseenter', function (e) {
            e.get('target').options.set('iconImageSize', [44, 44]);
            e.get('target').options.set('iconImageOffset', [-22, -44]);
        })
        .add('mouseleave', function (e) {
            e.get('target').options.set('iconImageSize', [22, 22]);
            e.get('target').options.set('iconImageOffset', [-11, -22]);
        });

        return newPlacemark;
    }

    //ф-ция инициализации карты с основнмыи функциями
    const mapId = `${createRandomId()}-map`;
    const initMap = () => {

        let map = new ymaps.Map(mapId, {
            center: [55.76, 37.64],
            zoom: 4,
            controls: ['zoomControl'],
        },{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
        });

        //Добавялем метки на карту при первом запуске
        articleMarkers.forEach(item => {
            map.geoObjects.add(
                createPlacemark(item)
            )
        })
        
        // Задаем зум относительно объектов
        // 1. На основе всех имеющихся объектов задаем bounds
        map.setBounds(map.geoObjects.getBounds());
        // 2. Определяем, сколько объектов на карте
        const geoObjectsNum = map.geoObjects.getLength();
        // 3.1. Если объект 1, то задаем следующий зум:
        if(geoObjectsNum === 1){
            map.setZoom(14);
        }
        // 3.2. Если объектов несколькj, то такой:
        if(geoObjectsNum > 1){
            map.setZoom(map.getZoom()-1); 
        }

        //Задаем функцию, которая будет отслеживать наведение на маркер в тексте
        actionCatherRef.current.addEventListener('click', (e) => {
           console.log(1)
        })
    }

    //Создаем карту при 1-ом рендере
    useEffect(() => {
        ymaps.ready(initMap);
    }, [])

    //Ловим изменения маркеров, а именно highlight и инициируем дейсвтие
    useEffect(() => {
        actionCatherRef.current.click();
    }, [articleMarkers])

    return (
        <>
        <span id={`action-catcher-${mapId}`} ref={actionCatherRef}/>
        <div className={classes.map} id={mapId}/>
        </>
    )
}

export default MapArticleMarkers

// map.margin.setDefaultMargin(2);// не работает

  // newPlacemark.events.add('click', function(e){
        //     console.log(item)
        // })

        // newPlacemark.events.add('hover', function(e){
        //     console.log(item)
        // })
        // // Добавляем оброботчик события по клику
        // newPlacemark.events.add('click', function(e) {
        //     newPlacemark.options.set('preset', 'islands#redIcon');
        //     console.log(e)
        //     // currIcon = (currIcon + 1) % icons.length;
        //     // e.get('target').options.set('iconImageHref', icons[currIcon]);
        // });




        
            
            // balloonContentHeader: '<span>test<span/>',
            
    //          // Зададим содержимое заголовка балуна.
    //     balloonContentHeader: '<a href = "#">Рога и копыта</a><br>' +
    //     '<span class="description">Сеть кинотеатров</span>',
    // // Зададим содержимое основной части балуна.
    // balloonContentBody: '<img src="img/cinema.jpg" height="150" width="200"> <br/> ' +
    //     '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
    //     '<b>Ближайшие сеансы</b> <br/> Сеансов нет.',
    // // Зададим содержимое нижней части балуна.
    // balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
    // // Зададим содержимое всплывающей подсказки.
    // hintContent: 'Рога и копыта'
            
            // balloonHeader: 'Заголовок балуна',
            // balloonContent: 'Контент балуна',
            // balloonContent: ReactDOMServer.renderToStaticMarkup(
            //     <PrimaryMarkerBaloon 
            //         articleMarkers={articleMarkers}
            //     />
            // ),