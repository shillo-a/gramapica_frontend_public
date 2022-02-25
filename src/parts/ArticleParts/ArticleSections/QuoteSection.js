import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';

import AvatarMedium from '../../../components/Avatar/AvatarMedium'
import { uploadsURL } from '../../../utils/apis/config/apiUrls';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(2),
        background: '#FFF4F8',
        display: 'flex',
        
    },

    quote: {
        display: 'flex',
        // alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 1,
    },

    quoteIcon: {
        color: theme.palette.primary.main,
        ...theme.typography.h4,
        marginRight: theme.spacing(2)
        
    },

    quote__body: {
        ...theme.typography.h6,
        fontWeight: 900,
    },

    quoteAuthor: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2)
    },

    quoteAuthor_icon: {
        marginRight: theme.spacing(2)
    },

    quoteAuthorText__personName: {
        fontWeight: 900
    },

    quoteAuthorText__profession: {

    },


}))

const QuoteSection = ({ sectionQuote }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>

            <FormatQuoteRoundedIcon className={classes.quoteIcon} fontSize='inherit'/>
            
            <div className={classes.quote}>

                <Typography className={classes.quote__body}>{sectionQuote.body}</Typography>
                
                { (sectionQuote.avatarFilename || sectionQuote.personName || sectionQuote.profession) &&
                <div className={classes.quoteAuthor}>
                    {sectionQuote.avatarFilename &&
                        <AvatarMedium 
                            className={classes.quoteAuthor_icon}
                            src={`${uploadsURL}/${sectionQuote.avatarFilename}`}
                        />
                    }
                    <div className={classes.quoteAuthorText}>
                        <Typography className={classes.quoteAuthorText__personName}>{sectionQuote.personName}</Typography>
                        <Typography className={classes.quoteAuthorText__profession}>{sectionQuote.profession}</Typography>
                    </div>
                </div>
                }


            </div>
            
            <FormatQuoteRoundedIcon className={classes.quoteIcon} fontSize='inherit'/>
      
        </div>
        
    )
}

export default QuoteSection
