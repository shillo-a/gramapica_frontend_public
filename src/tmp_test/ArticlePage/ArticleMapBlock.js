import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import ArticleViewSwitch from './ArticleViewSwitch';

const useStyles = makeStyles((theme) => ({
    mapBlockContainer: {
        position: 'relative',
        height: themeProps => `calc(100vh - ${themeProps.heightAppBar}px)`
    },

    mapContainer:{
        height: '100%'
    },

    articleViewSwitch: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            position: 'absolute',
            margin: theme.spacing(2),
            top: 0,
            right: 0,
            zIndex: '9999'
        },
    }
}))

const ArticleMapBlock = (props) => {

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
        <div className={classes.mapBlockContainer} >

            <ArticleViewSwitch className={classes.articleViewSwitch}/>

            <div className={classes.mapContainer} id="map"/>
        </div>
    )
}

export default ArticleMapBlock
