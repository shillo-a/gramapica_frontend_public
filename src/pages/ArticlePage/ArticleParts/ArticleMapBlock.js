import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import MapArticleMarkers from '../../../parts/Map/MapArticleMarkers'
import { selectLocalArticleSection, selectLocalArticleSections } from '../../../store/slices/localArticleSectionsSlice'
import ArticleViewSwitch from './ArticleViewSwitch'

const useStyles = makeStyles((theme) => ({

    wrapper: {
        height: `calc(100vh - ${theme.navbarHeight}px)`,
        position: 'relative' 
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

const ArticleMapBlock = ({ article }) => {

    const classes = useStyles();

    // 1. Выделяем из сексций статьи - секции маркеры
    const articleMarkersSections = article && article.sections.filter(item => item.typeName === 'marker')

    // 2. Загружаем информацию о секциях - отображать их или нет
    const localArticleSections = useSelector(selectLocalArticleSections)
    
    // 3. Финализируем данные
    const articleMarkers = articleMarkersSections && articleMarkersSections.map(item => {

        const localSection = localArticleSections.find(localItem => localItem.sectionId === item.id);
        const highlight = localSection?.highlight || false;
        
        return {...item.sectionMarker, highlight}
    })

    return (
        <div className={classes.wrapper}>

            <ArticleViewSwitch className={classes.articleViewSwitch}/>
            
            {articleMarkersSections.length > 0 &&
                <MapArticleMarkers 
                    articleMarkers={articleMarkers}
                />
            }
            
        </div>
    )
}

export default ArticleMapBlock

{/* <ArticleViewSwitch className={classes.articleViewSwitch}/> */}
// const test = useSelector(state => selectLocalArticleSection(state, 231))