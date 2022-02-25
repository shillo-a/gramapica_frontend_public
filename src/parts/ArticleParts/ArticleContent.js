import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import SectionWrapper from './ArticleSections/SectionWrapper'

const useStyles = makeStyles((theme) => ({
    wrapper: {}
}))

const ArticleContent = ({ 
    className: parentClassName, 
    sections,
    highlightableMarkers
}) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>

            {sections.map(item => (
                <SectionWrapper 
                    key={item.id} 
                    section={item}
                    highlightableMarkers={highlightableMarkers}
                />
            ))}
            
        </div>
    )
}

export default ArticleContent
