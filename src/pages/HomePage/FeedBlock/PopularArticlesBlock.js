import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PaginationPrimary from '../../../components/Pagination/PaginationPrimary';
import ArticleCard from '../../../parts/Card/ArticleCard';
import { clearPublishedArticles, getPopularPublishedArticles, selectPublishedArticles } from '../../../store/slices/publishedArticlesSlice';
import { clearPublishedArticlesTotalPages, selectPublishedArticlesTotalPages, getPopularPublishedArticlesTotalPages} from '../../../store/slices/publishedArticlesTotalPagesSlice';

const useStyles = makeStyles((theme) => ({

    pagination: {
        justifyContent:"center",
        display:'flex',
        width: '100%',
        backgroundColor: 'white',
        padding: theme.spacing(1, 0),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(6),
    }

}))

const PopularArticlesBlock = ({
    parrentClassName: className,
    currentPageNum,
    currentRegion,
    currentTimePeriod
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Каждый раз, когда меняется что-то из current, запрашиваем данные с сервера
    const publishedArticles = useSelector(selectPublishedArticles);
    useEffect(()=>{

        dispatch(getPopularPublishedArticles({
            pageNum: currentPageNum, 
            regionName: currentRegion.name,
            timePeriod: currentTimePeriod
        }))

        return () => {
            dispatch(clearPublishedArticles())
        }

    }, [currentRegion, currentPageNum, currentTimePeriod])

    //Определяем кол-во страницы, на которых хранятся статьи
    const publishedArticlesTotalPages = useSelector(selectPublishedArticlesTotalPages);
    useEffect(()=>{

        dispatch(getPopularPublishedArticlesTotalPages({
            regionName: currentRegion.name
        }))

        return () => {
            dispatch(clearPublishedArticlesTotalPages())
        }

    }, [currentRegion])

    return (
        <div>

            { publishedArticles.length > 0 ? 
                <Grid container spacing={3}>
                    {publishedArticles.map(item => (
                        <ArticleCard 
                            key={item.id} 
                            article={item}
                        />
                    ))}
                </Grid>
                :
                <></>
                // <ProfileTabStab type={'drafts'}/>
            }

            <div className={classes.pagination}>
                <PaginationPrimary numberOfPages={publishedArticlesTotalPages}/>
            </div>

        </div>
    );

};

export default PopularArticlesBlock;
