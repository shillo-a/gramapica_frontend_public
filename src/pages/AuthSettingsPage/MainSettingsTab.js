import { Grid, makeStyles, Typography } from '@material-ui/core';
import produce from 'immer';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import ImageInput from '../../components/Form/Input/ImageInput';
import StringInput from '../../components/Form/Input/StringInput';
import TextInput from '../../components/Form/Input/TextInput';
import { putAuthUser } from '../../store/slices/authenticationSlice';
import { launchAlert } from '../../store/slices/globalAlertSlice';
import { uploadsURL } from '../../utils/apis/config/apiUrls';
import { isValueExists } from '../../utils/functions/isValueExists';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },

    input: {
        marginBottom: theme.spacing(1),
        '&:last-child': {
            marginBottom: 0
        }
    },

    header: {
        fontWeight: 900,
        marginBottom: theme.spacing(0.5)
    },

    helper: {
        ...theme.typography.caption,
        whiteSpace: 'pre-line',
        marginTop: theme.spacing(0.5)
    },

    avatar: {
        width: '112px',
        height: '112px'
    },

    button: {
        marginTop: theme.spacing(2)
    }
}))

const MainSettingsTab = ({ currentUser, className: parrentClassName}) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    //Создаем локальный стейт для управления пользователем
    const [userLocal, setUserLocal] = useState(currentUser);

    const handleUserLocalChange = ({ name, about, avatarFilename }) => {
        setUserLocal(produce(draftUser => {
            const user = draftUser;
            if(isValueExists(name)){user.name = name};
            if(isValueExists(about)){user.about = about};
            if(isValueExists(avatarFilename)){user.avatarFilename = avatarFilename};
        }))
    }
    
    const saveChanges = async () => {
        const {payload: userUpdated} = await dispatch(putAuthUser(userLocal))
        if(userUpdated){
            dispatch(launchAlert({body: 'Изменения сохранены', type: 'success'}))
        }
    }

    return (
        <div className={classes.wrapper}>

            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                    <div className={classes.input}>
                        <Typography className={classes.header}>Настоящее имя</Typography>
                        <TextInput
                            value={userLocal.name || ''}
                            onChange={(e) => handleUserLocalChange({name: e.target.value})}
                        />
                        <Typography className={classes.helper}>Укажите ваши имя и фамилию, чтобы другие пользователи смогли узнать, как вас зовут</Typography>
                    </div>
                    
                    <div className={classes.input}>
                        <Typography className={classes.header}>О себе</Typography>
                        <TextInput
                            multiline
                            minRows={3}
                            value={userLocal.about || ''}
                            onChange={(e) => handleUserLocalChange({about: e.target.value})}
                        />
                        <Typography className={classes.helper}>Расскажите о себе в "двух словах"</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>

                    <Typography className={classes.header}>Аватар</Typography>
                    <div className={classes.avatar}>
                        <ImageInput
                            type='avatar'
                            deletable={true}

                            fileLocation={uploadsURL}
                            filename={userLocal.avatarFilename}
                            filenameChangeHandler={(filename) => {handleUserLocalChange( {avatarFilename: filename} )}}
                            handleDelete={() => {handleUserLocalChange( {avatarFilename: ''} )}}
                        />
                    </div>
                    <Typography className={classes.helper}>
                        {`Формат: jpg, gif, png.
                        Максимальный размер файла: 1Mb.
                        Разрешение: до 112x112px.`}
                    </Typography>

                </Grid>

            </Grid>
      

            <ButtonPrimary 
                className={classes.button}
                onClick={saveChanges}
            >
                Сохранить изменения
            </ButtonPrimary>
        </div>
    )
}

export default MainSettingsTab
