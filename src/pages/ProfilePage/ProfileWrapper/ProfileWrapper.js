import { Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import ProfileAnalytics from './ProfileAnalytics';
import ProfileControlBlock from './ProfileControlBlock';
import ProfileInfoBlock from './ProfileInfoBlock';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(3, 0),
    },

    content: {
        marginTop: theme.spacing(3)
    },

    tabs: {},

    addons: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }

}))

const ProfileWrapper = ({ children, user, isUserOwner }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
        <Container maxWidth='md' disableGutters={true}>

            <ProfileInfoBlock user={user} isUserOwner={isUserOwner}/>
            <ProfileControlBlock user={user} isUserOwner={isUserOwner}/>

            <div className={classes.content}>
            <Grid container spacing={2}>

                <Grid item xs={12} md={8} className={classes.tabs}>
                    {children}
                </Grid>

                <Grid item xs={12} md={4} className={classes.addons}>
                    <ProfileAnalytics/>
                </Grid>

            </Grid>
            </div>

        </Container>
        </div>
    )
}

export default ProfileWrapper
