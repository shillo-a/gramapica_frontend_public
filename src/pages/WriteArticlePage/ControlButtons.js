import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ButtonTertiary from '../../components/Button/ButtonTertiary';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgressPrimary from '../../components/Progress/CircularProgressPrimary';
import { putDraftArticleStatus, selectChangeHappenedRightNow, deleteDraftArticle} from '../../store/slices/currentArticleSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import { launchModal } from '../../store/slices/globalModalSlice';
import { selectCurrentUser } from '../../store/slices/authenticationSlice';

const useStyle = makeStyles((theme) => ({
    buttonsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    saveStatusContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    savingStatusContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    savingStatusIcon: {
        marginLeft: theme.spacing(0.5)
    }
}))

const ControlButtons = ({ articleId }) => {

    const classes = useStyle();
    const dispatch = useDispatch();
    const followLinkHandler = useFollowLink();

    //Получаем информацию о имени текущего пользователя
    const currentUser = useSelector(selectCurrentUser)

    //Если в статье что-то меняется, то показываем загрузку
    const changeHappenedRightNow = useSelector(selectChangeHappenedRightNow);
    const [isSaving, setIsSaving] = useState(true)
    useEffect(()=>{
        if(changeHappenedRightNow){
            setIsSaving(true)
        } else {
            setIsSaving(false)
        }
    }, [changeHappenedRightNow])

    //Меняем статус с draft на moderation
    const handleChangeDraftArticleStatusToModeration = async () => {
        const {payload: articleId} = await dispatch(putDraftArticleStatus('moderation'))
        if(articleId){
            followLinkHandler(`/profile/${currentUser.username}`)
        }
    }

    //Удаляем draft article
    const handleDeleteDraftArticle = async () => {
        const { payload: isConfirmed } = await dispatch(launchModal('deleteDraftArticle'));
        if(!isConfirmed){return}

        const {payload: deletedArticleId} = await dispatch(deleteDraftArticle(articleId))
        if(deletedArticleId){
            followLinkHandler(`/profile/${currentUser.username}/drafts`)
        }
    }


    // const { payload: isConfirmed } = await dispatch(launchModal('deleteDraftArticle'));

    return (
        <div className={classes.buttonsContainer}>

            <Grid container spacing={1}>
                
                <Grid item><ButtonPrimary
                    onClick={handleChangeDraftArticleStatusToModeration}
                >Опубликовать</ButtonPrimary></Grid>
                
                <Grid item><ButtonTertiary
                    href={`/articles/${articleId}`} target="_blank"
                ><VisibilityOutlinedIcon/></ButtonTertiary></Grid>
                
                <Grid item>
                    <div className={classes.saveStatusContainer}>
                        {isSaving ?
                            <div className={classes.savingStatusContainer}>
                                <Typography>Сохранение</Typography>
                                <CircularProgressPrimary className={classes.savingStatusIcon} size="1rem"/>
                            </div>
                            :
                            <div className={classes.savingStatusContainer}>
                                <Typography>Сохранено</Typography>
                                <DoneRoundedIcon className={classes.savingStatusIcon}/>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
                
            
            <ButtonTertiary
                onClick={handleDeleteDraftArticle}
            ><DeleteForeverOutlinedIcon/></ButtonTertiary>
            
        </div>
    )
}

export default ControlButtons


    // //Как только сохранился PUT то загроузку убираем
    // const putDraftArticleStatus = useSelector(state => state.currentArticle.putDraftArticle.status)
    // useEffect(()=>{
    //     if(putDraftArticleStatus === 'idle' || putDraftArticleStatus === 'succeeded'){
    //         setIsSaving(false)
    //     } 
    // }, [putDraftArticleStatus])