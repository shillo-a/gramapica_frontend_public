import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
    }
}))

const ProfileAnalytics = () => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            Всего статей
            Всего лайков
            Сюда нужно добавить какую-то инфорацию, но пока пусто :(
                    Кол-во статей по тегам
                    сделать sticky
                    {/* <Typography className={classes.info__createdAtText}>На проекте с {userCreatedAt}</Typography> */}
        </div>
    )
}

export default ProfileAnalytics
