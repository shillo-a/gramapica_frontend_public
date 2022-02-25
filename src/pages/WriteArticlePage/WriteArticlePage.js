import { Container, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Editor from '../../parts/Editor/Editor';
import HelpBlock from './HelpBlock';

import ControlButtons from './ControlButtons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentArticle, getDraftArticle, postDraftArticle, putDraftArticle, selectChangeHappened, selectCurrentArticle,  selectGetDraftArticle } from '../../store/slices/currentArticleSlice';
import useDebounce from '../../utils/customHooks/useDebounce';
import { useHistory, useLocation } from 'react-router';
import { createRandomId } from '../../utils/functions/createRandomId';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import { succeeded } from '../../utils/apis/config/statuses';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        margin: theme.spacing(3, 0),
    },

    editor: {},

    editorFooter: {
        marginTop: theme.spacing(3),
    },

    help: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },

}))

const WriteArticlePage = ({ match }) => {

    const { articleId } = match.params;

    const classes = useStyles();
    const dispatch = useDispatch();

    //Redux state
    const currentArticle = useSelector(selectCurrentArticle);
    const changeHappened = useSelector(selectChangeHappened);

    useEffect(() => {
        //Загружаемае данные по статье, если в URL указан id
        dispatch(getDraftArticle(articleId));
        //При смене articleId всегда предварительно чистим store в Redux
        return () => {
            dispatch(clearCurrentArticle());
        }
    }, [articleId])

    //Debounce PUT to backend
    const debouncedСhangeHappened = useDebounce(changeHappened, 1000);
    useEffect(() => {
        if(debouncedСhangeHappened){
            dispatch(putDraftArticle(/*необходимые данные тянутся прямо в Redux*/))
        }
    }, [debouncedСhangeHappened])

    return (
        <div className={classes.wrapper}>
        <Container maxWidth='md' >
            <Grid container spacing={2}>

                <Grid xs={12} md={9} className={classes.editor} item>
                    <Editor currentArticle={currentArticle}/>
                    <div className={classes.editorFooter}>
                        <ControlButtons articleId={articleId}/>
                    </div>
                </Grid>

                <Grid xs={12} md={3} className={classes.help} item>
                    <HelpBlock currentArticle={currentArticle}/>
                </Grid>

            </Grid>

        </Container>
        </div>
        
    )
}

export default WriteArticlePage;

    // const articleIsLoaded = getDraftArticleStatus.status === succeeded.status
//   console.log(articleIsLoaded, importantChangeHappened)
    //После тогоПри важных изменениях делаем PUT 
    // useEffect(() => {
        
    //     if(articleIsLoaded && importantChangeHappened){
    //         console.log('test')
    //     }
        
    // }, [importantChangeHappened])







    // //Redux state
    // const currentArticle = useSelector(selectCurrentArticle);

    // //Local state
    // const [currentArticleLocal, setCurrentArticleLocal] = useState();

    // //Redux state --> Local state
    // useEffect(()=>{
    //     if(currentArticle !== currentArticleLocal){
    //         setCurrentArticleLocal(articleName)
    //     }
    // }, [articleName])

    // //Local state --> Redux state (отложенная загрузка)
    // const debouncedCurrentArticleName = useDebounce(currentArticleName, 1000);
    // useEffect(()=>{
    //     if(articleName !== currentArticleName){
    //         dispatch(addArticleName(currentArticleName))
    //     }
    // },[debouncedCurrentArticleName])

    // console.log('Render: WriteArtilcePage', '| Redux state: ', currentArticle, '| Local state: ', currentArticleLocal)


    // if(articleId){
    //     dispatch(getDraftArticle(articleId))
    // }

    // useEffect(() => {
    //     //Запускаем цепочку асинхронных запросов (выполнились они успешно или нет не важно)
    //     async function launchAsyncChain(){
    //         //Проверяем, авторизован ли пользователь (действителен ли token в local storage)
    //         await dispatch(postTokenValidity());
    //         setAppIsLoaded(true);
    //     }

    //     launchAsyncChain()
    // }, [])

    // console.log(currentArticleId)

    // const location= useLocation()
    // console.log(location)

    //2. Если ID статьи не указан в URL, значит она сейчас будет создаваться
    //Доступ к статье есть только у пользователя, который её создал

//     //"Размонтируем, когда объект удаляется"
//     useEffect(()=>{

//         // return function cleanUp(){
//         //     dispatch(clearCurrentArticle())
//         // }
//         // return  () => console.log('Размлнтирование')
//         return () => {
//             console.log('Размлнтирование')
//             dispatch(clearCurrentArticle())

//         }
        
//     }, []);

// console.log('test', currentArticle)

    //
    //Отложенная загрузка в БД через Backend
    // const debouncedCurrentArticle = useDebounce(currentArticle, 2000);
    // useEffect(()=>{
    //     if(currentArticle.articleId){
    //         dispatch(putDraftArticle({articleId: currentArticle.articleId, article: currentArticle}))
    //     }
    // },[debouncedCurrentArticle])

      // //POST when articleId = null
    // useEffect(() => {

    //     async function launchAsyncChain(){
    //         const { payload: article } = await dispatch(postDraftArticle())
    //         followLinkHandler(`/write-article/${article.id}`)
    //     }

    //     if(!articleId){
    //         launchAsyncChain()
    //     }

    // }, [])


    // //PUT when articleId = exists
    // //Add new ID to URL
    // useEffect(() => {

    //     async function launchAsyncChain(){
    //         const { payload: article } = await dispatch(postDraftArticle())
    //         followLinkHandler(`/write-article/${article.id}`)
    //     }

    //     if(!articleId){
    //         launchAsyncChain()
    //     }

    // }, [currentArticle])


    // В этом компоненте осуществляется:
    // 1. Изменение существующей статьи - id есть в URL, но нет в Redux 
    // 1.1. Получение данных с backend
    // 1.2. Сброс данных в Redux при изменении id в URL

    // 2. Создание новой статьи - id нет в URL
    // 3. Изменение новой статьи - id есть в URL и в Redux

    // //Определяем, создается ли новая статья (в URl нет id или id совпадает с тем, что в Redux)
    // const articleIsNew = !articleId || articleId === currentArticle.id;
    // const articleIsChanging = Boolean(articleId);

    //unmount - когда выходим из компонента, отчищаем Redux state
    // return () => {
    //     dispatch(clearCurrentArticle())
    // }


    // console.log(importantChangeHappened)

    // useEffect(()=>{

    //     async function launchAsyncChain(){
    //         const { payload: article } = await dispatch(postDraftArticle());
    //         // followLinkHandler(`/write-article/${article.id}`)
    //         history.replace({ pathname: `/write-article/${article.id}`})
    //     };

    //     !articleId && importantChangeHappened && launchAsyncChain();
    //     // !articleId && launchAsyncChain();

    // }, [importantChangeHappened])


    // console.log(articleId)

    // useEffect(()=>{

    //     async function launchAsyncChain(){
    //         const { payload: article } = await dispatch(postDraftArticle());
    //         followLinkHandler(`/write-article/${article.id}`)
    //     };

    //     articleIsNew && 
    //     !articleIsChanging && 
    //     importantChangeHappened && 
    //     launchAsyncChain();

    // }, [importantChangeHappened])

    // console.log(articleId === currentArticle.id)


    //Действия при изменении ID статьи в URL
    // useEffect(() => {

    //     // 1. Проверяем, является ли статья, указанная в URL - только что созданной
    //     const articleIsNew = articleId === currentArticle.id
    //     console.log(articleIsNew)

    // }, [articleId, importantChangeHappened])

    
    //Корректирова существующей статьи: arrticleId === true, importantChangeHappened === false, 

    // useEffect(() => {
    //     //mount (on every change) - получаем черновик, если есть в URL есть articleID
    //     articleId && dispatch(getDraftArticle(articleId));

    //     //unmount - когда выходим из компонента, отчищаем Redux state
    //     return () => {
    //         dispatch(clearCurrentArticle())
    //     }
    // }, [articleId])

    // articleId
    // console.log(importantChangeHappened)
    //PUT только когда было реально значимое изменение

    //Делаем POST при первом любом изменении для новой статьи
    // useEffect(()=>{

    //     async function launchAsyncChain(){
    //         const { payload: article } = await dispatch(postDraftArticle());
    //         followLinkHandler(`/write-article/${article.id}`)
    //     }

    //     !articleId && importantChangeHappened && launchAsyncChain()
        
    // }, [importantChangeHappened])

    // //Делаем PUT при любом изменении для существующей статьи

    // useEffect(() => {
    //     return () => {
    //                 dispatch(clearCurrentArticle())
    //             }
    // }, [articleId])