import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import AvatarLarge from '../../components/Avatar/AvatarLarge';
import AvatarMedium from '../../components/Avatar/AvatarMedium';
import { uploadsURL } from '../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        boxSizing: 'border-box',
        padding: theme.spacing(2),
        display: 'flex'
    },

    avatar: {
        marginRight: theme.spacing(2)
    },

    usernameText: {
        fontWeight: 900,
    },

    nameText: {
        ...theme.typography.body2,
    },

    about: {
        ...theme.typography.body2,
    }

}))

const ArticleAuthorDetailed = ({ article }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper} >

            <div className={classes.avatar}>
                <AvatarMedium src={article.author?.avatarFilename && `${uploadsURL}/${article.author?.avatarFilename}`}/>
            </div>

            <div>
                <Typography className={classes.usernameText}>
                        {article.author?.name} {article.author?.username} 
                </Typography>
                {/* <Typography className={classes.nameText}>{article.author?.name}</Typography> */}
                <Typography className={classes.about}>{article.author?.about}</Typography>
            </div>
            
        </div>
    )
}

export default ArticleAuthorDetailed


//   {/* <Grid container spacing={2}>
//                 <Grid item>
//                     <div className={classes.avatar}>
//                         <AvatarMedium src={article.author?.avatarFilename && `${uploadsURL}/${article.author?.avatarFilename}`}/>
//                     </div>
//                 </Grid>
//                 <Grid item>
//                     <Typography className={classes.usernameText}>
//                         {article.author?.name} {article.author?.username} 
//                     </Typography>
//                     {/* <Typography className={classes.nameText}>{article.author?.name}</Typography> */}
//                     <Typography className={classes.about}>{article.author?.about}</Typography>
//                 </Grid>
//             </Grid>  */}