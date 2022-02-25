import { Button, Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ShareArticleDropDown from '../DropDown/ShareArticleDropDown';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import { useIsOwner } from '../../utils/customHooks/useIsOwner';
import { selectCurrentUser } from '../../store/slices/authenticationSlice';
import produce from 'immer';
import { useDidUpdateEffect } from '../../utils/customHooks/useDidUpdateEffect'
import { putArticleReview } from '../../store/slices/articleReviewsSlice';
import { failed, idle, loading, succeeded } from '../../utils/apis/config/statuses';
import CircularProgressPrimary from '../../components/Progress/CircularProgressPrimary';
import { launchAlert } from '../../store/slices/globalAlertSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    linkButton: {
        ...theme.typography.caption,
        padding: 0,
        minWidth: 0,
        // for disabled button
        color: `inherit !important`,
        "&:hover": {
            color: `${theme.palette.primary.main} !important`,
            background: 'transparent'
        }
    },

    linkButton__icon: {
        color: '#262626'
    },

    linkButton__iconOn: {
        color: theme.palette.primary.main
    },

    linkButton__text: {
        textAlign: 'left',
        marginLeft: theme.spacing(0.5),
        minWidth: '15px'
    },
}))


const ArticleValuation = ({ article }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Получаем информацию о текущем пользователе
    const currentUser = useSelector(selectCurrentUser);
    const followLinkHandler = useFollowLink();

    //Загружаем информацию при появлении reviews
    useEffect(() => {
        if(article.reviews.length > 0){
            setArticleReviews(article.reviews)
        }
    }, [article.reviews])

    //Управление текущим состоянием 
    const [articleReviews, setArticleReviews] = useState(article.reviews);
    const articleLikesSum = articleReviews.filter(item => item.isLike === true).length || 0;
    const articleFavoritesSum = articleReviews.filter(item => item.isFavorite === true).length || 0;
    
    const emptyUserReview = { userId: currentUser.id, isLike: false, isFavorite: false };
    const userArticleReview = articleReviews.find(item => item.userId === currentUser.id) || emptyUserReview;

    //Управление загрузкой лайков (часть Review)
    const [putArticleLike, setPutArticleLike] = useState(idle);
    const toggleUserArticleLike = async () => {

        setPutArticleLike(loading);

        const { payload, meta } = await dispatch(putArticleReview({
            articleId: article.id, 
            articleReview: {...userArticleReview, isLike: !userArticleReview.isLike}
        }));

        if(meta.requestStatus === 'fulfilled'){
            setArticleReviews(produce(draftArticleReviews => {
                const index = draftArticleReviews.findIndex(item => item.userId === currentUser.id);
                if(index >= 0){
                    draftArticleReviews[index].isLike = !draftArticleReviews[index].isLike;
                } else {
                    draftArticleReviews.push({...emptyUserReview, isLike: true})
                }
            }))
            setPutArticleLike(succeeded);
            return;
        } 

        if(meta.requestStatus === 'rejected'){
            setPutArticleLike(failed);
            dispatch(launchAlert({body: 'Лайку не подлежит', type: 'error'}))
            return;
        }

    }

    const [putArticleFavorite, setPutArticleFavorite] = useState(idle);
    const toggleUserArticleFavorite = async () => {

        setPutArticleFavorite(loading);

        const { payload, meta } = await dispatch(putArticleReview({
            articleId: article.id, 
            articleReview: {...userArticleReview, isFavorite: !userArticleReview.isFavorite}
        }));

        if(meta.requestStatus === 'fulfilled'){
            setArticleReviews(produce(draftArticleReviews => {
                const index = draftArticleReviews.findIndex(item => item.userId === currentUser.id);
                if(index >= 0){
                    draftArticleReviews[index].isFavorite = !draftArticleReviews[index].isFavorite;
                } else {
                    draftArticleReviews.push({...emptyUserReview, isFavorite: true})
                }
            }))
            setPutArticleFavorite(succeeded);
            return;
        } 

        if(meta.requestStatus === 'rejected'){
            setPutArticleFavorite(failed);
            dispatch(launchAlert({body: 'Нельзя добавить в закладки', type: 'error'}))
            return;
        }

    }

    return (
        <div className={classes.wrapper}>
     
            <Grid container spacing={2}>
                <Grid item>
                
                    {/* Управление лайками */}
                    <Button 
                        className={classes.linkButton}
                        onClick={toggleUserArticleLike}
                    >
                        {putArticleLike.status === loading.status ?
                            
                            <CircularProgressPrimary className={classes.linkButton__icon} size='24px'/>
                            :
                            <>{userArticleReview?.isLike ? 
                                <FavoriteRoundedIcon className={classes.linkButton__iconOn}/>
                                : <FavoriteBorderRoundedIcon className={classes.linkButton__icon}/>
                            }</>
                        }
                        <div className={classes.linkButton__text}>{articleLikesSum}</div> 
                    </Button>

                </Grid>
                <Grid item>

                    {/* Управление закладками */}
                    <Button 
                        className={classes.linkButton}
                        onClick={toggleUserArticleFavorite}
                    >
                        {putArticleFavorite.status === loading.status ?
                            
                            <CircularProgressPrimary className={classes.linkButton__icon} size='24px'/>
                            :
                            <>{userArticleReview?.isFavorite ? 
                                <BookmarkRoundedIcon className={classes.linkButton__iconOn}/>
                                : <BookmarkBorderRoundedIcon className={classes.linkButton__icon}/>
                            }</>
                        }
                        <div className={classes.linkButton__text}>{articleFavoritesSum}</div> 
                    </Button>

                </Grid>
                <Grid item>

                    <Button className={classes.linkButton}
                        onClick={()=>{followLinkHandler(`/articles/${article.id}?comment=all`)}}
                    >
                        <CommentRoundedIcon className={classes.linkButton__icon}/>
                        <div className={classes.linkButton__text}>{article.totalCommentsNum}</div> 
                    </Button>

                </Grid>
            </Grid>

            <ShareArticleDropDown articleId={article.id}/>
            
        </div>
    )
}

export default ArticleValuation

    // useDidUpdateEffect(()=>{
    //     if(userReview?.isLike)
    //     setArticleLikesNum(1)
    // }, [userReview])

  // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [userReview])   

        // //если есть ревью и стоит лайк
        // if(userReview?.isLike){
        //     setUserReview(prevState => ({...prevState, isLike: true}))
        // } 

        // //если есть ревью, но лайк не стоит
        // if(userReview && !userReview.isLike){
        //     setUserReview(prevState => ({...prevState, isLike: false}))
        //     console.log('1')
        // }
    
        // //если нет ревью
        // if(!userReview){

        // }

        

    // setUserReview(produce(draftUserReview => {
    //     const userReview = draftUserReview;
    //     if(userReview){
    //         userReview.isLike = !userReview.isLike;
    //     } else {
    //         userReview = emptyUserReview;
    //         // userReview.isLike = !userReview.isLike
    //     }
        
    // }))

{/* <Button className={classes.linkButton} disabled>
    <VisibilityRoundedIcon className={classes.linkButton__icon}/>
    <div className={classes.linkButton__text}>11К</div> 
</Button> */}


// console.log(articleLikesNum)
    // const [articleReviews, setArticleReviews] = useState(article.reviews)
    // const articleLikesNum = articleReviews.filter(item => item.isLike === true).length || 0;
    // const articleFavoritesNum = articleReviews.filter(item => item.isFavorite === true).length || 0;
    // const isLikeOwner = articleReviews.some(item => useIsOwner(item.userId) && item.isLike === true);
    // const isFavoriteOwner = articleReviews.some(item => useIsOwner(item.userId) && item.isFavorite === true);
    
    // const toggleOwnerArticleLike = () => {
    //     setArticleReviews(produce(draftArticleReviews => {
    //         //1. Проверяем, есть ли запись для текущего пользователя
    //         //2. Если запись есть, то меняем в ней значение
    //         //3. Если записи нет, то создаем её
    //     }))
    // }

    // console.log(articleReviews, articleLikesNum)

    
 
    // const toggleArticleLike = () => {
    //     console.log('1')
    // }
    // const handleReviewChange = ({ name, about, avatarFilename }) => {
    //     setUserLocal(produce(draftUser => {
    //         const user = draftUser;
    //         if(isValueExists(name)){user.name = name};
    //         if(isValueExists(about)){user.about = about};
    //         if(isValueExists(avatarFilename)){user.avatarFilename = avatarFilename};
    //     }))
    // }
    
    // const saveChanges = async () => {
    //     const {payload: userUpdated} = await dispatch(putAuthUser(userLocal))
    //     if(userUpdated){
    //         dispatch(launchAlert({body: 'Изменения сохранены', type: 'success'}))
    //     }
    // }

     //выполняем PUT
        // const test = await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        // setArticleLikesNum(prevState => prevState + 1)
        // setUserArticleReview(prevState => {
            
        //     //если нет ревью
        //     if(!prevState){
        //         setArticleLikesNum(prevState => prevState + 1)
        //         console.log('test 1')
        //         return {...emptyUserReview, isLike: true}
        //     }

        //     //если есть ревью и стоит лайк
        //     if(prevState && prevState.isLike){
        //         setArticleLikesNum(prevState => prevState - 1)
        //         console.log('test 2')
        //         return {...prevState, isLike: false}
        //     }

        //     //если есть ревью и не стоит лайк
        //     if(prevState && !prevState.isLike){
        //         setArticleLikesNum(prevState => prevState + 1)
        //         console.log('test 3')
        //         return {...prevState, isLike: true}
        //     }

        // })

         //выполняем PUT
        // const test = await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        // setArticleLikesNum(prevState => prevState + 1)
        // setUserArticleReview(prevState => {
            
        //     //если нет ревью
        //     if(!prevState){
        //         setArticleLikesNum(prevState => prevState + 1)
        //         console.log('test 1')
        //         return {...emptyUserReview, isLike: true}
        //     }

        //     //если есть ревью и стоит лайк
        //     if(prevState && prevState.isLike){
        //         setArticleLikesNum(prevState => prevState - 1)
        //         console.log('test 2')
        //         return {...prevState, isLike: false}
        //     }

        //     //если есть ревью и не стоит лайк
        //     if(prevState && !prevState.isLike){
        //         setArticleLikesNum(prevState => prevState + 1)
        //         console.log('test 3')
        //         return {...prevState, isLike: true}
        //     }

        // })
        // Если нет ревью текущего пользователя // const [articleLikesNum, setArticleLikesNum] = useState(article.likesNum);
    // const [articleFavoritesNum, setArticleFavoritesNum] = useState(article.favoritesNum);
    // const emptyUserReview = { userId: currentUser.id, isLike: false, isFavorite: false };
    // const [userArticleReview, setUserArticleReview] = useState(
    //     article.reviews.find(item => item.userId === currentUser.id) || emptyUserReview
    // )


    
    // setArticleReviews(prevState => {

        //             return produce(prevState, draft => {
        
        //             })
        // console.log(1)
        //             // const test = await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        
        //             // const index = draftArticleReviews.findIndex(item => item.userId === currentUser.id);
                    
        //             // if(index >= 0){
        //             //     draftArticleReviews[index].isLike = !draftArticleReviews[index].isLike;
        //             // } else {
        //             //     draftArticleReviews.push({...emptyUserReview, isLike: true})
        //             // }
        //         }))
                
        //         // setCurrentSection(prevState => {
        //             //     return produce(prevState, draft => {
        //             //         const section = draft;
        //             //         section.header = header;
        //             //     })
        //             // })
                
        //         // setArticleReviews(produce(draftArticleReviews => {
        //         //     const index = draftArticleReviews.findIndex(item => item.userId === currentUser.id);
        //         //     if(index >= 0){
        //         //         draftArticleReviews[index].isLike = !draftArticleReviews[index].isLike;
        //         //     } else {
        //         //         draftArticleReviews.push({...emptyUserReview, isLike: true})
        //         //     }
        //         // }))

    // useDidUpdateEffect(()=>{
    //     console.log('render')
    //     // dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
    //     // toggleUserArticleLike()
    // }, [articleReviews])

// const test = await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        // setUserArticleReview(prevState => ({...prevState, isLike: !prevState.isLike}));

    // setArticleLikesNum(prevState => prevState + 1);

    // await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        
        // if(!userArticleReview){
        //     setUserArticleReview({...emptyUserReview, isLike: true})
        //     setArticleLikesNum(prevState => prevState + 1);
        // }

        // if(userArticleReview && userArticleReview.isLike){
        //     setUserArticleReview(prevState => ({...prevState, isLike: false}));
        //     setArticleLikesNum(prevState => prevState - 1);
        // }

        // if(userArticleReview && !userArticleReview.isLike){
        //     setUserArticleReview(prevState => ({...prevState, isLike: true}));
        //     setArticleLikesNum(prevState => prevState + 1);
        // }

         // setArticleReviews(prevState => {
        //     await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        //     console.log(1)
        //     return prevState
        // })

        // let updatedArtilceReview = 

        // if(userArticleReviewIndex){

        // }
        // const test = await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))

        // setArticleReviews(prevState => {
        //     await dispatch(putArticleReview({articleId: article.id, articleReview: userArticleReview}))
        //     console.log(1)
        //     return prevState
        // })

        // setArticleReviews(produce(draftArticleReviews => {
        //     const index = draftArticleReviews.findIndex(item => item.userId === currentUser.id);
        //     if(index >= 0){
        //         draftArticleReviews[index].isLike = !draftArticleReviews[index].isLike;
        //     } else {
        //         draftArticleReviews.push({...emptyUserReview, isLike: true})
        //     }
        // }))