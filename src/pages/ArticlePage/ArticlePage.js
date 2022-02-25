import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ArticleAuthorDetailed from '../../parts/ArticleParts/ArticleAuthorDetailed';
import { clearArticleOptions, getArticleOptions, selectArticleOptions, selectGetArticleOptionsStatus } from '../../store/slices/articleOptionsSlice';
import { clearArticle, getPublishedArticle, getUserArticle, selectArticle } from '../../store/slices/articleSlice';
import { succeeded } from '../../utils/apis/config/statuses';
import { useDidUpdateEffect } from '../../utils/customHooks/useDidUpdateEffect';
import { useIsOwner } from '../../utils/customHooks/useIsOwner';
import ArticleMap from './ArticleMap';
import ArticleNoMap from './ArticleNoMap';
import ArticleBlock from './ArticleParts/ArticleBlock';
import ArticleMapBlock from './ArticleParts/ArticleMapBlock';
import CommentBlock from '../../parts/Comment/CommentBlock';
import { useQueryParams } from '../../utils/customHooks/useQueryParams';

const useStyles = makeStyles(()=>({
}))

const ArticlePage = ({ match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const articleId = match.params.articleId;

    //Получаем queryParams, в частности articleType
    const queryParams = useQueryParams(); 
    const display = queryParams.get('display');

    // 1. Сначала получаем опции статьи (REDUX)
    const articleOptions = useSelector(selectArticleOptions);
    const getArticleOptionsStatus = useSelector(selectGetArticleOptionsStatus);
    useEffect(() => {
        dispatch(getArticleOptions(articleId));
        return () => dispatch(clearArticleOptions())
    }, [articleId])
  
    // 2. Определяем, принадлежит, ли статья текущему авторизованному пользователю
    const isOwner = useIsOwner(articleOptions.author?.id);

    // 3. После этого загружаем данные о статье (REDUX)
    const article = useSelector(selectArticle);
    useEffect(() => {

        if(getArticleOptionsStatus === succeeded.status){
            if(isOwner){
                //owner может смотреть свою статью в любом статусе
                dispatch(getUserArticle(articleId))
            } else {
                //любой пользователь может посмотреть опубликованную статью
                dispatch(getPublishedArticle(articleId))
            }
        }

        return () => dispatch(clearArticle())
    }, [getArticleOptionsStatus])

    //Создаём базовые компоненты, чтобы передать их в качестве props
    const articleBlock = <ArticleBlock article={article} isOwner={isOwner}/>
    const articleAuthorDetailed = <ArticleAuthorDetailed article={article}/>
    const articleMapBlock = <ArticleMapBlock article={article}/>
    const articleCommentBlock = article.id ? <CommentBlock articleId={article.id}/> : <></>
 
    //Управление
    return (
        <>{display !== 'on-map' ?
            // Отображение статьи без карты
            <ArticleNoMap
                articleBlock={articleBlock}
                articleAuthorDetailed={articleAuthorDetailed}
                articleCommentBlock={articleCommentBlock}
            />
        :
            // Отображение статьи с картой
            <ArticleMap
                articleBlock={articleBlock}
                articleAuthorDetailed={articleAuthorDetailed}
                articleCommentBlock={articleCommentBlock}

                articleMapBlock={articleMapBlock}
            />
        }</>
        
    )
}

export default ArticlePage



// {/* <div className={classes.article}>
//             <Container maxWidth='md' disableGutters={true} className={classes.article__block}>
//             <Container maxWidth='sm' disableGutters={true}>
//                 <ArticleBlock articleId={articleId}/>  
//             </Container>
//             </Container>

//             {/* <Container maxWidth='md' disableGutters={true} className={classes.commentBlockContainer}>
//             <Container maxWidth='sm' disableGutters={true}>
//                 <CommentBlock/>
//             </Container>
//             </Container> */}
//         </div> */}




    // const [articleBlockScrollPosition, setArticleBlockScrollPosition] = useState(window.pageYOffset);

    // console.log(window.pageYOffset)
    // useDidUpdateEffect(()=>{
    //     window.scrollTo(0, 800);
    // },[])

    // window.scrollTo(0, 800);
    