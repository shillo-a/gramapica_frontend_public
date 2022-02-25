import { makeStyles } from '@material-ui/core'
import React from 'react'

import SortSwitch from './SortSwitch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentRegion } from '../../../store/slices/regionsSlice';
import { useQueryParams } from '../../../utils/customHooks/useQueryParams';
import NewestArticlesBlock from './NewestArticlesBlock';
import PopularArticlesBlock from './PopularArticlesBlock';

const useStyles = makeStyles((theme) => ({

    sortSwitch: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
        // marginBottom: theme.spacing(1),
        // margin: theme.spacing(0,2,1,2),
        // border: 0
    },

    articlesBlock: {

    },

    
}))

const FeedBlock = () => {

    const classes = useStyles();

    //Определяем, какой тип, подтип и страницу сортировки
    const currentSortType = useLocation().pathname.split('/')[1] || '';
    const currentSortSubtype = useLocation().pathname.split('/')[2] || '';
    
    //Получаем queryParams, в частности номер страницы
    const queryParams = useQueryParams(); 
    const currentPageNum = Number(queryParams.get('page')) || 1;
    
    //Также определям, какой сейчас регион задан (можно передавать данные в хедаре)
    const currentRegion = useSelector(selectCurrentRegion);

    return (
        <div>
            
            <SortSwitch 
                className={classes.sortSwitch}
                currentSortType={currentSortType}
                currentSortSubtype={currentSortSubtype}
            />

            {currentSortType === 'new' &&
                <NewestArticlesBlock
                    className={classes.articlesBlock} 
                    currentPageNum={currentPageNum}
                    currentRegion={currentRegion}
                />
            }

            {(currentSortType === 'top' || currentSortType === '') &&
                <PopularArticlesBlock
                    className={classes.articlesBlock} 
                    currentPageNum={currentPageNum}
                    currentRegion={currentRegion}
                    currentTimePeriod={currentSortSubtype || 'now'}
                />
            }

        </div>
    )
}

export default FeedBlock
