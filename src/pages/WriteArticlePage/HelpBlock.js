import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import HelpHeaderSection from './HelpHeaderSection';
import HelpSectionWrapper from './HelpSectionWrapper';

const useStyles = makeStyles((theme) => ({
    helpBlockContainer: {
        position: 'sticky',
        top: `calc(${theme.navbarHeight}px + ${theme.spacing(1)}px)` ,
        // top: theme.spacing(1),
    }

}))

const HelpBlock = ({ currentArticle }) => {

    const classes = useStyles();

    return (
        <div className={classes.helpBlockContainer}>
            
            <Grid container spacing={1}>

                { currentArticle.name &&
                    <Grid item xs={12}>
                        <HelpHeaderSection articleName={currentArticle?.name}/>
                    </Grid>
                }
                
                {currentArticle.sections?.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <HelpSectionWrapper section={item}/>
                    </Grid>
                ))}

           </Grid>

        </div>
    )
}

export default HelpBlock
