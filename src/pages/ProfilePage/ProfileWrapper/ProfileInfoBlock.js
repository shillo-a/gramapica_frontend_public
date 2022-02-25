import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import AvatarLarge from '../../../components/Avatar/AvatarLarge';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import useFollowLink from '../../../utils/customHooks/useFollowLink';
import { useLocation } from 'react-router';
import { convertToDMlongY } from '../../../utils/functions/convertToDMlongY';
import { useIsOwner } from '../../../utils/customHooks/useIsOwner';
import ImageInput from '../../../components/Form/Input/ImageInput'
import { uploadsURL } from '../../../utils/apis/config/apiUrls';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    info: {
    },

    info__avatar: {
        width: '112px',
        height: '112px'
    },


    info__usernameText:{
        ...theme.typography.h4,
        fontWeight: 900,
        paddingBottom: theme.spacing(1)
    },

    info__nameText: {
        ...theme.typography.subtitle1,
        fontWeight: 900,
        lineHeight: '100%'
    },

    info__about: {
        ...theme.typography.subtitle1
    },

    button: {
        flexShrink: 0,
    }

}))

const ProfileInfoBlock = ({ user, isUserOwner }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    //Определяем, какая сейчас открыта вкладка
    const currentPathnameBase = useLocation().pathname.split('/', 3).join('/')

    return (
        <div className={classes.wrapper}>
            
            <div className={classes.info}>
                <Grid container spacing={2}>
                    <Grid item>
                        <div className={classes.info__avatar}>
                            <AvatarLarge src={user.avatarFilename && `${uploadsURL}/${user.avatarFilename}`}/>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.info__usernameText}>{user.username}</Typography>
                        <Typography className={classes.info__nameText}>{user.name}</Typography>
                        <Typography className={classes.info__about}>{user.about}</Typography>
                    </Grid>
                </Grid> 
            </div>
            
            {isUserOwner &&
                <ButtonTertiary className={classes.button}
                    onClick={() => followLinkHandler(`/auth/settings/main`)}
                    state='non-active'
                ><SettingsRoundedIcon/></ButtonTertiary>
            }
            
        </div>
    )
}

export default ProfileInfoBlock