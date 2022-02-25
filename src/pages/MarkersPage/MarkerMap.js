import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'



const useStyles = makeStyles((theme) => ({
    mapBlockContainer:{
        height: themeProps => `calc(100vh - ${themeProps.heightAppBar}px)`
    }
}))

const MarkerMap = (props) => {

    useEffect(() => {

        // Создание карты в соответствии с Yandex Map API
        ymaps.ready(init);
        function init(){
            // Создание карты.
            var myMap = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [55.76, 37.64],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 7
            });
        }
    }, [])

    const classes = useStyles(props.themeProps);

    return (
        <div id="map" className={classes.mapBlockContainer}>
        </div>
    )
}

export default MarkerMap
