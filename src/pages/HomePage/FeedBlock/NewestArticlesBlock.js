import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PaginationPrimary from '../../../components/Pagination/PaginationPrimary';
import ArticleCard from '../../../parts/Card/ArticleCard';
import { clearPublishedArticles, getNewestPublishedArticles, selectPublishedArticles } from '../../../store/slices/publishedArticlesSlice';
import { clearPublishedArticlesTotalPages, getNewestPublishedArticlesTotalPages, selectPublishedArticlesTotalPages } from '../../../store/slices/publishedArticlesTotalPagesSlice';

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

const NewestArticlesBlock = ({
    parrentClassName: className,
    currentPageNum,
    currentRegion,
}) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Каждый раз, когда меняется что-то из current, запрашиваем данные с сервера
    const publishedArticles = useSelector(selectPublishedArticles);
    useEffect(()=>{

        dispatch(getNewestPublishedArticles({
            pageNum: currentPageNum, 
            regionName: currentRegion.name
        }))

        return () => {
            dispatch(clearPublishedArticles())
        }

    }, [currentRegion, currentPageNum])

    //Определяем кол-во страницы, на которых хранятся статьи
    const publishedArticlesTotalPages = useSelector(selectPublishedArticlesTotalPages);
    useEffect(()=>{

        dispatch(getNewestPublishedArticlesTotalPages({
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

export default NewestArticlesBlock;






