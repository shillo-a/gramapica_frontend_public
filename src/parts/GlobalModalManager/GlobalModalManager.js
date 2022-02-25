import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core'
import { confirmModal, declineModal, hideModal } from '../../store/slices/globalModalSlice'
import AuthModal from './AuthModal/AuthModal'
import DialogPrimary from './DialogPrimary'

const useStyles = makeStyles((theme) => ({
    dialogButtons: {
        display: 'flex'
    },
    dialogButton:{
        flexGrow: 1
    }
}))

const GlobalModalManager = ( ) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    //Данные для отражения диалогового окна
    const isOpened = useSelector(state => state.globalModal.isOpened);
    const modalType = useSelector(state => state.globalModal.modalType);

    const handleClose = () => {
        dispatch(hideModal())
    }

    const handleConfirm = () => {
        dispatch(confirmModal())
    }

    const handleDecline = () => {
        dispatch(declineModal())
    }

    return (
        <>

        {/* Модальное окно авторизации */}
        {modalType === 'auth' &&
            <AuthModal 
                isOpened={isOpened} 
                handleClose={handleClose}
                
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
            />
        }

        {/* Диалоговое окно подтверждения удаления комментария*/}
        {modalType === 'deleteComment' &&
            <DialogPrimary 
                isOpened={isOpened} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
                header='Удалить комментарий'
                subheader='Вы точно хотите удалить выбранный комментарий?'
                buttonName='Удалить'
            />
        }

        {/* Диалоговое окно подтверждения удаления раздела статьи*/}
        {modalType === 'deleteSection' &&
            <DialogPrimary 
                isOpened={isOpened} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
                header='Удалить раздел'
                subheader='Вы точно хотите удалить выбранный раздел?'
                buttonName='Удалить'
            />
        }

        {/* Диалоговое окно подтверждения удаления черновика статьи*/}
        {modalType === 'deleteDraftArticle' &&
            <DialogPrimary 
                isOpened={isOpened} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
                header='Удалить черновик'
                subheader='Вы точно хотите удалить выбранный черновик?'
                buttonName='Удалить'
            />
        }

        {/* Диалоговое окно подтверждения возвращения статьи в черновики*/}
        {modalType === 'changeStatusToDraft' &&
            <DialogPrimary 
                isOpened={isOpened} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
                header='Вернуть в черновики'
                subheader='Вы точно хотите вернуть выбранную статью в черновики?'
                buttonName='Вернуть в черновики'
            />
        }

        {/* Диалоговое окно подтверждения удаления собственной статьи*/}
        {modalType === 'deleteUserArticle' &&
            <DialogPrimary 
                isOpened={isOpened} 
                handleClose={handleClose} 
                handleConfirm={handleConfirm} 
                handleDecline={handleDecline}
                header='Удалить статью'
                subheader='Вы точно хотите удалить выбранную статью?'
                buttonName='Удалить статью'
            />
        }
        
        </>
    )
}

export default GlobalModalManager
