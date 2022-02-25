import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { postDraftArticle } from '../../store/slices/currentArticleSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import ButtonPrimary from '../Button/ButtonPrimary';

const useStyles = makeStyles((theme) => ({
    porfileTabStabContainer: {

    },

    porfileTabStab: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        padding: theme.spacing(10, 2)
    },

    porfileTabStabText: {
        ...theme.typography.body1,
        marginBottom: theme.spacing(1)
    }
}))

const ProfileTabStab = ({ type }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();
    const dispatch = useDispatch();

    const handleNewArticle = async () => {
        const { payload: article } = await dispatch(postDraftArticle());
        followLinkHandler(`/write-article/${article.id}`)
    }

    const renderSwitchResults = (currentType) => {
        switch(currentType){

            case 'drafts': return (
                <div className={classes.porfileTabStab}>
                    <div className={classes.porfileTabStabText}>
                        У вас нет черновиков
                    </div>
                    <ButtonPrimary
                        onClick={() => handleNewArticle()} 
                    >Создать статью</ButtonPrimary>
                </div>
            )

            case 'articles': return (
                <div className={classes.porfileTabStab}>
                    <div className={classes.porfileTabStabText}>
                        У вас нет статей
                    </div>
                    <ButtonPrimary
                        onClick={() => handleNewArticle()} 
                    >Создать статью</ButtonPrimary>
                </div>
            )

            case 'favoriteArticles': return (
                <div className={classes.porfileTabStab}>
                    <div className={classes.porfileTabStabText}>
                        У вас нет закладок
                    </div>
                    <ButtonPrimary
                        onClick={() => followLinkHandler('/')} 
                    >К статьям</ButtonPrimary>
                </div>
            )


        }
    }

    return (
        <div className={classes.porfileTabStabContainer}>
            { renderSwitchResults(type) }
        </div>
    )
}

export default ProfileTabStab
