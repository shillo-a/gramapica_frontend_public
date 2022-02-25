import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import ImageSection from './ImageSection';
import MarkerSection from './MarkerSection';
import QuoteSection from './QuoteSection';
import SpoilerSection from './SpoilerSection';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        paddingBottom: theme.spacing(2)
    },

    subheader: {
        ...theme.typography.h6,
        fontWeight: 900,
    },

    text: {
        ...theme.typography.body1,
    },
}))

const SectionWrapper = ({ section, highlightableMarkers }) => {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>

            {section && section.typeName === 'subheader' ?
                <Typography className={classes.subheader}>{section.header}</Typography>:<></>
            }

            {section && section.typeName === 'text' ?
                <Typography className={classes.text}>{section.body}</Typography>:<></>
            }

            {section && section.typeName === 'spoiler' ?
                <SpoilerSection spoilerText={section.body}/>:<></>
            }

            {section && section.typeName === 'image' ?
                <ImageSection sectionImage={section.sectionImage}/>:<></>
            }

            {section && section.typeName === 'quote' ?
                <QuoteSection sectionQuote={section.sectionQuote}/>:<></>
            }

            {section && section.typeName === 'marker' ?
                <MarkerSection 
                    sectionId={section.id}
                    sectionMarker={section.sectionMarker}
                    highlightableMarkers={highlightableMarkers}
                />:<></>
            }

        </div>
    )
}

export default SectionWrapper
