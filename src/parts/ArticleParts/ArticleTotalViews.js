import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { declesionOfNumber } from '../../utils/functions/declesionOfNumber';


const useStyles = makeStyles((theme) => ({

    views: {
        ...theme.typography.subtitle2,
        color: theme.palette.grey[500],
        marginBottom: theme.spacing(1)
    }

}))

const ArticleTotalViews = ({ totalViews }) => {

    const classes = useStyles();

    let totalViewsWord = declesionOfNumber(totalViews, ['просмотр', 'просмотра', 'просмотров'])

    return (
        <Typography className={classes.views}>
            {totalViews >= 0 ?
                `${totalViews} ${totalViewsWord}` : ''
            }
        </Typography>
    )

};

export default ArticleTotalViews;
